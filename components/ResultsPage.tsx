
import React, { useRef, useState, useCallback, useMemo } from 'react';
import Button from './Button';
import { GameResult } from '../types';
import ShareableResultCard from './ShareableResultCard';
import { ShareIcon } from './icons/ShareIcon';

// Add this declaration for TypeScript to recognize the global htmlToImage library
declare global {
    interface Window {
        htmlToImage: {
            toPng: (element: HTMLElement, options?: any) => Promise<string>;
        };
    }
}

interface ResultsPageProps {
  result: GameResult;
  onTryAgain: () => void;
  onShowProgress: () => void;
  gameHistory: GameResult[];
  longestStreakEver: number;
}

const StatCard: React.FC<{ label: string; value: string | number; className?: string }> = ({ label, value, className }) => (
    <div className={`bg-slate-700/50 p-4 rounded-lg text-center ${className}`}>
        <p className="text-slate-400 text-sm">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
    </div>
);

const ResultsPage: React.FC<ResultsPageProps> = ({ result, onTryAgain, onShowProgress, gameHistory, longestStreakEver }) => {
  const { accuracy, longestStreak, hits, misses, correctRejections, omissions } = result;

  const avgAccuracy = useMemo(() => {
    if (gameHistory.length <= 1) return null;
    const totalAccuracy = gameHistory.slice(1).reduce((sum, g) => sum + g.accuracy, 0);
    return parseFloat((totalAccuracy / (gameHistory.length - 1)).toFixed(1));
  }, [gameHistory]);

  const isNewBestStreak = longestStreak > 0 && longestStreak >= longestStreakEver;
  
  const shareableCardRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = useCallback(async () => {
    if (!shareableCardRef.current || isSharing) return;
    setIsSharing(true);
    
    try {
        const dataUrl = await window.htmlToImage.toPng(shareableCardRef.current, { pixelRatio: 2 });
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], 'gonogo-result.png', { type: 'image/png' });

        const shareData = {
            title: 'My Go/No-Go Test Result!',
            text: `I got ${accuracy}% accuracy with a ${longestStreak} streak. Can you beat it?`,
            files: [file],
        };

        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share(shareData);
        } else {
            // Fallback for desktop or unsupported browsers
            const link = document.createElement('a');
            link.download = `GoNoGo-Result.png`;
            link.href = dataUrl;
            link.click();
        }
    } catch (error) {
        // Ignore abort errors from the user cancelling the share dialog
        if ((error as Error).name !== 'AbortError') {
            console.error('Failed to share result:', error);
            // Fallback to download on generic share error
            const link = document.createElement('a');
            link.download = `GoNoGo-Result-fallback.png`;
            link.href = await window.htmlToImage.toPng(shareableCardRef.current, { pixelRatio: 2 });
            link.click();
        }
    } finally {
        setIsSharing(false);
    }
  }, [isSharing, accuracy, longestStreak]);

  return (
    <div className="bg-slate-800 from-slate-900 to-slate-800 bg-gradient-to-br p-6 sm:p-8 rounded-xl w-full shadow-2xl shadow-slate-900/50">
        {/* Off-screen component for image generation */}
        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
            <ShareableResultCard ref={shareableCardRef} result={result} isNewBestStreak={isNewBestStreak} />
        </div>
        
        <h2 className="text-3xl font-bold text-center text-white mb-2">Test Complete</h2>
        
        {isNewBestStreak && (
            <p className="text-center text-yellow-400 font-semibold mb-4 animate-pulse">
                New Best Streak! 🔥
            </p>
        )}
        
        <div className="text-center my-6">
            <p className="text-lg text-green-300">Accuracy</p>
            <p 
                className="text-7xl font-bold text-green-400" 
                style={{ textShadow: '0 0 15px rgba(52, 211, 153, 0.7)' }}
            >
                {accuracy}%
            </p>
            {avgAccuracy !== null && (
                <p className="text-slate-400 text-sm mt-1">
                    vs. {avgAccuracy}% avg
                </p>
            )}
        </div>
      
        <div className="grid grid-cols-2 gap-4 mb-6">
            <StatCard label="Longest Streak" value={longestStreak} />
            <StatCard label="Correct Hits" value={hits} />
        </div>

        <div className="bg-slate-700/50 p-4 rounded-lg mb-6">
            <p className="text-slate-400 text-sm text-center mb-2">Performance Breakdown</p>
            <div className="text-sm flex justify-around text-center">
                <div><p className="text-red-400 font-bold text-xl">{misses}</p><p className="text-slate-400">Misses</p></div>
                <div><p className="text-yellow-400 font-bold text-xl">{omissions}</p><p className="text-slate-400">Omissions</p></div>
                <div><p className="text-blue-400 font-bold text-xl">{correctRejections}</p><p className="text-slate-400">Correct Rej.</p></div>
            </div>
        </div>
      
        <div className="space-y-3">
            <Button onClick={onTryAgain} variant="secondary" className="bg-green-500 hover:bg-green-600 focus:ring-green-400">Try Again</Button>
            <Button onClick={onShowProgress} variant="ghost" className="text-slate-300 hover:bg-slate-700">View Progress</Button>
            <Button onClick={handleShare} variant="ghost" className="text-slate-300 hover:bg-slate-700 flex items-center justify-center gap-2" disabled={isSharing}>
                <ShareIcon className="w-5 h-5" />
                {isSharing ? 'Generating...' : 'Share Result'}
            </Button>
        </div>
    </div>
  );
};

export default ResultsPage;
