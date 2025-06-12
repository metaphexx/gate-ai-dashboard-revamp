
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle, XCircle, Clock, Target, Zap } from 'lucide-react';

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
      color: "bg-amber-400",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      title: "Letter Memory", 
      description: "Memorize the letter sequence",
      color: "bg-blue-400",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Word Order Memory",
      description: "Memorize the word sequence",
      color: "bg-red-400",
      bgColor: "bg-red-50", 
      borderColor: "border-red-200",
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
        case ' ': // Space to submit
          e.preventDefault();
          handleSubmit();
          break;
        case 'Enter': // Enter to start/restart
          if (!gameState.isPlaying) {
            startRound(gameState.currentRound);
          }
          break;
        case 'Escape': // Escape to pause
          if (gameState.isPlaying) {
            setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
          }
          break;
        case 'Backspace': // Clear input
          if (!gameState.isPlaying && gameState.isComplete) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/skills-trainer')}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Skills
              </Button>
              <div>
                <h1 className="text-xl font-bold">Memory Challenge</h1>
                <p className="text-sm text-gray-600">Round {gameState.currentRound}: {currentRoundData.title}</p>
              </div>
            </div>
            
            {/* Score Display */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Score: {gameState.score}</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Mistakes: {gameState.mistakes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Round Selection */}
        {!gameState.isPlaying && !gameState.isComplete && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {rounds.map((round, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
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
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* Sequence Display */}
            {gameState.showingSequence && (
              <div className="text-center py-12">
                <div className="text-6xl font-bold text-gray-800 mb-4 animate-scale-in">
                  {getCurrentDisplay()}
                </div>
                <p className="text-gray-600">Memorize this sequence</p>
              </div>
            )}

            {/* Input Phase */}
            {gameState.isPlaying && !gameState.showingSequence && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-semibold mb-4">Enter the sequence you saw:</h3>
                  <Input
                    type="text"
                    value={gameState.userInput}
                    onChange={(e) => setGameState(prev => ({ ...prev, userInput: e.target.value }))}
                    placeholder={gameState.currentRound === 3 ? "Enter words separated by spaces" : "Enter the sequence"}
                    className="text-center text-lg py-3 mb-4"
                    autoFocus
                  />
                  <div className="flex gap-3 justify-center">
                    <Button onClick={handleSubmit} className="px-6">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Submit (Space)
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))}
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Pause (Esc)
                    </Button>
                  </div>
                </div>
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
                
                <h3 className="text-xl font-semibold mb-2">
                  {gameState.userInput.trim().toUpperCase() === gameState.correctAnswer.toUpperCase() ? 
                    'Correct!' : 'Incorrect'}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  Correct answer: <span className="font-mono font-semibold">{gameState.correctAnswer}</span>
                </p>
                
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => startRound(gameState.currentRound)}>
                    <Play className="h-4 w-4 mr-2" />
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
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Next Round
                    </Button>
                  )}
                  <Button variant="outline" onClick={resetGame}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Game
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
                  className="px-8"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Round (Enter)
                </Button>
              </div>
            )}

            {/* Pause Overlay */}
            {gameState.isPaused && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <Card className="bg-white p-6">
                  <div className="text-center">
                    <Pause className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                    <h3 className="text-xl font-semibold mb-2">Game Paused</h3>
                    <Button onClick={() => setGameState(prev => ({ ...prev, isPaused: false }))}>
                      Continue
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Keyboard Shortcuts Guide */}
        <Card className="mt-6 bg-white/50 backdrop-blur-sm border-0">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Keyboard Shortcuts
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
              <div><kbd className="bg-gray-100 px-2 py-1 rounded">Space</kbd> Submit</div>
              <div><kbd className="bg-gray-100 px-2 py-1 rounded">Enter</kbd> Start/Restart</div>
              <div><kbd className="bg-gray-100 px-2 py-1 rounded">Esc</kbd> Pause</div>
              <div><kbd className="bg-gray-100 px-2 py-1 rounded">Backspace</kbd> Clear</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemoryGame;
