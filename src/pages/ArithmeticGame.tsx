
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  gameStarted: boolean;
}

interface GameSettings {
  operation: string;
  minValue: number;
  maxValue: number;
  timeLimit: number;
  questionCount: number;
}

const ArithmeticGame = () => {
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState<GameSettings>({
    operation: 'addition',
    minValue: 1,
    maxValue: 10,
    timeLimit: 60,
    questionCount: 10
  });

  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isPaused: false,
    isComplete: false,
    currentQuestion: 0,
    totalQuestions: 10,
    score: 0,
    correctAnswers: 0,
    timeLeft: 60,
    totalTime: 60,
    streak: 0,
    maxStreak: 0,
    currentProblem: null,
    userAnswer: '',
    showFeedback: false,
    isCorrect: false,
    gameStarted: false
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

  const startGame = () => {
    const newProblem = generateProblem();
    setGameState({
      isPlaying: true,
      isPaused: false,
      isComplete: false,
      currentQuestion: 1,
      totalQuestions: settings.questionCount,
      score: 0,
      correctAnswers: 0,
      timeLeft: settings.timeLimit,
      totalTime: settings.timeLimit,
      streak: 0,
      maxStreak: 0,
      currentProblem: newProblem,
      userAnswer: '',
      showFeedback: false,
      isCorrect: false,
      gameStarted: true
    });
  };

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
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      isComplete: false,
      gameStarted: false,
      currentQuestion: 0,
      score: 0,
      correctAnswers: 0,
      streak: 0,
      maxStreak: 0,
      currentProblem: null,
      userAnswer: '',
      showFeedback: false
    }));
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
          if (!gameState.gameStarted) {
            startGame();
          } else if (gameState.isPlaying && !gameState.isPaused) {
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
        case '+':
          if (!gameState.isPlaying) {
            setSettings(prev => ({ ...prev, operation: 'addition' }));
          }
          break;
        case '-':
          if (!gameState.isPlaying) {
            setSettings(prev => ({ ...prev, operation: 'subtraction' }));
          }
          break;
        case '*':
          if (!gameState.isPlaying) {
            setSettings(prev => ({ ...prev, operation: 'multiplication' }));
          }
          break;
        case '/':
          if (!gameState.isPlaying) {
            e.preventDefault();
            setSettings(prev => ({ ...prev, operation: 'division' }));
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
  }, [gameState, settings]);

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
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/skills-trainer')}
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Skills Trainer
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Arithmetic Training
                </h1>
                <p className="text-gray-600">{currentOp.name} Practice</p>
              </div>
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

          {/* Game Setup */}
          {!gameState.gameStarted && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className={`border-0 shadow-xl ${currentOp.bgColor} backdrop-blur-sm`}>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Game Settings</h2>
                  
                  {/* Operation Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Operation Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(operations).map(([key, op]) => (
                        <button
                          key={key}
                          onClick={() => setSettings(prev => ({ ...prev, operation: key }))}
                          className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                            settings.operation === key
                              ? `${op.color} text-white border-transparent shadow-lg`
                              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl font-bold mb-1">{op.symbol}</div>
                          <div className="text-sm">{op.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Number Range */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Min Value
                      </label>
                      <Input
                        type="number"
                        value={settings.minValue}
                        onChange={(e) => setSettings(prev => ({ ...prev, minValue: parseInt(e.target.value) || 1 }))}
                        className="bg-white/70 backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Value
                      </label>
                      <Input
                        type="number"
                        value={settings.maxValue}
                        onChange={(e) => setSettings(prev => ({ ...prev, maxValue: parseInt(e.target.value) || 10 }))}
                        className="bg-white/70 backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Game Duration */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Time Limit
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[30, 60, 120, 180].map((time) => (
                        <button
                          key={time}
                          onClick={() => setSettings(prev => ({ ...prev, timeLimit: time }))}
                          className={`px-4 py-2 rounded-full text-sm transition-colors ${
                            settings.timeLimit === time
                              ? 'bg-primary text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {time}s
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question Count */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Number of Questions
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[10, 15, 20, 25].map((count) => (
                        <button
                          key={count}
                          onClick={() => setSettings(prev => ({ ...prev, questionCount: count }))}
                          className={`px-4 py-2 rounded-full text-sm transition-colors ${
                            settings.questionCount === count
                              ? 'bg-primary text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={startGame} className="w-full text-lg py-6">
                    <Play className="h-5 w-5 mr-2" />
                    Start Training (Enter)
                  </Button>
                </CardContent>
              </Card>

              {/* Keyboard Shortcuts */}
              <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-gray-800">Keyboard Shortcuts</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-3">
                        <div><kbd className="bg-gray-100 px-2 py-1 rounded">Enter</kbd> Start/Submit</div>
                        <div><kbd className="bg-gray-100 px-2 py-1 rounded">Esc</kbd> Pause</div>
                        <div><kbd className="bg-gray-100 px-2 py-1 rounded">R</kbd> Restart</div>
                        <div><kbd className="bg-gray-100 px-2 py-1 rounded">0-9</kbd> Number Input</div>
                      </div>
                      <div className="space-y-3">
                        <div><kbd className="bg-gray-100 px-2 py-1 rounded">+</kbd> Addition</div>
                        <div><kbd className="bg-gray-100 px-2 py-1 rounded">-</kbd> Subtraction</div>
                        <div><kbd className="bg-gray-100 px-2 py-1 rounded">*</kbd> Multiplication</div>
                        <div><kbd className="bg-gray-100 px-2 py-1 rounded">/</kbd> Division</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

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
              <Card className={`border-0 shadow-2xl ${currentOp.bgColor} backdrop-blur-sm`}>
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
