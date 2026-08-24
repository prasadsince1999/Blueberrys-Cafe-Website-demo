import React from 'react';
import { cn } from '../lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-full h-full", className)}>
      <style>
        {`
          .logo-blue { fill: #0076F5; }
          .logo-dark-blue { fill: #0012B5; }
          .logo-white { fill: #FFFFFF; }
          .logo-text { font-family: 'Nunito', 'Arial Rounded MT Bold', system-ui, -apple-system, sans-serif; font-weight: 900; font-style: italic; font-size: 26px; }
        `}
      </style>
      
      <defs>
        <clipPath id="circle-clip">
          <circle cx="140" cy="100" r="86" />
        </clipPath>
      </defs>

      {/* Outer border */}
      <circle cx="140" cy="100" r="96" className="logo-dark-blue" />
      <circle cx="140" cy="100" r="90" className="logo-white" />
      <circle cx="140" cy="100" r="86" className="logo-blue" />

      {/* Stripes */}
      <g clipPath="url(#circle-clip)">
        {/* Draw white background for bottom half */}
        <rect x="0" y="100" width="280" height="100" className="logo-white" />
        {/* Draw blue stripes */}
        <rect x="55" y="100" width="10" height="100" className="logo-blue" />
        <rect x="75" y="100" width="10" height="100" className="logo-blue" />
        <rect x="95" y="100" width="10" height="100" className="logo-blue" />
        <rect x="115" y="100" width="10" height="100" className="logo-blue" />
        <rect x="135" y="100" width="10" height="100" className="logo-blue" />
        <rect x="155" y="100" width="10" height="100" className="logo-blue" />
        <rect x="175" y="100" width="10" height="100" className="logo-blue" />
        <rect x="195" y="100" width="10" height="100" className="logo-blue" />
        <rect x="215" y="100" width="10" height="100" className="logo-blue" />
      </g>

      {/* Horizontal banner */}
      <rect x="10" y="77" width="260" height="46" rx="8" className="logo-dark-blue" />
      <rect x="14" y="80" width="252" height="40" rx="5" className="logo-white" />
      <rect x="18" y="83" width="244" height="34" rx="3" className="logo-blue" />

      {/* Text */}
      <text x="140" y="108" className="logo-white logo-text" textAnchor="middle" letterSpacing="0">Blueberrys Cafe'</text>

      {/* Coffee Cup */}
      <g transform="translate(140, 56)">
        {/* Handle */}
        <path d="M14,-5 C25,-5 25,6 12,8" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        {/* Cup Bowl */}
        <path d="M-18,-8 L18,-8 C18,12 -18,12 -18,-8 Z" className="logo-white" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
        {/* Steam 1 (Left) */}
        <path d="M-4,-14 C-8,-18 -1,-24 -5,-30" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        {/* Steam 2 (Right) */}
        <path d="M5,-12 C10,-18 3,-25 8,-32" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
