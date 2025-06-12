import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle, XCircle, Clock, Trophy, Target, Zap } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';

interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  isComplete: boolean;
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  correctAnswers: number;
  timeLeft: number;
  totalTime: number;
  streak: number;
  maxStreak: number;
  currentProblem: {
    num1: number;
    num2: number;
    operation: string;
    answer: number;
  } | null;
  userAnswer: string;
  showFeedback: boolean;
  isCorrect: boolean;
}

interface GameSettings {
  operation: string;
  minValue: number;
  maxValue: number;
  timeLimit: number;
}

const ArithmeticGame = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get settings from the Skills Trainer page
  const settings: GameSettings = location.state || {
    operation: 'addition',
    minValue: 1,
    maxValue: 10,
    timeLimit: 60
  };

  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isPaused: false,
    isComplete: false,
    currentQuestion: 0,
    totalQuestions: 20, // Fixed number of questions
    score: 0,
    correctAnswers: 0,
    timeLeft: settings.timeLimit,
    totalTime: settings.timeLimit,
    streak: 0,
    maxStreak: 0,
    currentProblem: null,
    userAnswer: '',
    showFeedback: false,
    isCorrect: false
  });

  const operations = {
    addition: { symbol: '+', name: 'Addition', color: 'bg-green-500', bgColor: 'bg-green-50' },
    subtraction: { symbol: '−', name: 'Subtraction', color: 'bg-blue-500', bgColor: 'bg-blue-50' },
    multiplication: { symbol: '×', name: 'Multiplication', color: 'bg-orange-500', bgColor: 'bg-orange-50' },
    division: { symbol: '÷', name: 'Division', color: 'bg-purple-500', bgColor: 'bg-purple-50' }
  };

  const generateProblem = useCallback(() => {
    const { operation, minValue, maxValue } = settings;
    let num1 = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    let num2 = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    let answer = 0;

    switch (operation) {
      case 'addition':
        answer = num1 + num2;
        break;
      case 'subtraction':
        if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure positive result
        answer = num1 - num2;
        break;
      case 'multiplication':
        answer = num1 * num2;
        break;
      case 'division':
        answer = num1;
        num1 = answer * num2; // Ensure whole number result
        answer = num1 / num2;
        break;
    }

    return { num1, num2, operation, answer };
  }, [settings]);

  const startGame = useCallback(() => {
    const newProblem = generateProblem();
    setGameState({
      isPlaying: true,
      isPaused: false,
      isComplete: false,
      currentQuestion: 1,
      totalQuestions: 20,
      score: 0,
      correctAnswers: 0,
      timeLeft: settings.timeLimit,
      totalTime: settings.timeLimit,
      streak: 0,
      maxStreak: 0,
      currentProblem: newProblem,
      userAnswer: '',
      showFeedback: false,
      isCorrect: false
    });
  }, [generateProblem, settings.timeLimit]);

  // Start the game automatically when component mounts
  useEffect(() => {
    startGame();
  }, [startGame]);

  const submitAnswer = () => {
    if (!gameState.currentProblem || !gameState.userAnswer.trim()) return;

    const userNum = parseInt(gameState.userAnswer);
    const isCorrect = userNum === gameState.currentProblem.answer;
    const newStreak = isCorrect ? gameState.streak + 1 : 0;

    setGameState(prev => ({
      ...prev,
      showFeedback: true,
      isCorrect,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      score: prev.score + (isCorrect ? 10 + (newStreak * 2) : 0),
      streak: newStreak,
      maxStreak: Math.max(prev.maxStreak, newStreak)
    }));

    // Show feedback for 1 second, then move to next question
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const nextQuestion = () => {
    if (gameState.currentQuestion >= gameState.totalQuestions) {
      // Game complete
      setGameState(prev => ({
        ...prev,
        isPlaying: false,
        isComplete: true,
        showFeedback: false
      }));
      return;
    }

    const newProblem = generateProblem();
    setGameState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      currentProblem: newProblem,
      userAnswer: '',
      showFeedback: false
    }));
  };

  const pauseGame = () => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const restartGame = () => {
    startGame();
  };

  // Timer effect
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isPaused && gameState.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 1) {
            return {
              ...prev,
              timeLeft: 0,
              isPlaying: false,
              isComplete: true
            };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState.isPlaying, gameState.isPaused, gameState.timeLeft]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState.showFeedback) return;

      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          if (gameState.isPlaying && !gameState.isPaused) {
            submitAnswer();
          } else if (gameState.isComplete) {
            restartGame();
          }
          break;
        case 'Escape':
          if (gameState.isPlaying) {
            pauseGame();
          }
          break;
        case 'r':
        case 'R':
          if (e.ctrlKey || e.metaKey) return;
          e.preventDefault();
          restartGame();
          break;
        case 'Backspace':
          if (gameState.isPlaying && !gameState.isPaused) {
            setGameState(prev => ({ ...prev, userAnswer: '' }));
          }
          break;
        default:
          // Handle number input
          if (/^[0-9]$/.test(e.key) && gameState.isPlaying && !gameState.isPaused) {
            setGameState(prev => ({ 
              ...prev, 
              userAnswer: prev.userAnswer + e.key 
            }));
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [gameState]);

  const currentOp = operations[settings.operation as keyof typeof operations];
  const progressPercentage = gameState.totalTime > 0 ? (gameState.timeLeft / gameState.totalTime) * 100 : 0;
  const accuracyPercentage = gameState.currentQuestion > 1 ? Math.round((gameState.correctAnswers / (gameState.currentQuestion - 1)) * 100) : 0;

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
                Arithmetic Training
              </h1>
              <p className="text-gray-600">{currentOp.name} Practice</p>
            </div>
            
            {gameState.isPlaying && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className={`font-mono font-bold ${gameState.timeLeft <= 10 ? 'text-red-500' : ''}`}>
                    {Math.floor(gameState.timeLeft / 60)}:{(gameState.timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={pauseGame}>
                  <Pause className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={restartGame}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Game Playing */}
          {gameState.isPlaying && !gameState.isComplete && (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    progressPercentage > 25 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                    progressPercentage > 10 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                    'bg-gradient-to-r from-red-400 to-red-500'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <Target className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <div className="text-2xl font-bold">{gameState.currentQuestion}</div>
                    <div className="text-sm text-gray-600">of {gameState.totalQuestions}</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                    <div className="text-2xl font-bold">{gameState.score}</div>
                    <div className="text-sm text-gray-600">Score</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <Zap className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                    <div className="text-2xl font-bold">{gameState.streak}</div>
                    <div className="text-sm text-gray-600">Streak</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <div className="text-2xl font-bold">{accuracyPercentage}%</div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </CardContent>
                </Card>
              </div>

              {/* Question Display */}
              <Card className={`border-0 shadow-lg ${currentOp.bgColor} backdrop-blur-sm`}>
                <CardContent className="p-12 text-center">
                  {gameState.isPaused ? (
                    <div className="space-y-6">
                      <h2 className="text-4xl font-bold text-gray-700">Game Paused</h2>
                      <Button onClick={pauseGame} className="text-lg px-8 py-4">
                        Resume Game
                      </Button>
                    </div>
                  ) : gameState.currentProblem && (
                    <div className="space-y-8">
                      <div className="text-6xl font-bold text-gray-800 font-mono tracking-wide">
                        {gameState.currentProblem.num1} {currentOp.symbol} {gameState.currentProblem.num2} = ?
                      </div>
                      
                      <div className="flex items-center justify-center space-x-4">
                        <Input
                          type="number"
                          value={gameState.userAnswer}
                          onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
                          className="text-4xl text-center font-bold w-48 h-16 bg-white/90 backdrop-blur-sm border-2"
                          placeholder="?"
                          disabled={gameState.showFeedback}
                          autoFocus
                        />
                        <Button 
                          onClick={submitAnswer} 
                          className="h-16 px-8 text-lg"
                          disabled={!gameState.userAnswer.trim() || gameState.showFeedback}
                        >
                          Submit (Enter)
                        </Button>
                      </div>

                      {gameState.showFeedback && (
                        <div className={`text-2xl font-bold flex items-center justify-center space-x-2 ${
                          gameState.isCorrect ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {gameState.isCorrect ? (
                            <>
                              <CheckCircle className="h-8 w-8" />
                              <span>Correct! +{10 + (gameState.streak * 2)} points</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-8 w-8" />
                              <span>Incorrect. Answer: {gameState.currentProblem.answer}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Keyboard Shortcuts Help */}
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="text-center text-sm text-gray-600">
                    <span className="font-medium">Shortcuts:</span>{' '}
                    <kbd className="bg-gray-200 px-2 py-1 rounded mx-1">Enter</kbd> Submit{' '}
                    <kbd className="bg-gray-200 px-2 py-1 rounded mx-1">Esc</kbd> Pause{' '}
                    <kbd className="bg-gray-200 px-2 py-1 rounded mx-1">R</kbd> Restart{' '}
                    <kbd className="bg-gray-200 px-2 py-1 rounded mx-1">0-9</kbd> Number Input
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Game Complete */}
          {gameState.isComplete && (
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-blue-50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Trophy className="h-24 w-24 mx-auto mb-6 text-yellow-500" />
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Training Complete!
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">{gameState.score}</div>
                    <div className="text-gray-600">Final Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">{gameState.correctAnswers}/{gameState.totalQuestions}</div>
                    <div className="text-gray-600">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">{Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100)}%</div>
                    <div className="text-gray-600">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">{gameState.maxStreak}</div>
                    <div className="text-gray-600">Best Streak</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={restartGame} className="text-lg px-8 py-4">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Play Again (Enter)
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/skills-trainer')} className="text-lg px-8 py-4">
                    Back to Skills Trainer
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ArithmeticGame;
