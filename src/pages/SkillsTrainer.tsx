
import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const SkillsTrainer = () => {
  // State for arithmetic game
  const [selectedOperation, setSelectedOperation] = useState<string>('addition');
  const [minValue, setMinValue] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(10);
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<number>(60);

  // Operation selection handler
  const handleOperationSelect = (operation: string) => {
    setSelectedOperation(operation);
  };

  // Time limit selection handler
  const handleTimeLimitSelect = (timeLimit: number) => {
    setSelectedTimeLimit(timeLimit);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Skill Trainers</h1>
            <p className="text-gray-500">Enhance your preparation with interactive exercises</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Arithmetic Game Card */}
            <Card className="border border-gray-100 shadow-sm bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-1">Arithmetic Game</h2>
                <p className="text-gray-500 text-sm mb-6">Practice your maths with flexible training settings</p>
                
                {/* Operator Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <button
                    onClick={() => handleOperationSelect('addition')}
                    className={`aspect-square rounded-lg flex items-center justify-center p-4 text-2xl transition-colors ${
                      selectedOperation === 'addition' 
                        ? 'bg-blue-50 border-2 border-primary text-primary' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    ➕
                  </button>
                  <button
                    onClick={() => handleOperationSelect('subtraction')}
                    className={`aspect-square rounded-lg flex items-center justify-center p-4 text-2xl transition-colors ${
                      selectedOperation === 'subtraction' 
                        ? 'bg-blue-50 border-2 border-primary text-primary' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    ➖
                  </button>
                  <button
                    onClick={() => handleOperationSelect('multiplication')}
                    className={`aspect-square rounded-lg flex items-center justify-center p-4 text-2xl transition-colors ${
                      selectedOperation === 'multiplication' 
                        ? 'bg-blue-50 border-2 border-primary text-primary' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    ✖️
                  </button>
                  <button
                    onClick={() => handleOperationSelect('division')}
                    className={`aspect-square rounded-lg flex items-center justify-center p-4 text-2xl transition-colors ${
                      selectedOperation === 'division' 
                        ? 'bg-blue-50 border-2 border-primary text-primary' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    ➗
                  </button>
                </div>
                
                {/* Customization Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="minValue" className="block text-sm font-medium text-gray-700 mb-1">
                      Min Value
                    </label>
                    <Input 
                      id="minValue"
                      type="number" 
                      value={minValue}
                      onChange={(e) => setMinValue(parseInt(e.target.value) || 1)}
                      className="w-full" 
                    />
                  </div>
                  <div>
                    <label htmlFor="maxValue" className="block text-sm font-medium text-gray-700 mb-1">
                      Max Value
                    </label>
                    <Input 
                      id="maxValue"
                      type="number" 
                      value={maxValue}
                      onChange={(e) => setMaxValue(parseInt(e.target.value) || 10)}
                      className="w-full" 
                    />
                  </div>
                </div>
                
                {/* Time Limit Pills */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Limit
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[30, 60, 120, 240].map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeLimitSelect(time)}
                        className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm transition-colors ${
                          selectedTimeLimit === time 
                            ? 'bg-blue-50 text-primary border border-primary' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        ⏱️ {time}s
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Start Button */}
                <Button className="w-full">
                  <Play size={18} className="mr-2" />
                  Start Arithmetic Training
                </Button>
              </CardContent>
            </Card>

            {/* Memory Game Card */}
            <Card className="border border-gray-100 shadow-sm bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-1">Memory Game</h2>
                <p className="text-gray-500 text-sm mb-6">Challenge your memory across 3 fun rounds</p>
                
                {/* Memory Game Rounds */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="rounded-lg bg-purple-50 p-4 relative">
                    <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <h3 className="font-medium mb-1 pl-6">Round 1: Number Memory</h3>
                    <p className="text-sm text-gray-600">You will see a number on screen for a few seconds.</p>
                    <p className="text-sm text-gray-800 mt-1 font-medium">Your Task: Memorize the number and enter it exactly as you saw it.</p>
                  </div>
                  
                  <div className="rounded-lg bg-gray-100 p-4 relative">
                    <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <h3 className="font-medium mb-1 pl-6">Round 2: Letter Memory</h3>
                    <p className="text-sm text-gray-600">You will see a set of letters on the screen.</p>
                    <p className="text-sm text-gray-800 mt-1 font-medium">Your Task: Memorize the sequence and enter the letters in the correct order.</p>
                  </div>
                  
                  <div className="rounded-lg bg-green-50 p-4 relative">
                    <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <h3 className="font-medium mb-1 pl-6">Round 3: Word Order Memory</h3>
                    <p className="text-sm text-gray-600">You will see a list of words displayed one by one.</p>
                    <p className="text-sm text-gray-800 mt-1 font-medium">Your Task: Memorize the words and enter them in the exact order they were shown.</p>
                  </div>
                </div>
                
                {/* Start Button */}
                <Button className="w-full">
                  <Play size={18} className="mr-2" />
                  Start Memory Challenge
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkillsTrainer;
