import { InstagramIcon, YouTubeIcon, TwitterIcon, TikTokIcon, FacebookIcon } from './components/icons/SocialIcons';
import { SocialIcon } from './types';

export const SOCIAL_ICONS: SocialIcon[] = [
  { id: 'instagram', name: 'Instagram', component: InstagramIcon, color: '#E1306C' },
  { id: 'youtube', name: 'YouTube', component: YouTubeIcon, color: '#FF0000' },
  { id: 'twitter', name: 'Twitter', component: TwitterIcon, color: '#1DA1F2' },
  { id: 'tiktok', name: 'TikTok', component: TikTokIcon, color: '#000000' },
  { id: 'facebook', name: 'Facebook', component: FacebookIcon, color: '#1877F2' },
];

export const GAME_DURATIONS = [30, 60, 90]; // in seconds
export const SIGNAL_ON_DURATION_MS = 800;
export const SIGNAL_OFF_DURATION_MS = 200;
export const GO_SIGNAL_PROBABILITY = 0.7; // 70%