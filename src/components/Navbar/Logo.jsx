import React from 'react';

export default function Logo({ size = 40, color = 'var(--text-dark)' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Dynamic, modern interlocking R and M shape */}
      <path 
        d="M20 80 V20 H50 C65 20 65 45 50 45 H35 M45 45 L65 80" 
        stroke={color} 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M80 80 V40 L65 55 L50 40 V20" 
        stroke="var(--accent)" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        opacity="0.9"
      />
      <circle 
        cx="80" 
        cy="20" 
        r="6" 
        fill="var(--accent)" 
      />
    </svg>
  );
}
