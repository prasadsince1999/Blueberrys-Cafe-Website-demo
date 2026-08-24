import React from 'react';
import { cn } from '../lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={cn("w-full h-full", className)}
      aria-hidden="true"
    >
      {/* Outer Teal Circle Badge */}
      <circle cx="50" cy="50" r="48" fill="#155E68" />
      
      {/* Dashed White Inner Ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="42" 
        fill="none" 
        stroke="#FFFFFF" 
        strokeWidth="2.2" 
        strokeDasharray="4.5 3.5" 
      />

      {/* Coffee / Tea Cup Body */}
      <path 
        d="M32 38 C32 38 32 58 50 58 C68 58 68 38 68 38 Z" 
        fill="#FFFFFF" 
      />
      {/* Cup Handle on the Right */}
      <path 
        d="M66 40 C75 40 76 54 65 54" 
        fill="none" 
        stroke="#FFFFFF" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
      />

      {/* Saucer curved arc */}
      <path 
        d="M27 65 C40 71 60 71 73 65" 
        fill="none" 
        stroke="#FFFFFF" 
        strokeWidth="4" 
        strokeLinecap="round" 
      />

      {/* Pink Cherry Blossom on Cup */}
      <g transform="translate(50, 47)">
        {/* 5 Petals */}
        <circle cx="0" cy="-4.2" r="2.2" fill="#E98FA7" />
        <circle cx="4.0" cy="-1.3" r="2.2" fill="#E98FA7" />
        <circle cx="2.5" cy="3.4" r="2.2" fill="#E98FA7" />
        <circle cx="-2.5" cy="3.4" r="2.2" fill="#E98FA7" />
        <circle cx="-4.0" cy="-1.3" r="2.2" fill="#E98FA7" />
        {/* Blossom Center Core */}
        <circle cx="0" cy="0" r="1.6" fill="#C94F72" />
      </g>
    </svg>
  );
}
