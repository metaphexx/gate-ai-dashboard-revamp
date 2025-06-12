
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle, XCircle, Clock, Target, Zap } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';

interface GameState {
  currentRound: number;
  isPlaying: boolean;
  isPaused: boolean;
  showingSequence: boolean;
  userInput: string;
  correctAnswer: string;
  score: number;
  mistakes: number;
  timeLeft: number;
  sequence: string | string[];
  sequenceIndex: number;
  isComplete: boolean;
}

const MemoryGame = () => {
  const navigate = useNavigate();
  
  const [gameState, setGameState] = useState<GameState>({
    currentRound: 1,
    isPlaying: false,
    isPaused: false,
    showingSequence: false,
    userInput: '',
    correctAnswer: '',
    score: 0,
    mistakes: 0,
    timeLeft: 0,
    sequence: '',
    sequenceIndex: 0,
    isComplete: false,
  });

  const rounds = [
    {
      title: "Number Memory",
      description: "Memorize the number sequence",
      color: "bg-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Letter Memory", 
      description: "Memorize the letter sequence",
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Word Order Memory",
      description: "Memorize the word sequence",
      color: "bg-purple-500",
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200",
    },
  ];

  // Generate sequence based on round
  const generateSequence = useCallback((round: number, difficulty: number = 1) => {
    switch (round) {
      case 1: // Numbers
        const numLength = 3 + difficulty;
        return Array.from({ length: numLength }, () => Math.floor(Math.random() * 10)).join('');
      
      case 2: // Letters
        const letterLength = 4 + difficulty;
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array.from({ length: letterLength }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
      
      case 3: // Words
        const words = ['APPLE', 'HOUSE', 'CHAIR', 'PHONE', 'MUSIC', 'LIGHT', 'OCEAN', 'CLOUD', 'SMILE', 'DREAM'];
        const wordCount = 3 + Math.floor(difficulty / 2);
        const shuffled = [...words].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, wordCount);
      
      default:
        return '';
    }
  }, []);

  // Start game for specific round
  const startRound = useCallback((round: number) => {
    const sequence = generateSequence(round);
    const answer = Array.isArray(sequence) ? sequence.join(' ') : sequence;
    
    setGameState(prev => ({
      ...prev,
      currentRound: round,
      isPlaying: true,
      isPaused: false,
      showingSequence: true,
      userInput: '',
      correctAnswer: answer,
      timeLeft: 30,
      sequence,
      sequenceIndex: 0,
      isComplete: false,
    }));
  }, [generateSequence]);

  // Handle sequence display
  useEffect(() => {
    if (gameState.showingSequence && gameState.isPlaying) {
      const sequence = gameState.sequence;
      const isWordArray = Array.isArray(sequence);
      const totalItems = isWordArray ? sequence.length : sequence.length;
      
      if (gameState.sequenceIndex < totalItems) {
        const timer = setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            sequenceIndex: prev.sequenceIndex + 1,
          }));
        }, isWordArray ? 1500 : 1000);
        
        return () => clearTimeout(timer);
      } else {
        // Sequence display complete, start input phase
        const timer = setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            showingSequence: false,
            timeLeft: 30,
          }));
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [gameState.showingSequence, gameState.sequenceIndex, gameState.isPlaying]);

  // Timer countdown
  useEffect(() => {
    if (gameState.isPlaying && !gameState.showingSequence && !gameState.isPaused && gameState.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (gameState.timeLeft === 0 && !gameState.showingSequence) {
      handleSubmit();
    }
  }, [gameState.timeLeft, gameState.isPlaying, gameState.showingSequence, gameState.isPaused]);

  // Submit answer
  const handleSubmit = useCallback(() => {
    if (!gameState.isPlaying || gameState.showingSequence) return;

    const isCorrect = gameState.userInput.trim().toUpperCase() === gameState.correctAnswer.toUpperCase();
    
    setGameState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 100 : prev.score,
      mistakes: isCorrect ? prev.mistakes : prev.mistakes + 1,
      isComplete: true,
      isPlaying: false,
    }));
  }, [gameState.userInput, gameState.correctAnswer, gameState.isPlaying, gameState.showingSequence]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState.showingSequence) return;

      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          if (!gameState.isPlaying && !gameState.isComplete) {
            startRound(gameState.currentRound);
          } else if (gameState.isPlaying && !gameState.showingSequence) {
            handleSubmit();
          } else if (gameState.isComplete) {
            startRound(gameState.currentRound);
          }
          break;
        case 'Escape':
          if (gameState.isPlaying) {
            setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
          }
          break;
        case 'Backspace':
          if (gameState.isPlaying && !gameState.showingSequence) {
            setGameState(prev => ({ ...prev, userInput: '' }));
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, handleSubmit, startRound]);

  // Reset game
  const resetGame = () => {
    setGameState({
      currentRound: 1,
      isPlaying: false,
      isPaused: false,
      showingSequence: false,
      userInput: '',
      correctAnswer: '',
      score: 0,
      mistakes: 0,
      timeLeft: 0,
      sequence: '',
      sequenceIndex: 0,
      isComplete: false,
    });
  };

  // Get current display for sequence
  const getCurrentDisplay = () => {
    const sequence = gameState.sequence;
    if (Array.isArray(sequence)) {
      return gameState.sequenceIndex < sequence.length ? sequence[gameState.sequenceIndex] : '';
    } else {
      return gameState.sequenceIndex < sequence.length ? sequence[gameState.sequenceIndex] : '';
    }
  };

  const currentRoundData = rounds[gameState.currentRound - 1];
  const progress = gameState.showingSequence ? 
    (gameState.sequenceIndex / (Array.isArray(gameState.sequence) ? gameState.sequence.length : gameState.sequence.length)) * 100 : 
    ((30 - gameState.timeLeft) / 30) * 100;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <DashboardSidebar />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => navigate('/skills-trainer')}
              className="flex items-center text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Skills Trainer
            </button>
            
            <div className="flex-1 text-center mx-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Memory Challenge
              </h1>
              <p className="text-gray-600">Round {gameState.currentRound}: {currentRoundData.title}</p>
            </div>
            
            {(gameState.isPlaying || gameState.isComplete) && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Target className="h-4 w-4" />
                  <span className="font-bold">Score: {gameState.score}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <XCircle className="h-4 w-4" />
                  <span className="font-bold">Mistakes: {gameState.mistakes}</span>
                </div>
                {gameState.isPlaying && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))}>
                      <Pause className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetGame}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Round Selection */}
          {!gameState.isPlaying && !gameState.isComplete && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {rounds.map((round, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 border-2 bg-white/70 backdrop-blur-sm ${
                    gameState.currentRound === index + 1 ? round.borderColor : 'border-gray-200'
                  }`}
                  onClick={() => setGameState(prev => ({ ...prev, currentRound: index + 1 }))}
                >
                  <CardContent className={`p-6 ${round.bgColor}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-full ${round.color} flex items-center justify-center text-white font-bold text-sm`}>
                        {index + 1}
                      </div>
                      <h3 className="font-semibold">{round.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{round.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Game Area */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              {/* Progress Bar */}
              {(gameState.isPlaying || gameState.showingSequence) && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{gameState.showingSequence ? 'Memorize Sequence' : 'Enter Answer'}</span>
                    <span>{gameState.showingSequence ? 'Watch carefully...' : `${gameState.timeLeft}s remaining`}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        progress > 60 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                        progress > 30 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                        'bg-gradient-to-r from-red-400 to-red-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Sequence Display */}
              {gameState.showingSequence && (
                <div className="text-center py-12">
                  <div className="text-6xl font-bold text-gray-800 mb-4 animate-scale-in font-mono">
                    {getCurrentDisplay()}
                  </div>
                  <p className="text-gray-600">Memorize this sequence</p>
                </div>
              )}

              {/* Input Phase */}
              {gameState.isPlaying && !gameState.showingSequence && (
                <div className="text-center py-12">
                  {gameState.isPaused ? (
                    <div className="space-y-6">
                      <h2 className="text-4xl font-bold text-gray-700">Game Paused</h2>
                      <Button onClick={() => setGameState(prev => ({ ...prev, isPaused: false }))} className="text-lg px-8 py-4">
                        Resume Game
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <h3 className="text-xl font-semibold">Enter the sequence you saw:</h3>
                      <div className="flex items-center justify-center space-x-4">
                        <Input
                          type="text"
                          value={gameState.userInput}
                          onChange={(e) => setGameState(prev => ({ ...prev, userInput: e.target.value }))}
                          placeholder={gameState.currentRound === 3 ? "Enter words separated by spaces" : "Enter the sequence"}
                          className="text-4xl text-center font-bold w-96 h-16 bg-white/90 backdrop-blur-sm border-2 font-mono"
                          autoFocus
                        />
                        <Button 
                          onClick={handleSubmit} 
                          className="h-16 px-8 text-lg"
                          disabled={!gameState.userInput.trim()}
                        >
                          Submit (Enter)
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Results */}
              {gameState.isComplete && (
                <div className="text-center py-12">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    gameState.userInput.trim().toUpperCase() === gameState.correctAnswer.toUpperCase() 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {gameState.userInput.trim().toUpperCase() === gameState.correctAnswer.toUpperCase() ? 
                      <CheckCircle className="h-8 w-8" /> : 
                      <XCircle className="h-8 w-8" />
                    }
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 flex items-center justify-center space-x-2">
                    {gameState.userInput.trim().toUpperCase() === gameState.correctAnswer.toUpperCase() ? 
                      <>
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <span className="text-green-600">Correct! +100 points</span>
                      </> : 
                      <>
                        <XCircle className="h-6 w-6 text-red-600" />
                        <span className="text-red-600">Incorrect</span>
                      </>
                    }
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    Correct answer: <span className="font-mono font-semibold">{gameState.correctAnswer}</span>
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => startRound(gameState.currentRound)} className="text-lg px-8 py-4">
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Try Again (Enter)
                    </Button>
                    {gameState.currentRound < 3 && (
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setGameState(prev => ({ 
                            ...prev, 
                            currentRound: prev.currentRound + 1, 
                            isComplete: false 
                          }));
                        }}
                        className="text-lg px-8 py-4"
                      >
                        <Zap className="h-5 w-5 mr-2" />
                        Next Round
                      </Button>
                    )}
                    <Button variant="outline" onClick={resetGame} className="text-lg px-8 py-4">
                      Back to Selection
                    </Button>
                  </div>
                </div>
              )}

              {/* Start Game */}
              {!gameState.isPlaying && !gameState.isComplete && (
                <div className="text-center py-12">
                  <div className={`w-16 h-16 rounded-full ${currentRoundData.color} flex items-center justify-center mx-auto mb-6`}>
                    <span className="text-white font-bold text-2xl">{gameState.currentRound}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{currentRoundData.title}</h3>
                  <p className="text-gray-600 mb-6">{currentRoundData.description}</p>
                  
                  <Button 
                    size="lg" 
                    onClick={() => startRound(gameState.currentRound)}
                    className="px-8 text-lg"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Start Round (Enter)
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Keyboard Shortcuts Guide */}
          <Card className="mt-6 bg-white/60 backdrop-blur-sm border-0">
            <CardContent className="p-4">
              <div className="text-center text-sm text-gray-600">
                <span className="font-medium">Shortcuts:</span>{' '}
                <kbd className="bg-gray-200 px-2 py-1 rounded mx-1">Enter</kbd> Start/Submit{' '}
                <kbd className="bg-gray-200 px-2 py-1 rounded mx-1">Esc</kbd> Pause{' '}
                <kbd className="bg-gray-200 px-2 py-1 rounded mx-1">Backspace</kbd> Clear Input
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MemoryGame;
