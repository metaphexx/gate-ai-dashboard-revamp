import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  List, 
  Quote, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Clock,
  FileText,
  ArrowRight,
  Home
} from 'lucide-react';

const WritingTest = () => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      handleSubmit();
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    const count = text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(count);
  }, [text]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleEditorChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    if (editorRef.current) {
      setText(editorRef.current.innerText);
    }
  };

  const formatText = (command: string) => {
    document.execCommand(command, false, '');
  };

  const insertQuote = () => {
    document.execCommand('insertText', false, '""');
  };

  const handleSubmit = () => {
    // Implement your submission logic here
    console.log('Submitted text:', text);
    navigate('/writing-results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-[#009dff]">Writing Test</h1>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{formatTime(timeLeft)}</span>
              </div>
            </div>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-gray-200 hover:bg-gray-50"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Instructions Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-white rounded-2xl border-none shadow-lg sticky top-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-[#009dff]" />
                  Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Writing Prompt</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    "The best way to solve the world's environmental problems is through personal action rather than government intervention."
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed mt-2">
                    To what extent do you agree or disagree with this statement? Support your position with relevant examples and reasoning.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Guidelines:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Present a clear position</li>
                    <li>• Support your arguments with examples</li>
                    <li>• Consider different perspectives</li>
                    <li>• Use proper grammar and structure</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Word Count:</span>
                    <span className="font-semibold text-[#009dff]">{wordCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600">Time Remaining:</span>
                    <span className="font-semibold text-red-600">{formatTime(timeLeft)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Writing Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-white rounded-2xl border-none shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Your Response
                  </CardTitle>
                  <Button
                    onClick={handleSubmit}
                    className="bg-[#009dff] hover:bg-[#008ae6] text-white"
                  >
                    Submit Response
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Formatting Toolbar */}
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('bold')}
                    className="h-8 w-8 p-0"
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('italic')}
                    className="h-8 w-8 p-0"
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('underline')}
                    className="h-8 w-8 p-0"
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('strikethrough')}
                    className="h-8 w-8 p-0"
                  >
                    <Strikethrough className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('insertUnorderedList')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertQuote()}
                    className="h-8 w-8 p-0"
                  >
                    <Quote className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('justifyLeft')}
                    className="h-8 w-8 p-0"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('justifyCenter')}
                    className="h-8 w-8 p-0"
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => formatText('justifyRight')}
                    className="h-8 w-8 p-0"
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Rich Text Editor */}
                <div
                  ref={editorRef}
                  contentEditable
                  onInput={handleEditorChange}
                  className="min-h-[400px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009dff] focus:border-transparent resize-none"
                  style={{
                    lineHeight: '1.6',
                    fontSize: '16px'
                  }}
                  suppressContentEditableWarning={true}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingTest;
