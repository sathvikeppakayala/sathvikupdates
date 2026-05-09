import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Shield, Globe, Zap, Terminal as TerminalIcon, Database, Layers } from 'lucide-react';
import { cn } from '../lib/utils';

export default function SystemBoot({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logLines, setLogLines] = useState<string[]>([]);

  const bootLogs = [
    "INITIALIZING CORE_KERNEL_V2.0...",
    "ESTABLISHING NEURAL_LINK_PROTOCOL...",
    "MOUNTING DATA_VOLUMES [OK]",
    "CONFIGURING GCP_VERTEX_AI_NODES...",
    "SYNCING DISTRIBUTED_ETL_PIPELINES...",
    "VALIDATING SECURITY_GROUPS...",
    "UPLINK STABILIZED. BOOT COMPLETE."
  ];

  useEffect(() => {
    const totalDuration = 4000;
    const interval = 40; // ms
    const increment = (100 / (totalDuration / interval));

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return next;
      });
    }, interval);

    // Sync log lines with progress
    const logsTimer = setInterval(() => {
      setLogLines(prev => {
        const lineIdx = Math.floor((progress / 100) * bootLogs.length);
        if (lineIdx >= prev.length && lineIdx < bootLogs.length) {
          return [...prev, bootLogs[lineIdx]].slice(-5);
        }
        return prev;
      });
    }, 200);

    return () => {
      clearInterval(progressTimer);
      clearInterval(logsTimer);
    };
  }, [progress]);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(onComplete, 800);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden px-6 font-mono">
      <div className="w-full max-w-xl space-y-12">
        
        {/* Visual Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-widest text-white uppercase">Sathvik_OS</h1>
              <p className="text-[10px] text-zinc-500 uppercase">Architecture: X64_AI_ENGINE</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-emerald-400">SESSION_ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
            <p className="text-[10px] text-zinc-500">Uptime: 0.00{Math.floor(progress)}s</p>
          </div>
        </div>

        {/* Center Loading Ring */}
        <div className="relative flex justify-center py-10">
          <div className="relative w-40 h-40">
             <svg className="w-full h-full rotate-[-90deg]">
               <circle
                 cx="80"
                 cy="80"
                 r="70"
                 className="stroke-zinc-800 fill-none"
                 strokeWidth="2"
               />
               <motion.circle
                 cx="80"
                 cy="80"
                 r="70"
                 className="stroke-emerald-500 fill-none"
                 strokeWidth="2"
                 strokeDasharray="440"
                 animate={{ strokeDashoffset: 440 - (440 * progress) / 100 }}
                 style={{ strokeLinecap: 'round' }}
               />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">{Math.floor(progress)}%</span>
                <span className="text-[8px] text-emerald-400 tracking-[.3em] uppercase">Booting</span>
             </div>
          </div>

          {/* Floating Icons around the ring */}
          {[Database, Globe, Shield, Zap, Layers].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute text-emerald-500/30"
              animate={{
                rotate: 360,
                x: 100 * Math.cos((i * 2 * Math.PI) / 5),
                y: 100 * Math.sin((i * 2 * Math.PI) / 5),
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Icon className="w-4 h-4" />
            </motion.div>
          ))}
        </div>

        {/* Terminal Logs */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 min-h-[160px] relative overflow-hidden backdrop-blur-md">
           <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/10" />
           <div className="space-y-2">
             <div className="flex items-center gap-2 text-zinc-600 mb-4">
                <TerminalIcon className="w-3 h-3" />
                <span className="text-[10px] uppercase font-bold tracking-widest">System Output</span>
             </div>
             {logLines.map((line, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className={cn(
                   "text-[10px] flex gap-3",
                   i === logLines.length - 1 ? "text-emerald-400" : "text-zinc-500"
                 )}
               >
                 <span className="opacity-30">[{new Date().toLocaleTimeString()}]</span>
                 <span>{line}</span>
               </motion.div>
             ))}
           </div>
           {/* Scanline Effect */}
           <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/2 animate-[scan_4s_linear_infinite]" />
        </div>

        <div className="flex justify-between items-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest px-2">
          <span>AI_CORE_READY</span>
          <div className="flex gap-1">
             {[1,2,3,4].map(i => (
               <div key={i} className={cn("w-2 h-2 rounded-sm", progress >= i * 25 ? "bg-emerald-500" : "bg-zinc-800")} />
             ))}
          </div>
          <span>UPLINK_STABLE</span>
        </div>
      </div>
    </div>
  );
}
