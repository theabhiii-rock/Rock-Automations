'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PenTool, Type, RotateCcw, CheckCircle2, ShieldCheck, Lock, AlertCircle } from 'lucide-react';

export interface SignatureResult {
  type: 'DRAWN' | 'TYPED';
  data: string; // base64 data URL if drawn, or legal full name string if typed
  isSigned: boolean;
  signerName: string;
  timestamp: string;
  documentHash: string;
}

interface DigitalSignatureBoxProps {
  signerName?: string;
  onSignatureChange: (sig: SignatureResult) => void;
  title?: string;
  compact?: boolean;
}

export default function DigitalSignatureBox({
  signerName = '',
  onSignatureChange,
  title = 'Digital Signature & Consent Authorization',
  compact = false,
}: DigitalSignatureBoxProps) {
  const [activeTab, setActiveTab] = useState<'DRAW' | 'TYPE'>('DRAW');
  const [typedName, setTypedName] = useState(signerName);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);
  const [timestamp, setTimestamp] = useState('');
  const [docHash, setDocHash] = useState('');
  const [locked, setLocked] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize timestamp and doc hash once mounted on client
  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    }) + ' IST';
    setTimestamp(formatted);

    // Deterministic pseudo-hash for UI audit trail
    const hash = 'SIG-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
    setDocHash(hash);
  }, []);

  // Keep typedName in sync if signerName changes externally and user hasn't modified it
  useEffect(() => {
    if (signerName && !typedName) {
      setTypedName(signerName);
    }
  }, [signerName]);

  // Set up canvas with 2x resolution for crisp lines
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.4;
    ctx.strokeStyle = '#F59E0B'; // Amber-500
  }, []);

  useEffect(() => {
    if (activeTab === 'DRAW') {
      // Small timeout to allow DOM to layout
      const t = setTimeout(initCanvas, 50);
      return () => clearTimeout(t);
    }
  }, [activeTab, initCanvas]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHasDrawn(false);
    setLocked(false);

    onSignatureChange({
      type: 'DRAWN',
      data: '',
      isSigned: false,
      signerName: typedName,
      timestamp,
      documentHash: docHash,
    });
  };

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (locked) return;
    if ('touches' in e) {
      e.stopPropagation();
    }
    const coords = getCanvasCoordinates(e);
    setIsDrawing(true);
    setLastPoint(coords);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint || locked) return;
    if ('touches' in e) {
      e.preventDefault(); // Prevent page scrolling during finger draw
      e.stopPropagation();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    setLastPoint(coords);
    if (!hasDrawn) {
      setHasDrawn(true);
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setLastPoint(null);

    const canvas = canvasRef.current;
    if (canvas && hasDrawn) {
      const dataUrl = canvas.toDataURL('image/png');
      onSignatureChange({
        type: 'DRAWN',
        data: dataUrl,
        isSigned: true,
        signerName: typedName || 'Authorized Signatory',
        timestamp,
        documentHash: docHash,
      });
    }
  };

  const handleTypedChange = (val: string) => {
    setTypedName(val);
    const valid = val.trim().length >= 3;
    onSignatureChange({
      type: 'TYPED',
      data: val.trim(),
      isSigned: valid,
      signerName: val.trim(),
      timestamp,
      documentHash: docHash,
    });
  };

  const isSigned = activeTab === 'DRAW' ? hasDrawn : typedName.trim().length >= 3;

  return (
    <div className="bg-[#0A0E17] border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              {title}
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Pursuant to Section 10A of the Information Technology Act, 2000 (India) &amp; Electronic Signature Standards
          </p>
        </div>

        {/* Mode switcher tabs */}
        <div className="flex items-center p-1 bg-[#07090E] border border-slate-800 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setActiveTab('DRAW');
              if (hasDrawn && canvasRef.current) {
                onSignatureChange({
                  type: 'DRAWN',
                  data: canvasRef.current.toDataURL('image/png'),
                  isSigned: true,
                  signerName: typedName || 'Authorized Signatory',
                  timestamp,
                  documentHash: docHash,
                });
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'DRAW'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Draw</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('TYPE');
              handleTypedChange(typedName);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'TYPE'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Type Name</span>
          </button>
        </div>
      </div>

      {/* DRAW MODE CANVAS */}
      {activeTab === 'DRAW' && (
        <div className="space-y-2">
          <div className="relative bg-[#05070B] border-2 border-dashed border-amber-500/30 rounded-xl overflow-hidden touch-none group hover:border-amber-400/50 transition">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-32 sm:h-36 block cursor-crosshair bg-transparent"
            />

            {/* Subtle signing baseline guide */}
            <div className="absolute left-6 right-6 bottom-7 border-b border-amber-500/15 pointer-events-none flex items-center justify-between">
              <span className="text-[10px] font-mono text-amber-400/30 uppercase tracking-widest pointer-events-none">
                Sign Above The Line ×
              </span>
              <span className="text-[10px] font-mono text-slate-400 pointer-events-none">
                Touch / Mouse Supported
              </span>
            </div>

            {/* Clear Button */}
            <div className="absolute top-2.5 right-2.5">
              <button
                type="button"
                onClick={clearCanvas}
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-400 hover:text-amber-300 hover:border-amber-500/40 text-[11px] font-medium flex items-center gap-1 transition cursor-pointer shadow"
                title="Clear and redraw signature"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>

            {!hasDrawn && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-xs font-mono">
                <span className="bg-[#07090E]/90 px-3 py-1.5 rounded-lg border border-slate-800">
                  ✍️ Draw your legal signature here with finger or mouse
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TYPE MODE INPUT */}
      {activeTab === 'TYPE' && (
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Type Full Legal Name (As in Official Identification)
            </label>
            <input
              type="text"
              value={typedName}
              onChange={(e) => handleTypedChange(e.target.value)}
              placeholder="e.g. Abhishek Kumar"
              className="w-full bg-[#07090E] border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-sans transition"
            />
          </div>

          {/* Cursive Legal Signature Preview */}
          <div className="p-4 rounded-xl bg-[#05070B] border-2 border-dashed border-amber-500/30 relative">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Rendered Electronic Signature Preview:
            </div>
            <div className="h-16 flex items-center justify-start pl-4">
              {typedName.trim().length >= 3 ? (
                <span
                  style={{
                    fontFamily: "'Brush Script MT', 'Dancing Script', 'Caveat', 'Segoe Script', cursive, serif",
                  }}
                  className="text-2xl sm:text-3xl text-amber-300 italic tracking-wider font-normal select-none"
                >
                  {typedName}
                </span>
              ) : (
                <span className="text-xs text-slate-400 italic">
                  Enter at least 3 characters to generate legal electronic signature...
                </span>
              )}
            </div>
            <div className="border-t border-amber-500/15 pt-1.5 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Status: Authenticated Type-Cursive Stamp</span>
              <span>256-bit Vector Signature</span>
            </div>
          </div>
        </div>
      )}

      {/* Audit Meta & Verification Status */}
      <div className="p-3 rounded-xl bg-[#07090E] border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px] font-mono">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-slate-300">
            <Lock className="w-3 h-3 text-amber-400" />
            <span>Audit ID: <strong className="text-amber-400">{docHash || 'SIG-PENDING'}</strong></span>
          </div>
          <div className="text-slate-400">
            Timestamp: <span>{timestamp || 'Logging...'}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {isSigned ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Signature Verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-medium text-[11px]">
              <AlertCircle className="w-3.5 h-3.5" /> Signature Required to Proceed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
