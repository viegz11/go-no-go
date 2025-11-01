import React from 'react';
import Button from './Button';
import Card from './Card';
import { GoSignalIcon } from './icons/GoSignalIcon';
import { InstagramIcon } from './icons/SocialIcons';
import { SOCIAL_ICONS } from '../constants';

interface InstructionsPageProps {
  onNext: () => void;
}

const InstructionsPage: React.FC<InstructionsPageProps> = ({ onNext }) => {
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

export default InstructionsPage;