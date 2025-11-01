import React, { useState } from 'react';
import Button from './Button';
import Card from './Card';
import { SocialIcon } from '../types';
import { SOCIAL_ICONS, GAME_DURATIONS } from '../constants';

interface IconSelectPageProps {
  onIconSelect: (icons: SocialIcon[], duration: number) => void;
}

const IconSelectPage: React.FC<IconSelectPageProps> = ({ onIconSelect }) => {
  const [selected, setSelected] = useState<SocialIcon[]>([]);
  const [duration, setDuration] = useState<number>(GAME_DURATIONS[0]);

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

export default IconSelectPage;