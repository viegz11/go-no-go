import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SocialIcon, GameResult } from '../types';
import { GoSignalIcon } from './icons/GoSignalIcon';
import Button from './Button';
import { SIGNAL_ON_DURATION_MS, SIGNAL_OFF_DURATION_MS, GO_SIGNAL_PROBABILITY } from '../constants';

interface GamePageProps {
  noGoIcons: SocialIcon[];
  onGameEnd: (result: GameResult) => void;
  longestStreakEver: number;
  duration: number;
}

const GamePage: React.FC<GamePageProps> = ({ noGoIcons, onGameEnd, longestStreakEver, duration }) => {
  const [timer, setTimer] = useState(duration);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [correctRejections, setCorrectRejections] = useState(0);
  const [omissions, setOmissions] = useState(0);
  const [totalSignals, setTotalSignals] = useState(0);

  const [isSignalVisible, setIsSignalVisible] = useState(false);
  const [isGoSignal, setIsGoSignal] = useState(false);
  const [currentNoGoIcon, setCurrentNoGoIcon] = useState<SocialIcon>(noGoIcons[0]);
  
  const gameLoopTimeout = useRef<number | null>(null);
  const gameTimerInterval = useRef<number | null>(null);
  const signalState = useRef({ hasClicked: false });

  // Create a ref to hold game state to prevent endGame callback from being recreated
  const gameStateRef = useRef({
    hits,
    misses,
    correctRejections,
    omissions,
    totalSignals,
    currentStreak,
    longestStreak,
  });

  // Keep the ref updated with the latest state
  useEffect(() => {
    gameStateRef.current = {
      hits,
      misses,
      correctRejections,
      omissions,
      totalSignals,
      currentStreak,
      longestStreak,
    };
  }, [hits, misses, correctRejections, omissions, totalSignals, currentStreak, longestStreak]);

  const NoGoIconComponent = currentNoGoIcon.component;

  const endGame = useCallback(() => {
    if (gameLoopTimeout.current) clearTimeout(gameLoopTimeout.current);
    if (gameTimerInterval.current) clearInterval(gameTimerInterval.current);
    
    const finalState = gameStateRef.current;
    const accuracy = finalState.totalSignals > 0 ? ((finalState.hits + finalState.correctRejections) / finalState.totalSignals) * 100 : 0;
    
    onGameEnd({
      hits: finalState.hits,
      misses: finalState.misses,
      correctRejections: finalState.correctRejections,
      omissions: finalState.omissions,
      totalSignals: finalState.totalSignals,
      accuracy: parseFloat(accuracy.toFixed(1)),
      currentStreak: finalState.currentStreak,
      longestStreak: Math.max(finalState.longestStreak, finalState.currentStreak),
      timestamp: Date.now(),
    });
  }, [onGameEnd]);

  useEffect(() => {
    if (noGoIcons.length === 0) return; // Don't start game if no icons are provided
    gameTimerInterval.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (gameTimerInterval.current) clearInterval(gameTimerInterval.current);
    };
  }, [endGame, noGoIcons.length]);
  
  const runGameLoop = useCallback(() => {
    signalState.current.hasClicked = false;
    const isGo = Math.random() < GO_SIGNAL_PROBABILITY;
    
    if (!isGo) {
      const randomIndex = Math.floor(Math.random() * noGoIcons.length);
      setCurrentNoGoIcon(noGoIcons[randomIndex]);
    }

    setIsGoSignal(isGo);
    setIsSignalVisible(true);
    setTotalSignals(s => s + 1);

    gameLoopTimeout.current = setTimeout(() => {
      setIsSignalVisible(false);

      // Score omissions and correct rejections
      if (!signalState.current.hasClicked) {
        if (isGo) {
          setOmissions(o => o + 1);
          setCurrentStreak(0);
        } else {
          setCorrectRejections(cr => cr + 1);
        }
      }
      
      gameLoopTimeout.current = setTimeout(runGameLoop, SIGNAL_OFF_DURATION_MS);
    }, SIGNAL_ON_DURATION_MS);

  }, [noGoIcons]);
  
  useEffect(() => {
    if (noGoIcons.length > 0) {
      runGameLoop();
    }
    return () => {
      if (gameLoopTimeout.current) clearTimeout(gameLoopTimeout.current);
    };
  }, [runGameLoop, noGoIcons.length]);

  const handleGoClick = () => {
    if (!isSignalVisible || signalState.current.hasClicked) return;
    signalState.current.hasClicked = true;

    if (isGoSignal) {
      setHits(h => h + 1);
      setCurrentStreak(s => {
        const newStreak = s + 1;
        if (newStreak > longestStreak) {
          setLongestStreak(newStreak);
        }
        return newStreak;
      });
    } else {
      setMisses(m => m + 1);
      setCurrentStreak(0);
    }
  };

  if (noGoIcons.length === 0) {
    return <div className="text-center text-slate-500">Error: No distraction icon selected.</div>
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8 text-slate-500 font-semibold">
        <div>Time: <span className="text-slate-800 text-lg">{timer}s</span></div>
        <div>Streak: <span className="text-slate-800 text-lg">{currentStreak}</span></div>
        <div>Best: <span className="text-slate-800 text-lg">{Math.max(longestStreak, longestStreakEver)}</span></div>
      </div>
      
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-8 flex items-center justify-center">
        <div className={`transition-opacity duration-100 ${isSignalVisible ? 'opacity-100' : 'opacity-0'}`}>
          {isGoSignal ? (
            <GoSignalIcon className="w-full h-full" />
          ) : (
            <NoGoIconComponent className="w-full h-full" style={{ color: currentNoGoIcon.color }} />
          )}
        </div>
        <div className="absolute inset-0 border-4 border-slate-200 rounded-full -z-10"></div>
      </div>

      <div className="w-full max-w-xs">
        <Button variant="secondary" onClick={handleGoClick}>Go</Button>
      </div>
    </div>
  );
};

export default GamePage;