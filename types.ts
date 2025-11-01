import React from 'react';

export enum Page {
  Home = 'HOME',
  Instructions = 'INSTRUCTIONS',
  IconSelect = 'ICON_SELECT',
  Game = 'GAME',
  Results = 'RESULTS',
  Progress = 'PROGRESS',
  Science = 'SCIENCE',
}

export interface SocialIcon {
  id: string;
  name: string;
  // Fix: Add `style` to the component's props definition to allow dynamic styling.
  component: React.FC<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

export interface GameResult {
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
