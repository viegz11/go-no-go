
import React from 'react';
import Button from './Button';
import Card from './Card';
import { Page } from '../types';

interface HomePageProps {
  onStart: () => void;
  onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStart, onNavigate }) => {
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

export default HomePage;
