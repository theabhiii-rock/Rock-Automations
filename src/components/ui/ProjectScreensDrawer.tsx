'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Send,
  Sparkles,
  Maximize2,
  ZoomIn,
  ArrowRight,
  Eye,
  CheckCircle2,
} from 'lucide-react';

export interface ScreenShotItem {
  title: string;
  url: string;
  caption: string;
  tag?: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  thumbnail: string;
  badge?: string;
  screens: ScreenShotItem[];
  liveUrl?: string | null;
  isTelegram?: boolean;
  actionLabel?: string;
  technologies?: string[];
}

interface ProjectScreensDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDetail | null;
}

export default function ProjectScreensDrawer({
  isOpen,
  onClose,
  project,
}: ProjectScreensDrawerProps) {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset screen index when project changes or drawer opens
  useEffect(() => {
    setActiveScreenIndex(0);
    setIsZoomed(false);
  }, [project]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (isZoomed) {
            setIsZoomed(false);
          } else {
            onClose();
          }
        } else if (e.key === 'ArrowRight' && project && project.screens.length > 1) {
          nextScreen();
        } else if (e.key === 'ArrowLeft' && project && project.screens.length > 1) {
          prevScreen();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, isZoomed, project, activeScreenIndex]);

  if (!isOpen || !project) return null;

  const currentScreen = project.screens[activeScreenIndex] || project.screens[0];

  const nextScreen = () => {
    if (!project || project.screens.length <= 1) return;
    const nextIdx = (activeScreenIndex + 1) % project.screens.length;
    setActiveScreenIndex(nextIdx);
    scrollToScreen(nextIdx);
  };

  const prevScreen = () => {
    if (!project || project.screens.length <= 1) return;
    const prevIdx = (activeScreenIndex - 1 + project.screens.length) % project.screens.length;
    setActiveScreenIndex(prevIdx);
    scrollToScreen(prevIdx);
  };

  const scrollToScreen = (idx: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const targetChild = container.children[idx] as HTMLElement;
      if (targetChild) {
        targetChild.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative z-10 w-full max-w-4xl bg-[#080B12] border-l border-amber-500/30 text-white flex flex-col h-full shadow-2xl animate-slideInRight overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-[#0B0F19] flex items-center justify-between gap-4 shrink-0">
          <div className="space-y-1 pr-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{project.category}</span>
              </span>
              {project.screens.length > 1 && (
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-mono">
                  {activeScreenIndex + 1} of {project.screens.length} Screens • Side Scrollable
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs text-slate-400 line-clamp-1">
              {project.subtitle}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition cursor-pointer shrink-0"
            title="Close Drawer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Side-by-Side Horizontal Scroll Strip Container */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-amber-400">
                <Eye className="w-3.5 h-3.5" />
                <span>In-App Real Production Screenshots</span>
              </span>
              {project.screens.length > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 hidden sm:inline">
                    Scroll sideways or click arrows
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={prevScreen}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                      title="Previous screen"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextScreen}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                      title="Next screen"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Horizontal Snap Scroll Gallery */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth no-scrollbar"
              style={{ scrollbarWidth: 'thin' }}
            >
              {project.screens.map((screen, sIdx) => {
                const isActive = sIdx === activeScreenIndex;
                return (
                  <div
                    key={sIdx}
                    onClick={() => setActiveScreenIndex(sIdx)}
                    className={`shrink-0 w-[85%] sm:w-[92%] snap-center rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col bg-[#05070B] cursor-pointer group ${
                      isActive
                        ? 'border-amber-500 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/40'
                        : 'border-slate-800/80 opacity-70 hover:opacity-100 hover:border-slate-700'
                    }`}
                  >
                    {/* Top Bar for Each Screen */}
                    <div className="px-4 py-2.5 bg-[#0B0F19] border-b border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span className="font-semibold text-white">{screen.title}</span>
                      </div>
                      {screen.tag && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-300 font-mono">
                          {screen.tag}
                        </span>
                      )}
                    </div>

                    {/* Screenshot Preview Image Container */}
                    <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-black flex items-center justify-center overflow-hidden">
                      <img
                        src={screen.url}
                        alt={screen.title}
                        className="w-full h-full object-contain group-hover:scale-[1.01] transition-transform duration-300"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveScreenIndex(sIdx);
                          setIsZoomed(true);
                        }}
                        className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/80 hover:bg-amber-500 text-white hover:text-black border border-white/20 transition backdrop-blur-md flex items-center gap-1.5 text-xs font-semibold shadow-lg"
                        title="Zoom In / Full View"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Inspect Full-Res</span>
                      </button>
                    </div>

                    {/* Caption / Description */}
                    <div className="p-3.5 bg-[#0A0D15] border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                      {screen.caption}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Thumbnail Selectors (if more than 1 screen) */}
            {project.screens.length > 1 && (
              <div className="flex items-center justify-center gap-2 pt-1">
                {project.screens.map((sc, scIdx) => (
                  <button
                    key={scIdx}
                    onClick={() => {
                      setActiveScreenIndex(scIdx);
                      scrollToScreen(scIdx);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeScreenIndex === scIdx
                        ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                        : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    <span>{sc.tag || `Screen 0${scIdx + 1}`}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Overview Card */}
          <div className="p-5 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-4">
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-amber-400 font-mono mb-1">
                Architectural Summary
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Pills */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] uppercase font-bold text-slate-400 font-mono block">
                  Core Technologies &amp; Architecture:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t, tidx) => (
                    <span
                      key={tidx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-800/90 text-xs text-slate-200 border border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0B0F19] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Built &amp; Verified by Abhishek Kumar (Rock Automations)</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Close
            </button>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
              >
                {project.isTelegram ? (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{project.actionLabel || 'Launch Telegram Bot'}</span>
                  </>
                ) : (
                  <>
                    <span>{project.actionLabel || 'Visit Live Application'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </>
                )}
              </a>
            )}
          </div>
        </div>

      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsZoomed(false)}
        >
          <div className="absolute top-5 right-5 flex items-center gap-3 z-70">
            <span className="text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              Press ESC or click anywhere to exit zoom
            </span>
            <button
              onClick={() => setIsZoomed(false)}
              className="p-2 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition"
              title="Close Zoom"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="max-w-6xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 text-center">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                {currentScreen.title}
              </span>
            </div>
            <img
              src={currentScreen.url}
              alt={currentScreen.title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl border border-amber-500/40 shadow-2xl"
            />
            <p className="mt-3 text-xs text-slate-400 text-center max-w-xl">
              {currentScreen.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
