
import React from 'react';
import { GameResult } from '../types';

interface ShareableResultCardProps {
  result: GameResult;
  isNewBestStreak: boolean;
}

const StatCard: React.FC<{ label: string; value: string | number; className?: string }> = ({ label, value, className }) => (
    <div className={`bg-slate-900/50 p-4 rounded-lg text-center ${className}`}>
        <p className="text-slate-400 text-sm">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
    </div>
);

const ShareableResultCard = React.forwardRef<HTMLDivElement, ShareableResultCardProps>(
    ({ result, isNewBestStreak }, ref) => {
    const { accuracy, longestStreak, hits, misses, omissions, correctRejections } = result;

    return (
        <div
            ref={ref}
            style={{ 
                width: '420px', 
                fontFamily: "'Poppins', sans-serif",
                background: 'radial-gradient(circle at 50% 0%, #2b3a51, #0f172a)',
                boxShadow: '0 0 40px rgba(52, 211, 153, 0.15)',
            }}
            className="text-white p-8 flex flex-col justify-center rounded-xl"
        >
            <h2 className="text-3xl font-bold text-center text-white mb-2">Test Complete</h2>
        
            {isNewBestStreak && (
                <p className="text-center text-yellow-400 font-semibold mb-4">
                    New Best Streak! 🔥
                </p>
            )}
            
            <div className="text-center my-6">
                <p className="text-lg text-green-300">Accuracy</p>
                <p 
                    className="text-7xl font-bold text-green-400" 
                    style={{ textShadow: '0 0 20px rgba(52, 211, 153, 0.8)' }}
                >
                    {accuracy}%
                </p>
            </div>
        
            <div className="grid grid-cols-2 gap-4 mb-6">
                <StatCard label="Longest Streak" value={longestStreak} />
                <StatCard label="Correct Hits" value={hits} />
            </div>

            <div className="bg-slate-900/50 p-4 rounded-lg mb-8">
                <p className="text-slate-400 text-sm text-center mb-2">Performance Breakdown</p>
                <div className="text-sm flex justify-around text-center">
                    <div><p className="text-red-400 font-bold text-xl">{misses}</p><p className="text-slate-400">Misses</p></div>
                    <div><p className="text-yellow-400 font-bold text-xl">{omissions}</p><p className="text-slate-400">Omissions</p></div>
                    <div><p className="text-blue-400 font-bold text-xl">{correctRejections}</p><p className="text-slate-400">Correct Rej.</p></div>
                </div>
            </div>
            <div className="text-center text-slate-500 text-xs mt-2">
                Go/No-Go Impulse Trainer
            </div>
        </div>
    );
});

export default ShareableResultCard;
