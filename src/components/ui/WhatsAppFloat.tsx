'use client';
import React, { useState, useEffect } from 'react';

const WA_URL =
  'https://wa.me/916209817520?text=Hi%20Rock%20Automations!%20I%20want%20to%20grow%20my%20business.';

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Slide in after 2 seconds
  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(showTimer);
  }, []);

  // Stop pulse after 6 seconds so it's not perpetually distracting
  useEffect(() => {
    const pulseTimer = setTimeout(() => setPulse(false), 8000);
    return () => clearTimeout(pulseTimer);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-6 sm:right-6 bottom-4 right-4 z-50 flex flex-col items-end gap-2 transition-all duration-500 ease-out ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'
      }`}
      style={{ bottom: '1.5rem', right: '1.5rem' }}
    >
      {/* Tooltip */}
      <div
        className={`bg-[#0D111A] border border-green-500/40 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
          hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
        }`}
        role="tooltip"
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        <span>Chat with Abhishek on WhatsApp</span>
      </div>

      {/* Button Wrapper */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Rock Automations on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl focus:outline-none focus:ring-4 focus:ring-green-400/50 group"
      >
        {/* Pulse rings */}
        {pulse && (
          <>
            <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping [animation-delay:0.3s]" />
          </>
        )}

        {/* Hover glow ring */}
        <span
          className={`absolute inset-0 rounded-full bg-green-400 transition-opacity duration-300 ${
            hovered ? 'opacity-20' : 'opacity-0'
          }`}
        />

        {/* Button face */}
        <span className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 group-hover:bg-green-400 transition-colors duration-200">
          {/* WhatsApp SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-7 h-7 fill-white"
            aria-hidden="true"
          >
            <path d="M16.003 2.667C8.639 2.667 2.667 8.639 2.667 16c0 2.364.637 4.633 1.747 6.607L2.667 29.333l6.921-1.715A13.29 13.29 0 0 0 16.003 29.333c7.364 0 13.33-5.972 13.33-13.333S23.367 2.667 16.003 2.667zm0 24A10.63 10.63 0 0 1 10.38 24.9l-.379-.225-3.929.974.99-3.829-.247-.394A10.617 10.617 0 0 1 5.333 16c0-5.879 4.788-10.667 10.67-10.667S26.673 10.121 26.673 16s-4.788 10.667-10.67 10.667zm5.848-7.987c-.319-.16-1.888-.93-2.181-1.037-.294-.107-.508-.16-.722.16-.213.32-.826 1.036-.013 1.249.161.043.294.087.454.147.72.267 1.49.347 2.14-.08.267-.173.481-.399.641-.68.16-.293.08-.507-.08-.64l-.239-.119zm-5.2 5.007c-.9-.053-1.773-.293-2.553-.707L9.6 24.68l.747-2.72c-.48-.787-.747-1.693-.747-2.653 0-2.827 2.293-5.12 5.12-5.12 1.36 0 2.64.533 3.6 1.493s1.493 2.24 1.493 3.6c-.013 2.8-2.293 5.12-5.162 5.12z" />
          </svg>
        </span>
      </a>
    </div>
  );
}
