# RAG Chatbot Setup Instructions

## Overview
The chatbot now uses a lightweight RAG (Retrieval-Augmented Generation) system that provides intelligent responses based on your business knowledge base.

## How it Works

### 1. **Knowledge Base**
- `public/business_info.txt` - Core business information
- `public/business_knowledge.md` - Detailed business knowledge

### 2. **RAG Process**
1. **Text Chunking**: Knowledge base is split into manageable chunks
2. **Embedding Generation**: Each chunk gets a vector embedding using OpenAI
3. **Similarity Search**: User queries are matched against knowledge chunks
4. **Response Generation**: GPT generates responses using relevant context

### 3. **Fallback System**
- If OpenAI API is unavailable, uses keyword matching
- If no matches found, provides default contact information

## Setup

### Environment Variables
Create a `.env` file in your project root:

```env
# OpenAI API Key (required for full RAG functionality)
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### Get OpenAI API Key
1. Visit https://platform.openai.com/api-keys
2. Create a new API key
3. Add it to your `.env` file

### Deployment on Vercel
1. Add the OpenAI API key to your Vercel environment variables
2. The system will automatically work on your live site

## Features

### ✅ **What Works Well on Vercel**
- Loads knowledge base from public folder
- Generates embeddings on-demand
- Uses OpenAI API directly (no server needed)
- Fallback to keyword matching
- Fast response times

### ⚡ **Performance Optimizations**
- Embeddings cached during initialization
- Chunk-based knowledge retrieval
- Minimal API calls
- Efficient similarity search

### 🔧 **Customization**
- Edit knowledge files in `public/` folder
- Adjust chunk size in `simpleRAG.ts`
- Modify fallback responses
- Change temperature/model settings

## Usage

The chatbot will automatically:
1. Load your knowledge base on startup
2. Answer questions using relevant business information
3. Provide accurate, context-aware responses
4. Fall back to contact information when needed

## Benefits Over Simple Keyword Matching

### Before (Keyword Matching)
- Limited to pre-programmed responses
- No understanding of context
- Requires manual updates for new questions

### After (RAG System)
- Understands natural language queries
- Uses your complete knowledge base
- Provides detailed, accurate responses
- Easy to update by modifying knowledge files

## Example Interactions

**User**: "What's the difference between ceramic and carbon tint?"
**Bot**: "Based on our SunTek film options, ceramic film offers top-tier performance with maximum heat rejection and superior clarity, while carbon film provides enhanced heat rejection and superior UV protection with non-metallic construction..."

**User**: "How long does installation take?"
**Bot**: "Most vehicle installations are completed in 2-4 hours depending on the complexity. We've been perfecting our process for over 25 years..."

## Maintenance

### Adding New Knowledge
1. Edit `public/business_info.txt` or `public/business_knowledge.md`
2. Deploy to Vercel
3. The system automatically uses the updated knowledge

### Monitoring
- Check browser console for initialization logs
- Monitor API usage in OpenAI dashboard
- Test fallback responses work without API key

This RAG system provides intelligent, knowledge-based responses while being perfectly suited for Vercel deployment. 