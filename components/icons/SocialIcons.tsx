import React from 'react';

// Fix: Add style prop to allow dynamic coloring and fix type errors.
export const InstagramIcon: React.FC<{ className?: string; style?: React.CSSProperties; }> = ({ className = '', style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// Fix: Add style prop to allow dynamic coloring and fix type errors.
export const YouTubeIcon: React.FC<{ className?: string; style?: React.CSSProperties; }> = ({ className = '', style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"></polygon>
  </svg>
);

// Fix: Add style prop to allow dynamic coloring and fix type errors.
export const TwitterIcon: React.FC<{ className?: string; style?: React.CSSProperties; }> = ({ className = '', style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

// Fix: Add style prop to allow dynamic coloring and fix type errors.
export const TikTokIcon: React.FC<{ className?: string; style?: React.CSSProperties; }> = ({ className = '', style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 0 .14.02.2.04.53.15.94.48 1.26.9.3.4.49.85.57 1.35.09.57.1 1.15.1 1.73v3.25a4.23 4.23 0 0 1-2.02 3.72c-.87.6-1.84.9-2.85.92-1.33.03-2.66.02-3.99.02a4.23 4.23 0 0 1-3.72-2.02c-.6-1-.9-2.1-.92-3.23-.03-1.34-.02-2.67-.02-4.01a4.23 4.23 0 0 1 2.02-3.72c.87-.6 1.84-.9 2.85-.92 1.33-.03 2.66-.02 3.99-.02ZM16.44 4.87v10.5a3.85 3.85 0 0 1-3.8 3.9c-2.16.03-3.9-1.7-3.93-3.87a3.85 3.85 0 0 1 3.8-3.9c.1 0 .2-.01.31-.01v3.3a.55.55 0 0 0 .54.55c.3 0 .54-.25.54-.55v-3.3c1.3 0 2.59.01 3.88.01Z"/>
    </svg>
);

// Fix: Add style prop to allow dynamic coloring and fix type errors.
export const FacebookIcon: React.FC<{ className?: string; style?: React.CSSProperties; }> = ({ className = '', style }) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);
