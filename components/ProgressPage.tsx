
import React, { useMemo } from 'react';
import Card from './Card';
import Button from './Button';
import { GameResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProgressPageProps {
  history: GameResult[];
  onBack: () => void;
}

const ProgressPage: React.FC<ProgressPageProps> = ({ history, onBack }) => {
  const chartData = useMemo(() => {
    return history.slice(-10).map((game, index) => ({
      name: `Game ${history.length - 9 + index > 0 ? history.length - 9 + index : 1}`,
      accuracy: game.accuracy,
      streak: game.longestStreak
    }));
  }, [history]);
  
  const stats = useMemo(() => {
      if (history.length === 0) {
          return { bestStreak: 0, avgAccuracy: 0, totalGames: 0 };
      }
      const bestStreak = Math.max(...history.map(g => g.longestStreak));
      const totalAccuracy = history.reduce((sum, g) => sum + g.accuracy, 0);
      const avgAccuracy = totalAccuracy / history.length;
      return {
          bestStreak,
          avgAccuracy: parseFloat(avgAccuracy.toFixed(1)),
          totalGames: history.length,
      }
  }, [history]);

  return (
    <Card>
      <h2 className="text-3xl font-bold text-center mb-6">Your Progress</h2>
      
      {history.length === 0 ? (
        <div className="text-center text-slate-500 py-10">
          <p>You haven't played any games yet.</p>
          <p>Complete a test to see your progress here!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mb-8 text-center">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-slate-600">Best Streak</p>
              <p className="text-3xl font-bold text-slate-800">{stats.bestStreak}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-slate-600">Avg. Accuracy</p>
              <p className="text-3xl font-bold text-slate-800">{stats.avgAccuracy}%</p>
            </div>
          </div>
          
          <h3 className="font-semibold mb-4 text-center">Last {chartData.length} Games</h3>
          <div className="w-full h-64">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" label={{ value: 'Streak', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="accuracy" fill="#8884d8" name="Accuracy" />
                  <Bar yAxisId="right" dataKey="streak" fill="#82ca9d" name="Longest Streak" />
                </BarChart>
              </ResponsiveContainer>
          </div>
        </>
      )}
      
      <div className="mt-8">
        <Button onClick={onBack} variant="ghost">Back to Home</Button>
      </div>
    </Card>
  );
};

export default ProgressPage;
