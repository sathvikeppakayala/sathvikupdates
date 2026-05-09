import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { resumeData } from '../data/resume';
import { PROFILE_IMAGE_URL } from '../config';
import { 
  Mail, Github, Linkedin, MapPin, 
  BookOpen, Briefcase, Code, Trophy, 
  ChevronRight, BrainCircuit, Sparkles, Database, Cloud, Terminal, 
  User, Send, Home, MessageSquare, Globe, Bell, ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';

type Section = 'index' | 'node' | 'arch' | 'updates' | 'uplink';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<Section>('index');
  const scrollContainerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = [
    { id: 'index', label: 'Index', icon: <Home className="w-5 h-5" /> },
    { id: 'node', label: 'Node_Info', icon: <User className="w-5 h-5" /> },
    { id: 'arch', label: 'Arch_Systems', icon: <Code className="w-5 h-5" /> },
    { id: 'updates', label: 'Live_Updates', icon: <Bell className="w-5 h-5" /> },
    { id: 'uplink', label: 'Api_Uplink', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen z-10 text-white flex flex-col md:flex-row overflow-hidden"
    >
      {/* Interactive Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.15), transparent 80%)`
        }}
      />

      {/* Scroll Progress Bar */}
      {(activeSection === 'node' || activeSection === 'arch') && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[60] md:left-24"
          style={{ scaleX }}
        />
      )}

      {/* Sidebar Navigation */}
      <nav className="fixed bottom-0 left-0 w-full md:relative md:w-24 md:min-h-screen bg-black/50 backdrop-blur-2xl border-t md:border-t-0 md:border-r border-white/10 flex flex-row md:flex-col items-center justify-around md:justify-center gap-8 p-4 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id as Section);
              if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
            }}
            className={cn(
              "group relative p-3 rounded-2xl transition-all duration-300",
              activeSection === item.id 
                ? "bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]" 
                : "text-zinc-500 hover:text-emerald-400 hover:bg-white/5"
            )}
          >
            {item.icon}
            <span className="absolute left-full ml-4 px-2 py-1 bg-emerald-600 text-[10px] uppercase font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity hidden md:block whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main 
        ref={scrollContainerRef}
        className="flex-1 relative overflow-y-auto overflow-x-hidden flex flex-col p-6 md:p-12 mb-20 md:mb-0 scroll-smooth"
      >
        <AnimatePresence mode="wait">
          {activeSection === 'index' && (
            <motion.section
              key="index"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.05 }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="max-w-4xl w-full text-center mx-auto my-auto py-12"
            >
              <div className="relative inline-block mb-12">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-emerald-500 p-2 shadow-[0_0_80px_rgba(16,185,129,0.3)] mx-auto overflow-hidden">
                   {PROFILE_IMAGE_URL ? (
                    <img src={PROFILE_IMAGE_URL} alt={resumeData.name} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-500 text-xs text-center p-6 rounded-full italic">
                      [ NODE_VISUAL_PENDING ]
                    </div>
                  )}
                </div>
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-emerald-500 text-black font-black text-[10px] px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> DISTENTION
                </motion.div>
              </div>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 uppercase leading-none">
                {resumeData.name.split(' ')[1]}
                <span className="block text-emerald-500 font-light opacity-50">{resumeData.name.split(' ')[0]}</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 font-mono tracking-widest uppercase mt-6 max-w-2xl mx-auto opacity-70">
                Machine_Intelligence // Data_Architecture
              </p>
              <button 
                onClick={() => setActiveSection('node')}
                className="mt-12 px-8 py-4 bg-emerald-600 text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-white hover:text-black transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] active:scale-95"
              >
                Access_Protocols
              </button>
            </motion.section>
          )}

          {activeSection === 'node' && (
            <motion.section
              key="node"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start py-20 mx-auto"
            >
              <div className="space-y-12 md:sticky md:top-20">
                <div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-emerald-500" /> Technical_Dna
                  </h2>
                  <p className="text-lg text-zinc-400 leading-relaxed font-light italic">
                    "{resumeData.summary}"
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Systems", icon: <Terminal />, items: resumeData.skills.languages },
                    { label: "Neural", icon: <BrainCircuit />, items: resumeData.skills.ml_ai },
                    { label: "Pipeline", icon: <Database />, items: resumeData.skills.data_engineering },
                    { label: "Cloud", icon: <Cloud />, items: resumeData.skills.cloud },
                  ].map((s, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-emerald-500/50 transition-colors">
                      <div className="text-emerald-400 mb-3">{s.icon}</div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 opacity-50">{s.label}</h4>
                      <ul className="space-y-1">
                        {s.items.map((it, i) => (
                          <li key={i} className="text-xs text-white font-mono">{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-emerald-600 text-white relative overflow-hidden">
                  <h3 className="text-2xl font-black uppercase italic mb-8">Validated_Records</h3>
                  <div className="space-y-6">
                    {resumeData.achievements.map((a, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <Trophy className="w-5 h-5 shrink-0 opacity-50" />
                        <p className="text-xs font-bold leading-tight uppercase tracking-wide">{a}</p>
                      </div>
                    ))}
                  </div>
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/20 blur-[80px] rounded-full" />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 border-b border-white/10 mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-400" /> Operational_Timeline
                  </h3>
                  {resumeData.experience.map((ex, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500 transition-colors group">
                      <div className="flex justify-between items-center mb-4">
                         <span className="text-[10px] text-zinc-500 font-mono uppercase bg-black px-3 py-1 rounded-sm border border-white/5">{ex.duration}</span>
                      </div>
                      <h4 className="text-lg font-black uppercase tracking-tight text-white mb-2 group-hover:text-emerald-400 transition-colors">{ex.company}</h4>
                      <p className="text-xs text-zinc-500 uppercase font-bold mb-4">{ex.role}</p>
                      <p className="text-sm text-zinc-400 italic leading-relaxed">"{ex.description}"</p>
                    </div>
                  ))}
                  
                  {/* Education info briefly */}
                  <div className="p-8 rounded-3xl bg-zinc-900 border border-white/5 mt-4">
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-4">Academic_Foundation</h4>
                     {resumeData.education.map((edu, i) => (
                       <div key={i}>
                         <p className="text-sm font-bold text-white">{edu.institution}</p>
                         <p className="text-xs text-emerald-400 font-mono mt-1">{edu.degree}</p>
                         <p className="text-[10px] text-zinc-500 mt-2">{edu.details}</p>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'arch' && (
            <motion.section
              key="arch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl w-full py-20 mx-auto"
            >
              <div className="text-center mb-20">
                <motion.h2 
                  initial={{ rotateX: 90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4"
                >
                  Architecture<span className="text-emerald-500"></span>
                </motion.h2>
                <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {resumeData.projects.map((proj, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative rounded-3xl bg-zinc-900 border border-white/5 overflow-hidden shadow-2xl flex flex-col"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent transition-all duration-700" />
                    
                    {/* Project Header */}
                    <div className="relative z-10 p-8 md:p-12 border-b border-white/5 flex justify-between items-start">
                      <div>
                         <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mb-2 block">System_Node_{idx + 1}</span>
                         <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none group-hover:text-emerald-400 transition-colors">{proj.name}</h3>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-600/10 border border-emerald-500/20">
                        <Terminal className="w-6 h-6 text-emerald-400" />
                      </div>
                    </div>

                    {/* Project Body */}
                    <div className="relative z-10 p-8 md:p-12 space-y-8 flex-1">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 underline decoration-emerald-500/30 underline-offset-4">Abstract_Overview</h4>
                        <p className="text-zinc-400 text-lg italic font-light leading-relaxed">
                          "{proj.description}"
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 underline decoration-emerald-500/30 underline-offset-4">Stack_Definition</h4>
                        <div className="flex flex-wrap gap-2">
                           {proj.tech.split(',').map((t, i) => (
                             <span key={i} className="text-[10px] font-mono text-white bg-emerald-500/10 px-3 py-1 rounded-sm border border-emerald-500/20 uppercase italic">
                                {t.trim()}
                             </span>
                           ))}
                        </div>
                      </div>

                      <div className="space-y-4 bg-black/40 p-6 rounded-2xl border border-white/5 font-mono text-[9px] text-zinc-500">
                         <div className="flex justify-between border-b border-white/5 pb-2 mb-2">
                            <span>L0_DEPLOYMENT:</span>
                            <span className="text-emerald-400">SUCCESS</span>
                         </div>
                         <div className="flex justify-between">
                            <span>RESOURCE_ALLOC:</span>
                            <span className="text-white">SCALABLE_V2</span>
                         </div>
                         <div className="flex justify-between">
                            <span>UPLINK_STATUS:</span>
                            <span className="text-white">ENCRYPTED</span>
                         </div>
                         <div className="flex justify-between pt-2 mt-2 border-t border-white/5">
                            <span>API_LATENCY:</span>
                            <span className="text-white">12ms_OPTIMIZED</span>
                         </div>
                      </div>

                      {/* Technical detail lines */}
                      <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
                         <div>
                            <span className="text-[8px] font-mono text-zinc-600 uppercase block mb-1">Architecture</span>
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Distributed_Cloud</span>
                         </div>
                         <div>
                            <span className="text-[8px] font-mono text-zinc-600 uppercase block mb-1">State_Mode</span>
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Production_Stable</span>
                         </div>
                      </div>
                    </div>

                    <div className="relative z-10 p-8 border-t border-white/5 bg-black/20 flex justify-between items-center group-hover:bg-emerald-600 transition-all duration-500">
                       <span className="text-[10px] font-mono text-zinc-600 group-hover:text-white uppercase tracking-widest">Protocol: Established</span>
                       <div className="flex items-center gap-2">
                          <div className="w-10 h-[1px] bg-white/10 group-hover:bg-white/40" />
                          <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:text-white" />
                       </div>
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  className="md:col-span-2 p-12 rounded-3xl bg-emerald-600 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative shadow-[0_0_100px_rgba(16,185,129,0.2)]"
                >
                  <div className="relative z-10 flex-1">
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic">Distributed_Pipeline</h3>
                    <p className="text-xl font-light opacity-90 leading-relaxed mb-8">
                      Engineering modular, high-throughput systems with a focus on data integrity, scalable infrastructure, and AI-driven optimization across heterogeneous environments.
                    </p>
                    <div className="flex flex-wrap gap-4">
                       <div className="px-6 py-3 rounded-full bg-black/20 text-[10px] font-bold uppercase tracking-widest border border-white/10">Architecture_V3</div>
                       <div className="px-6 py-3 rounded-full bg-white text-emerald-600 text-[10px] font-bold uppercase tracking-widest">Sync_Stable</div>
                    </div>
                  </div>
                  <Globe className="relative z-10 w-48 h-48 opacity-20 animate-pulse" />
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] -mr-48 -mt-48 rounded-full" />
                </motion.div>
              </div>
            </motion.section>
          )}

          {activeSection === 'updates' && (
            <motion.section
              key="updates"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="max-w-4xl w-full py-20 mx-auto"
            >
              <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
                 <div className="text-left">
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2">
                       Broadcast_<span className="text-emerald-500">Feed</span>
                    </h2>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em]">Operational_Intel_Stream</p>
                 </div>
                 <div className="flex items-center gap-4 text-emerald-500 font-mono text-[10px]">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    LIVE_CONNECTION_STABLE
                 </div>
              </div>

              <div className="space-y-6">
                {(resumeData as any).updates?.map((item: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 transition-all backdrop-blur-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                       <div className="space-y-4 flex-1">
                          <div className="flex items-center gap-3">
                             <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                                {item.status}
                             </span>
                             <span className="text-[10px] font-mono text-zinc-600 uppercase italic">{item.date}</span>
                          </div>
                          
                          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                             {item.title}
                          </h3>
                          
                          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl italic font-light">
                             "{item.description}"
                          </p>

                          <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-2">
                             <h4 className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Prerequisites_&_Eligibility</h4>
                             <p className="text-xs text-white font-medium">{item.eligibility}</p>
                          </div>
                       </div>
                       
                       <a 
                         href={item.link} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="h-fit px-6 py-3 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-black transition-all shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
                       >
                         Execute_Form <ExternalLink className="w-3 h-3" />
                       </a>
                    </div>
                  </motion.div>
                ))}

                {/* Empty State / placeholder if no updates */}
                {(!(resumeData as any).updates || (resumeData as any).updates.length === 0) && (
                   <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                      <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest">No_Active_Transmissions</p>
                   </div>
                )}
              </div>

              {/* Technical Footnote */}
              <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                 <div className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    <span className="text-[8px] font-mono uppercase">DATA_SOURCE: LOCAL_RESUME_SYNC</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4" />
                    <span className="text-[8px] font-mono uppercase">DEPLOY_TARGET: PRODUCTION</span>
                 </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'uplink' && (
            <motion.section
              key="uplink"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="max-w-2xl w-full text-center mx-auto my-auto py-20"
            >
              <div className="mb-12 inline-flex p-8 rounded-2xl bg-emerald-600 shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                <Send className="w-10 h-10" />
              </div>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 underline decoration-emerald-500 decoration-8 underline-offset-8">Uplink.Api</h2>
              <p className="text-xl text-zinc-400 font-mono tracking-widest mb-16 uppercase opacity-60">
                Establishing_Direct_Connection
              </p>
              
              <div className="space-y-4 mb-20 text-left">
                <a href={`mailto:${resumeData.contact.email}`} className="block p-8 rounded-2xl bg-zinc-900 border border-white/5 hover:border-emerald-500 hover:bg-emerald-600 transition-all group">
                  <span className="text-[10px] text-zinc-600 uppercase font-mono block mb-2 tracking-[.3em]">Protocol: Smtp</span>
                  <span className="text-xl md:text-3xl font-black uppercase tracking-tighter group-hover:text-white transition-colors">{resumeData.contact.email}</span>
                </a>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href={`https://${resumeData.contact.linkedin}`} target="_blank" className="p-8 rounded-2xl bg-zinc-900 border border-white/5 hover:border-emerald-400 transition-all flex flex-col gap-2">
                    <Linkedin className="w-6 h-6 text-emerald-400" />
                    <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-[.3em]">Network: LinkedIn</span>
                    <span className="font-bold text-sm uppercase tracking-widest">Connect_Professional</span>
                  </a>
                  <a href={`https://${resumeData.contact.github}`} target="_blank" className="p-8 rounded-2xl bg-zinc-900 border border-white/5 hover:border-white transition-all flex flex-col gap-2">
                    <Github className="w-6 h-6" />
                    <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-[.3em]">Storage: GitHub</span>
                    <span className="font-bold text-sm uppercase tracking-widest">Access_Source</span>
                  </a>
                </div>
              </div>

              <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-[1em] opacity-40">
                End_Transcript
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Status Decals */}
      <div className="hidden lg:block fixed top-10 right-10 text-[10px] font-mono text-emerald-500/30 text-right space-y-1 pointer-events-none z-50 uppercase tracking-widest">
        <p>System_Ready</p>
        <p>Arch: X64_AI</p>
        <p>Sect_Actv: {activeSection}</p>
      </div>
    </div>
  );
}
