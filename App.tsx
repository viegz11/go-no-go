
import React, { useState, useCallback, useMemo } from 'react';
import HomePage from './components/HomePage';
import InstructionsPage from './components/InstructionsPage';
import IconSelectPage from './components/IconSelectPage';
import GamePage from './components/GamePage';
import ResultsPage from './components/ResultsPage';
import ProgressPage from './components/ProgressPage';
import SciencePage from './components/SciencePage';
import { Page, SocialIcon, GameResult } from './types';
import { GAME_DURATIONS } from './constants';
import useLocalStorage from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedIcons, setSelectedIcons] = useState<SocialIcon[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<number>(GAME_DURATIONS[0]);
  const [lastGameResult, setLastGameResult] = useState<GameResult | null>(null);
  const [gameHistory, setGameHistory] = useLocalStorage<GameResult[]>('gameHistory', []);

  const longestStreakEver = useMemo(() => {
    return gameHistory.reduce((max, game) => Math.max(max, game.longestStreak), 0);
  }, [gameHistory]);

  const navigateTo = (page: Page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };
  
  const handleStart = useCallback(() => navigateTo(Page.Instructions), []);
  const handleInstructionsNext = useCallback(() => navigateTo(Page.IconSelect), []);

  const handleIconSelect = useCallback((icons: SocialIcon[], duration: number) => {
    setSelectedIcons(icons);
    setSelectedDuration(duration);
    navigateTo(Page.Game);
  }, []);

  const handleGameEnd = useCallback((result: GameResult) => {
    setLastGameResult(result);
    // Add the new result to the beginning of the history
    setGameHistory(prev => [result, ...prev]);
    navigateTo(Page.Results);
  }, [setGameHistory]);

  const handleTryAgain = useCallback(() => {
    navigateTo(Page.Game);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage onStart={handleStart} onNavigate={navigateTo} />;
      case Page.Instructions:
        return <InstructionsPage onNext={handleInstructionsNext} />;
      case Page.IconSelect:
        return <IconSelectPage onIconSelect={handleIconSelect} />;
      case Page.Game:
        return <GamePage noGoIcons={selectedIcons} onGameEnd={handleGameEnd} longestStreakEver={longestStreakEver} duration={selectedDuration} />;
      case Page.Results:
        return lastGameResult && <ResultsPage result={lastGameResult} onTryAgain={handleTryAgain} onShowProgress={() => navigateTo(Page.Progress)} gameHistory={gameHistory} longestStreakEver={longestStreakEver} />;
      case Page.Progress:
        return <ProgressPage history={gameHistory} onBack={() => navigateTo(Page.Home)} />;
      case Page.Science:
        return <SciencePage onBack={() => navigateTo(Page.Home)} />;
      default:
        return <HomePage onStart={handleStart} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;