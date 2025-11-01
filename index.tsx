// This file consolidates the entire React application into a single file
// to ensure it runs correctly on static hosting platforms like GitHub Pages
// without a build step, using in-browser transpilation via Babel.

// --- GLOBAL DECLARATIONS ---
// These declarations inform TypeScript about global variables loaded from CDNs.
declare const React: any;
declare const ReactDOM: any;
declare const Recharts: any;
declare const htmlToImage: {
    toPng: (element: HTMLElement, options?: any) => Promise<string>;
};

const { useState, useEffect, useCallback, useMemo, useRef, forwardRef } = React;

// --- TYPE DEFINITIONS ---
enum Page {
  Home = 'HOME',
  Instructions = 'INSTRUCTIONS',
  IconSelect = 'ICON_SELECT',
  Game = 'GAME',
  Results = 'RESULTS',
  Progress = 'PROGRESS',
  Science = 'SCIENCE',
}

interface SocialIcon {
  id: string;
  name: string;
  component: React.FC<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

interface GameResult {
  hits: number;
  misses: number;
  correctRejections: number;
  omissions: number;
  totalSignals: number;
  accuracy: number;
  currentStreak: number;
  longestStreak: number;
  timestamp: number;
}


// --- ICON COMPONENTS ---

const GoSignalIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="#00ff66" stroke="#10b981" strokeWidth="4" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string; style?: React.CSSProperties; }> = ({ className = '', style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YouTubeIcon: React.FC<{ className?: string; style?: React.CSSProperties; }> = ({ className = '', style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"></polygon>
  </svg>
);

const TwitterIcon: React.FC<{ className?: string; style?: React.CSSProperties; }> = ({ className = '', style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const TikTokIcon: React.FC<{ className?: string; style?: React.CSSProperties; }> = ({ className = '', style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 0 .14.02.2.04.53.15.94.48 1.26.9.3.4.49.85.57 1.35.09.57.1 1.15.1 1.73v3.25a4.23 4.23 0 0 1-2.02 3.72c-.87.6-1.84.9-2.85.92-1.33.03-2.66.02-3.99.02a4.23 4.23 0 0 1-3.72-2.02c-.6-1-.9-2.1-.92-3.23-.03-1.34-.02-2.67-.02-4.01a4.23 4.23 0 0 1 2.02-3.72c.87-.6 1.84-.9 2.85-.92 1.33-.03 2.66-.02 3.99-.02ZM16.44 4.87v10.5a3.85 3.85 0 0 1-3.8 3.9c-2.16.03-3.9-1.7-3.93-3.87a3.85 3.85 0 0 1 3.8-3.9c.1 0 .2-.01.31-.01v3.3a.55.55 0 0 0 .54.55c.3 0 .54-.25.54-.55v-3.3c1.3 0 2.59.01 3.88.01Z"/>
    </svg>
);

const FacebookIcon: React.FC<{ className?: string; style?: React.CSSProperties; }> = ({ className = '', style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v12"
    />
  </svg>
);


// --- CONSTANTS ---

const SOCIAL_ICONS: SocialIcon[] = [
  { id: 'instagram', name: 'Instagram', component: InstagramIcon, color: '#E1306C' },
  { id: 'youtube', name: 'YouTube', component: YouTubeIcon, color: '#FF0000' },
  { id: 'twitter', name: 'Twitter', component: TwitterIcon, color: '#1DA1F2' },
  { id: 'tiktok', name: 'TikTok', component: TikTokIcon, color: '#000000' },
  { id: 'facebook', name: 'Facebook', component: FacebookIcon, color: '#1877F2' },
];

const GAME_DURATIONS = [30, 60, 90]; // in seconds
const SIGNAL_ON_DURATION_MS = 800;
const SIGNAL_OFF_DURATION_MS = 200;
const GO_SIGNAL_PROBABILITY = 0.7; // 70%


// --- CUSTOM HOOKS ---

// FIX: Changed generic from <T,> to <T> to fix syntax error.
function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  // FIX: Removed generic <T> from useState call as it's an untyped function.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // FIX: Added 'as T' to ensure the returned value is correctly typed, helping type inference.
      return item ? JSON.parse(item) as T : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const valueToStore =
        typeof storedValue === 'function'
          ? (storedValue as Function)(storedValue)
          : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}


// --- REUSABLE UI COMPONENTS ---

const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  [key: string]: any; // for other button attributes like onClick, disabled etc.
}> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'w-full text-center font-semibold py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-500',
    secondary: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-400'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white p-6 sm:p-8 rounded-xl w-full ${className}`}>
      {children}
    </div>
  );
};


// --- PAGE COMPONENTS ---

const HomePage: React.FC<{
  onStart: () => void;
  onNavigate: (page: Page) => void;
}> = ({ onStart, onNavigate }) => {
  return (
    <Card className="text-center">
      <h1 className="text-4xl font-bold text-slate-800 mb-4">Go/No-Go Test</h1>
      <p className="text-slate-600 mb-8">
        Train your impulse control by reacting — or not reacting — at the right time.
      </p>
      <div className="space-y-4">
        <Button onClick={onStart} variant="primary" className="text-lg">Start Test</Button>
        <Button onClick={() => onNavigate(Page.Progress)} variant="ghost">View Progress</Button>
        <Button onClick={() => onNavigate(Page.Science)} variant="ghost">The Science</Button>
      </div>
    </Card>
  );
};

const InstructionsPage: React.FC<{ onNext: () => void; }> = ({ onNext }) => {
  const instagramIcon = SOCIAL_ICONS.find(icon => icon.id === 'instagram');

  return (
    <Card>
      <h2 className="text-2xl font-bold text-center mb-6">How to Play</h2>
      <ul className="space-y-4 text-slate-600 mb-8">
        <li className="flex items-center">
          <GoSignalIcon className="w-10 h-10 mr-4 text-green-500" />
          <span>Tap the <b className="text-green-600">Go</b> button when you see the green circle.</span>
        </li>
        <li className="flex items-center">
          <InstagramIcon className="w-10 h-10 mr-4" style={{ color: instagramIcon?.color }} />
          <span><b>Do not react</b> when you see a social media icon.</span>
        </li>
        <li className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mr-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>You'll choose the test duration on the next screen.</span>
        </li>
      </ul>
      <Button onClick={onNext} variant="primary">Next</Button>
    </Card>
  );
};

const IconSelectPage: React.FC<{
  onIconSelect: (icons: SocialIcon[], duration: number) => void;
}> = ({ onIconSelect }) => {
  // FIX: Removed generic <SocialIcon[]> and used 'as SocialIcon[]' for the initial value to help type inference.
  const [selected, setSelected] = useState([] as SocialIcon[]);
  // FIX: Removed generic <number> from useState call; type is inferred from the initial value.
  const [duration, setDuration] = useState(GAME_DURATIONS[0]);

  const handleSelect = (icon: SocialIcon) => {
    setSelected(prev => {
      const isSelected = prev.find(i => i.id === icon.id);
      if (isSelected) {
        return prev.filter(i => i.id !== icon.id);
      } else {
        return [...prev, icon];
      }
    });
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold text-center mb-2">Choose Your Distractions</h2>
      <p className="text-slate-500 text-center mb-6">Select the icons you want to resist.</p>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        {SOCIAL_ICONS.map((icon) => (
          <div
            key={icon.id}
            onClick={() => handleSelect(icon)}
            className={`cursor-pointer p-4 border-2 rounded-lg flex items-center justify-center transition-all duration-200 ${
              selected.some(i => i.id === icon.id)
                ? 'border-green-500 bg-green-50 scale-110'
                : 'border-slate-200 hover:border-slate-400'
            }`}
          >
            <icon.component className="w-12 h-12" style={{ color: icon.color }} />
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold text-center mb-4">Choose Test Duration</h3>
      <div className="flex justify-center space-x-2 sm:space-x-4 mb-8">
        {GAME_DURATIONS.map((d) => (
          <button
            key={d}
            onClick={() => setDuration(d)}
            className={`px-4 sm:px-6 py-2 border-2 rounded-lg font-semibold transition-all duration-200 ${
              duration === d
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-slate-200 text-slate-600 hover:border-slate-400'
            }`}
          >
            {d}s
          </button>
        ))}
      </div>

      <Button
        onClick={() => selected.length > 0 && onIconSelect(selected, duration)}
        disabled={selected.length === 0}
        className="disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        Start Test
      </Button>
    </Card>
  );
};

const GamePage: React.FC<{
  noGoIcons: SocialIcon[];
  onGameEnd: (result: GameResult) => void;
  longestStreakEver: number;
  duration: number;
}> = ({ noGoIcons, onGameEnd, longestStreakEver, duration }) => {
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
  // FIX: Removed generic <SocialIcon> from useState call as it's an untyped function.
  const [currentNoGoIcon, setCurrentNoGoIcon] = useState(noGoIcons[0]);
  
  // FIX: Removed generic from useRef call as it's an untyped function.
  const gameLoopTimeout = useRef(null);
  // FIX: Removed generic from useRef call as it's an untyped function.
  const gameTimerInterval = useRef(null);
  const signalState = useRef({ hasClicked: false });

  const gameStateRef = useRef({
    hits,
    misses,
    correctRejections,
    omissions,
    totalSignals,
    currentStreak,
    longestStreak,
  });

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
    if (noGoIcons.length === 0) return;
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
    return <div className="text-center text-slate-500">Error: No distraction icon selected. Please go back and select one.</div>
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

const ProgressPage: React.FC<{
  history: GameResult[];
  onBack: () => void;
}> = ({ history, onBack }) => {
  const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

  const chartData = useMemo(() => {
    // Show last 10 games, ensuring the first game shown is labeled correctly.
    const recentHistory = history.slice(0, 10).reverse();
    return recentHistory.map((game, index) => ({
      name: `Game ${history.length - recentHistory.length + 1 + index}`,
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

const SciencePage: React.FC<{ onBack: () => void; }> = ({ onBack }) => {
  return (
    <Card>
      <h2 className="text-3xl font-bold text-center mb-6">Why Go/No-Go Works</h2>
      
      <div className="prose prose-slate max-w-none text-slate-600">
        <p>The Go/No-Go test is a classic tool in cognitive neuroscience used to measure and train an individual's capacity for <strong>response inhibition</strong>. This is the brain's ability to suppress a prepotent, or automatic, response. It's a key function of our executive controls, managed primarily by the prefrontal cortex.</p>
        <h3 className="text-slate-700">The Neuroscience of Impulse Control</h3>
        <p>When you constantly check social media, you're reinforcing a neural pathway. The "Go" signal in this test (the green circle) creates a similar prepotent response: "see stimulus, tap button". The "No-Go" signal (the social media icon) forces you to actively inhibit that trained response. By repeatedly practicing this inhibition, you are strengthening the neural circuits in your prefrontal cortex responsible for self-control.</p>
        <h3 className="text-slate-700">Benefits of Regular Training</h3>
        <ul>
            <li><strong>Better Focus:</strong> Strengthening your prefrontal cortex helps you resist distractions and maintain focus on important tasks.</li>
            <li><strong>Reduced Compulsive Checking:</strong> It makes you more mindful of your digital habits, helping to break the automatic "urge-to-check" cycle.</li>
            <li><strong>Stronger Discipline:</strong> The mental "muscle" you build for response inhibition can be applied to other areas of life, from diet to productivity.</li>
        </ul>
        <p>Think of it as a workout for your brain's braking system. The more you train, the better you become at stopping impulsive actions, whether it's tapping a button in a game or mindlessly opening a social media app.</p>
      </div>
      <div className="mt-8">
        <Button onClick={onBack} variant="ghost">Back to Home</Button>
      </div>
    </Card>
  );
};

const ResultsPage: React.FC<{
  result: GameResult;
  onTryAgain: () => void;
  onShowProgress: () => void;
  gameHistory: GameResult[];
  longestStreakEver: number;
}> = ({ result, onTryAgain, onShowProgress, gameHistory, longestStreakEver }) => {
  const { accuracy, longestStreak, hits, misses, correctRejections, omissions } = result;

  const avgAccuracy = useMemo(() => {
    if (gameHistory.length <= 1) return null;
    const totalAccuracy = gameHistory.slice(1).reduce((sum, g) => sum + g.accuracy, 0);
    return parseFloat((totalAccuracy / (gameHistory.length - 1)).toFixed(1));
  }, [gameHistory]);

  const isNewBestStreak = longestStreak > 0 && longestStreak >= longestStreakEver;
  
  // FIX: Removed generic <HTMLDivElement> from useRef call as it's an untyped function.
  const shareableCardRef = useRef(null);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = useCallback(async () => {
    if (!shareableCardRef.current || isSharing) return;
    setIsSharing(true);
    
    try {
        const dataUrl = await htmlToImage.toPng(shareableCardRef.current, { pixelRatio: 2 });
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
            const link = document.createElement('a');
            link.download = `GoNoGo-Result.png`;
            link.href = dataUrl;
            link.click();
        }
    } catch (error) {
        if ((error as Error).name !== 'AbortError') {
            console.error('Failed to share result:', error);
            const dataUrl = await htmlToImage.toPng(shareableCardRef.current, { pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `GoNoGo-Result-fallback.png`;
            link.href = dataUrl;
            link.click();
        }
    } finally {
        setIsSharing(false);
    }
  }, [isSharing, accuracy, longestStreak]);

  const StatCard: React.FC<{ label: string; value: string | number; className?: string }> = ({ label, value, className }) => (
    <div className={`bg-slate-700/50 p-4 rounded-lg text-center ${className}`}>
        <p className="text-slate-400 text-sm">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );

  return (
    <div className="bg-slate-800 from-slate-900 to-slate-800 bg-gradient-to-br p-6 sm:p-8 rounded-xl w-full shadow-2xl shadow-slate-900/50">
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

// FIX: Removed generics from forwardRef call and explicitly typed the function arguments.
const ShareableResultCard = forwardRef(
    ({ result, isNewBestStreak }: { result: GameResult; isNewBestStreak: boolean; }, ref: React.Ref<HTMLDivElement>) => {
    const { accuracy, longestStreak, hits, misses, omissions, correctRejections } = result;

    const StatCard: React.FC<{ label: string; value: string | number; className?: string }> = ({ label, value, className }) => (
        <div className={`bg-slate-900/50 p-4 rounded-lg text-center ${className}`}>
            <p className="text-slate-400 text-sm">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    );

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


// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  // FIX: Removed generic <Page> from useState call; type is inferred from the initial value.
  const [currentPage, setCurrentPage] = useState(Page.Home);
  // FIX: Removed generic <SocialIcon[]> and used 'as SocialIcon[]' for the initial value to help type inference.
  const [selectedIcons, setSelectedIcons] = useState([] as SocialIcon[]);
  // FIX: Removed generic <number> from useState call; type is inferred from the initial value.
  const [selectedDuration, setSelectedDuration] = useState(GAME_DURATIONS[0]);
  // FIX: Removed generic <GameResult | null> and used 'as GameResult | null' for the initial value.
  const [lastGameResult, setLastGameResult] = useState(null as GameResult | null);
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


// --- RENDER THE APP ---

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);