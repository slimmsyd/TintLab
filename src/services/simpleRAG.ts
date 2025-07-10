interface EmbeddingResponse {
  data: Array<{
    embedding: number[];
  }>;
}

interface CompletionResponse {
  choices: Array<{
    text: string;
  }>;
}

class SimpleRAGService {
  private knowledgeChunks: Array<{ content: string; embedding?: number[] }> = [];
  private isInitialized = false;
  private isInitializing = false;
  private initializationPromise: Promise<void> | null = null;
  private readonly OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  constructor() {
    this.initializationPromise = this.initialize();
  }

  private async initialize(): Promise<void> {
    if (this.isInitializing || this.isInitialized) {
      return;
    }

    try {
      this.isInitializing = true;
      console.log('🚀 Initializing Simple RAG Service...');
      
      // Check API key
      if (!this.OPENAI_API_KEY) {
        console.warn('⚠️  OpenAI API key not found, using fallback responses');
        console.log('💡 To enable full RAG functionality, add VITE_OPENAI_API_KEY to your .env file');
      } else {
        console.log('✅ OpenAI API key found');
      }

      // Load knowledge base
      console.log('📚 Loading knowledge base...');
      const knowledge = await this.loadKnowledgeBase();
      console.log(`📄 Knowledge base loaded: ${knowledge.length} characters`);
      
      // Split into chunks
      this.knowledgeChunks = this.splitIntoChunks(knowledge);
      console.log(`🔗 Created ${this.knowledgeChunks.length} knowledge chunks`);
      
      // Generate embeddings for each chunk
      if (this.OPENAI_API_KEY) {
        console.log('🧠 Generating embeddings...');
        await this.generateEmbeddings();
        const embeddedChunks = this.knowledgeChunks.filter(chunk => chunk.embedding).length;
        console.log(`✨ Generated embeddings for ${embeddedChunks}/${this.knowledgeChunks.length} chunks`);
      }
      
      this.isInitialized = true;
      this.isInitializing = false;
      console.log('🎉 Simple RAG Service initialized successfully');
      
      // Log current mode
      if (this.OPENAI_API_KEY) {
        console.log('🤖 Mode: Full RAG with OpenAI API');
      } else {
        console.log('🔍 Mode: Fallback keyword matching');
      }
    } catch (error) {
      console.error('❌ Error initializing Simple RAG service:', error);
      this.isInitialized = false;
      this.isInitializing = false;
    }
  }

  private async loadKnowledgeBase(): Promise<string> {
    try {
      // Load from public folder or inline
      const businessInfo = await fetch('/business_info.txt').then(res => res.text());
      const businessKnowledge = await fetch('/business_knowledge.md').then(res => res.text());
      
      return `${businessInfo}\n\n${businessKnowledge}`;
    } catch (error) {
      console.error('Error loading knowledge base:', error);
      return this.getFallbackKnowledge();
    }
  }

  private splitIntoChunks(text: string): Array<{ content: string }> {
    const chunks: Array<{ content: string }> = [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    let currentChunk = '';
    const maxChunkSize = 500;
    
    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length < maxChunkSize) {
        currentChunk += sentence + '. ';
      } else {
        if (currentChunk.trim()) {
          chunks.push({ content: currentChunk.trim() });
        }
        currentChunk = sentence + '. ';
      }
    }
    
    if (currentChunk.trim()) {
      chunks.push({ content: currentChunk.trim() });
    }
    
    return chunks;
  }

  private async generateEmbeddings() {
    if (!this.OPENAI_API_KEY) {
      console.warn('OpenAI API key not found, using fallback responses');
      return;
    }

    for (const chunk of this.knowledgeChunks) {
      try {
        const response = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'text-embedding-ada-002',
            input: chunk.content,
          }),
        });

        const data: EmbeddingResponse = await response.json();
        chunk.embedding = data.data[0].embedding;
      } catch (error) {
        console.error('Error generating embedding:', error);
      }
    }
  }

  private async getEmbedding(text: string): Promise<number[]> {
    if (!this.OPENAI_API_KEY) return [];

    try {
      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-ada-002',
          input: text,
        }),
      });

      const data: EmbeddingResponse = await response.json();
      return data.data[0].embedding;
    } catch (error) {
      console.error('Error getting embedding:', error);
      return [];
    }
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;
    
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  private async findRelevantChunks(query: string): Promise<string[]> {
    if (!this.OPENAI_API_KEY) {
      // Fallback to keyword search
      return this.keywordSearch(query);
    }

    const queryEmbedding = await this.getEmbedding(query);
    if (queryEmbedding.length === 0) {
      return this.keywordSearch(query);
    }

    const similarities = this.knowledgeChunks
      .filter(chunk => chunk.embedding && chunk.embedding.length > 0)
      .map(chunk => ({
        content: chunk.content,
        similarity: this.cosineSimilarity(queryEmbedding, chunk.embedding!),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3) // Top 3 most relevant chunks
      .map(item => item.content);

    return similarities.length > 0 ? similarities : this.keywordSearch(query);
  }

  private keywordSearch(query: string): string[] {
    const keywords = query.toLowerCase().split(' ');
    const relevantChunks = this.knowledgeChunks
      .filter(chunk => 
        keywords.some(keyword => 
          chunk.content.toLowerCase().includes(keyword)
        )
      )
      .slice(0, 3)
      .map(chunk => chunk.content);

    return relevantChunks;
  }

  private async generateResponse(context: string, question: string): Promise<string> {
    if (!this.OPENAI_API_KEY) {
      return this.getFallbackResponse(question);
    }

    try {
      const prompt = `You are a helpful assistant for TintLab, a premium window tinting company in Fredericksburg, VA.

Use the following context to answer the question. If you don't know the answer based on the context, say "I don't have that specific information, but I'd be happy to connect you with our team at (540) 891-0696 for detailed assistance."

Always be friendly, professional, and mention relevant contact information when appropriate.

Context: ${context}

Question: ${question}

Answer:`;

      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo-instruct',
          prompt: prompt,
          max_tokens: 200,
          temperature: 0.2,
          stop: ['\n\n'],
        }),
      });

      const data: CompletionResponse = await response.json();
      return data.choices[0].text.trim();
    } catch (error) {
      console.error('Error generating response:', error);
      return this.getFallbackResponse(question);
    }
  }

  async getResponse(question: string): Promise<string> {
    console.log(`💬 Processing question: "${question}"`);
    
    // Wait for initialization to complete if it's still in progress
    if (this.isInitializing && this.initializationPromise) {
      console.log('⏳ Waiting for service initialization to complete...');
      try {
        await this.initializationPromise;
      } catch (error) {
        console.error('❌ Initialization failed:', error);
        return this.getFallbackResponse(question);
      }
    }

    if (!this.isInitialized) {
      console.log('⚠️  Service not initialized, using fallback');
      return this.getFallbackResponse(question);
    }

    try {
      // Find relevant context
      console.log('🔍 Finding relevant knowledge chunks...');
      const relevantChunks = await this.findRelevantChunks(question);
      console.log(`📝 Found ${relevantChunks.length} relevant chunks`);
      
      const context = relevantChunks.join('\n\n');

      // Generate response
      if (this.OPENAI_API_KEY && context) {
        console.log('🤖 Generating response using OpenAI API...');
        const response = await this.generateResponse(context, question);
        console.log('✅ RAG response generated successfully');
        return response;
      } else {
        console.log('🔄 Using fallback response');
        return this.getFallbackResponse(question);
      }
    } catch (error) {
      console.error('❌ Error getting response:', error);
      console.log('🔄 Falling back to basic response');
      return this.getFallbackResponse(question);
    }
  }

  private getFallbackResponse(question: string): string {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('price') || lowerQuestion.includes('cost')) {
      return "I'd be happy to help with pricing! Our window tinting rates vary based on your vehicle and film selection. Please call us at (540) 891-0696 for a free consultation and quote.";
    }
    
    if (lowerQuestion.includes('hours') || lowerQuestion.includes('open')) {
      return "We're open Monday-Friday 9:00 AM - 5:30 PM, Saturday by appointment, and closed Sunday. You can reach us at (540) 891-0696.";
    }
    
    if (lowerQuestion.includes('warranty')) {
      return "We offer a 100% lifetime manufacturer's warranty with nation-wide coverage on all our premium tinting services. This covers any defects in materials or workmanship.";
    }
    
    if (lowerQuestion.includes('location') || lowerQuestion.includes('address')) {
      return "We're located at 10928 Patriot Hwy, Fredericksburg, VA 22408. Feel free to call us at (540) 891-0696 if you need directions!";
    }
    
    return "Thanks for your question! For the most accurate information about our services, please call us at (540) 891-0696 or visit us at 10928 Patriot Hwy, Fredericksburg, VA 22408.";
  }

  private getFallbackKnowledge(): string {
    return `
      TintLab Business Information:
      - Location: 10928 Patriot Hwy, Fredericksburg, VA 22408
      - Phone: (540) 891-0696
      - Hours: Mon-Fri 9AM-5:30PM, Sat by appointment
      - Services: Window tinting, Paint protection film, Vinyl wrapping
      - Films: SunTek Premium Films (High Performance, Carbon, CXP, Ceramic)
      - Warranty: 100% lifetime manufacturer's warranty
      - Experience: 25+ years in business
      - Installation: 2-4 hours typical
    `;
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  isInitializingService(): boolean {
    return this.isInitializing;
  }

  getStatus(): 'initializing' | 'ready' | 'error' {
    if (this.isInitializing) return 'initializing';
    if (this.isInitialized) return 'ready';
    return 'error';
  }
}

export const simpleRAGService = new SimpleRAGService();
export default simpleRAGService; 