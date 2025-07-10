import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { simpleRAGService } from '@/services/simpleRAG';

const RAGTester = () => {
  const [responses, setResponses] = useState<Array<{ question: string; answer: string; timestamp: Date }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const testQuestions = [
    {
      category: "Knowledge Base Test",
      questions: [
        "What's the difference between CXP and Ceramic IR film?",
        "Do you offer nation-wide warranty coverage?",
        "What's your exact address in Fredericksburg?",
        "How many years of experience do you have?",
        "What SunTek films do you use?",
        "What's included in your lifetime warranty?",
      ]
    },
    {
      category: "Fallback Test",
      questions: [
        "What's the weather like today?",
        "How do I cook pasta?",
        "What's the capital of France?",
      ]
    },
    {
      category: "Business Questions",
      questions: [
        "How long does installation take?",
        "What are your business hours?",
        "How much does ceramic tinting cost?",
        "Do you tint commercial buildings?",
      ]
    }
  ];

  const testQuestion = async (question: string) => {
    setIsLoading(true);
    try {
      const startTime = Date.now();
      const answer = await simpleRAGService.getResponse(question);
      const endTime = Date.now();
      
      console.log(`⏱️ Response time: ${endTime - startTime}ms`);
      
      setResponses(prev => [...prev, {
        question,
        answer,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error testing question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResponses = () => {
    setResponses([]);
  };

  const getResponseType = (answer: string) => {
    if (answer.includes('(540) 891-0696') && answer.length < 200) {
      return 'fallback';
    }
    return 'rag';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">RAG System Tester</h2>
        <p className="text-gray-600">Test the chatbot's RAG system vs fallback responses</p>
        <div className="mt-4 flex items-center gap-4">
          <Badge variant={
            simpleRAGService.getStatus() === 'ready' ? "default" : 
            simpleRAGService.getStatus() === 'initializing' ? "secondary" : "destructive"
          }>
            {simpleRAGService.getStatus() === 'ready' && "✅ Ready"}
            {simpleRAGService.getStatus() === 'initializing' && "🔄 Initializing..."}
            {simpleRAGService.getStatus() === 'error' && "❌ Error"}
          </Badge>
          <Button onClick={clearResponses} variant="outline" size="sm">
            Clear Responses
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Questions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Test Questions</h3>
          {testQuestions.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{category.category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {category.questions.map((question, questionIndex) => (
                  <Button
                    key={questionIndex}
                    onClick={() => testQuestion(question)}
                    disabled={isLoading || simpleRAGService.getStatus() === 'initializing'}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-2 text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Responses */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Responses</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {responses.map((response, index) => (
              <Card key={index} className="text-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge 
                      variant={getResponseType(response.answer) === 'rag' ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {getResponseType(response.answer) === 'rag' ? '🤖 RAG' : '🔄 Fallback'}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {response.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="font-medium mb-1">{response.question}</p>
                  <p className="text-gray-600 text-xs">{response.answer}</p>
                </CardContent>
              </Card>
            ))}
            {responses.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No responses yet. Click a test question above.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Console Log Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm">How to Test</CardTitle>
        </CardHeader>
        <CardContent className="text-xs space-y-2">
          <p><strong>1. Check Browser Console (F12)</strong> for detailed logs</p>
          <p><strong>2. Look for Network Tab</strong> - OpenAI API calls to api.openai.com</p>
          <p><strong>3. Compare Response Types:</strong></p>
          <ul className="list-disc ml-4 space-y-1">
            <li><Badge variant="default" className="text-xs">🤖 RAG</Badge> - Detailed, knowledge-based responses</li>
            <li><Badge variant="secondary" className="text-xs">🔄 Fallback</Badge> - Generic responses with phone number</li>
          </ul>
          <p><strong>4. Test Without API Key</strong> - Remove VITE_OPENAI_API_KEY from .env</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RAGTester; 