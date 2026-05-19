/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, ChevronLeft, Lock, Play, Pause, Send } from "lucide-react";
import { 
  ZODIAC_SIGNS, 
  IMAGE_ROOT, 
  DECADES, 
  MARITAL_STATUSES, 
  CHALLENGES, 
  GENDERS,
  MONTH_NAMES,
  ANGELS,
  CAPTIONS,
  CAPTIONS2,
  AUDIO1_URL,
  AUDIO2_URL,
  STOP_IMAGE
} from "./constants";
import { 
  FunnelState, 
  ZodiacSign, 
  MaritalStatus, 
  LifeChallenge, 
  Gender 
} from "./types";

export default function App() {
  const [state, setState] = useState<FunnelState>({
    currentStep: 1,
  });

  const nextStep = (updates: Partial<FunnelState>) => {
    setState((prev) => ({ ...prev, ...updates, currentStep: prev.currentStep + 1 }));
  };

  const prevStep = () => {
    setState((prev) => ({ ...prev, currentStep: Math.max(1, prev.currentStep - 1) }));
  };

  // Helper to get a consistent angel based on answers
  const selectAngel = (funnelState: FunnelState) => {
    const key = `${funnelState.sign?.id}-${funnelState.birthDay}-${funnelState.maritalStatus}-${funnelState.challenge}-${funnelState.gender}`;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = ((hash << 5) - hash) + key.charCodeAt(i);
        hash |= 0;
    }
    const index = Math.abs(hash) % ANGELS.length;
    return ANGELS[index];
  };

  useEffect(() => {
    if (state.currentStep === 9 && !state.angelName) {
        const angel = selectAngel(state);
        setState(prev => ({ ...prev, angelName: angel.name, angelImage: angel.image }));
    }
  }, [state.currentStep, state.angelName]);

  const progress = (state.currentStep / 12) * 100;

  return (
    <div className="min-h-screen bg-[#07132a] text-white font-sans relative overflow-x-hidden selection:bg-yellow-400 selection:text-blue-900">
      {/* Background Image - Essential for the look */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          backgroundImage: `url(${IMAGE_ROOT}fundo.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto px-6 py-10 flex flex-col min-h-screen">
        {state.currentStep <= 8 && (
          <>
            {/* Header Alert - More Premium Appearance */}
            <div className="bg-red-600/90 backdrop-blur-md rounded-2xl py-3 px-8 flex items-center justify-center gap-3 mb-10 shadow-[0_0_25px_rgba(220,38,38,0.4)] border border-red-500/50 animate-pulse">
              <AlertTriangle className="w-5 h-5 text-white/90" strokeWidth={2.5} />
              <span className="text-white font-extrabold uppercase tracking-[0.15em] text-xs md:text-sm">Alerta Vibracional</span>
              <AlertTriangle className="w-5 h-5 text-white/90" strokeWidth={2.5} />
            </div>

            {/* Title Section - Matching Reference Sizes */}
            <div className="text-center mb-10">
              <h1 className="text-[28px] md:text-[32px] font-extrabold mb-6 leading-[1.1] text-blue-100 tracking-tight drop-shadow-lg">
                Seu Anjo está tentando falar, mas seu rádio está desligado?
              </h1>
              <p className="text-base md:text-lg text-blue-200/80 font-medium max-w-[90%] mx-auto leading-relaxed">
                Este teste de 30 segundos te revela seu Anjo da Guarda e te sintoniza com ele
              </p>
            </div>

            {/* Progress Bar - Thinner and more Elegant */}
            <div className="mb-12">
              <div className="flex justify-center mb-3">
                <span className="text-[10px] text-blue-300 font-bold tracking-[0.2em] uppercase opacity-70">
                  Passo {state.currentStep} de 8
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-500 via-yellow-200 to-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          </>
        )}

        {/* Steps Container */}
        <div className="flex-grow flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-grow flex flex-col"
            >
              {state.currentStep === 1 && <Step1 onSelect={(sign) => nextStep({ sign })} />}
              {state.currentStep === 2 && state.sign && (
                <Step2 
                  sign={state.sign} 
                  onSelect={(day, month) => nextStep({ birthDay: day, birthMonth: month })}
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 3 && (
                <Step3 
                  onSelect={(decade) => nextStep({ decade })} 
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 4 && state.decade && (
                <Step4 
                  decade={state.decade}
                  onSelect={(year) => nextStep({ year })} 
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 5 && (
                <Step5 
                  onSelect={(status) => nextStep({ maritalStatus: status })} 
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 6 && (
                <Step6 
                  onSelect={(challenge) => nextStep({ challenge })} 
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 7 && (
                <Step7 
                  onSelect={(gender) => nextStep({ gender })} 
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 8 && (
                <Step8 
                  onComplete={(name) => nextStep({ firstName: name })} 
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 9 && (
                <LoadingStep onComplete={() => setState(prev => ({ ...prev, currentStep: 10 }))} />
              )}
              {state.currentStep === 10 && (
                <AudioStep 
                  state={state} 
                  audioUrl={AUDIO1_URL} 
                  captions={CAPTIONS} 
                  showEmailAt={323} 
                  onComplete={() => setState(prev => ({ ...prev, currentStep: 11 }))} 
                />
              )}
              {state.currentStep === 11 && (
                <EmailStep onNext={(email) => setState(prev => ({ ...prev, email, currentStep: 12 }))} />
              )}
              {state.currentStep === 12 && (
                <AudioStep 
                    state={state} 
                    audioUrl={AUDIO2_URL} 
                    captions={CAPTIONS2} 
                    isSecondAudio 
                    onComplete={() => setState(prev => ({ ...prev, currentStep: 13 }))} 
                />
              )}
              {state.currentStep === 13 && (
                <div className="flex flex-col items-center justify-center text-center py-20 bg-blue-500/10 backdrop-blur-xl rounded-[40px] border border-white/10">
                   <h2 className="text-3xl font-extrabold mb-6 text-yellow-400">Leitura Concluída!</h2>
                   <p className="text-xl mb-8">Enviamos seu mapa vibracional completo para<br/><span className="text-blue-300">{state.email}</span></p>
                   <div className="bg-white/10 p-6 rounded-2xl border border-white/5">
                      <p className="text-sm opacity-70">Verifique sua caixa de entrada e spam.</p>
                   </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {state.currentStep <= 8 && (
          /* Footer Privacy - Refined */
          <div className="mt-12 pt-6 border-t border-white/5">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="bg-yellow-500/10 p-2.5 rounded-xl border border-yellow-500/20">
                  <Lock className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="text-xs text-left max-w-[200px]">
                  <p className="font-extrabold text-yellow-500 uppercase tracking-wider mb-1">Privacidade Garantida:</p>
                  <p className="text-blue-100/60 font-medium leading-tight">Suas respostas são 100% anônimas e confidenciais.</p>
              </div>
            </div>
            <p className="text-center text-[10px] text-blue-200/30 max-w-[280px] mx-auto uppercase tracking-[0.1em] font-semibold">
              Mais de 50.638 pessoas já descobriram qual é o seu anjo através deste teste.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Step Components ---

function ImagePreloader() {
  return (
    <div className="fixed opacity-0 pointer-events-none -z-50 overflow-hidden w-0 h-0">
      {ZODIAC_SIGNS.map(sign => (
        <img key={sign.id} src={sign.image} alt="" loading="eager" />
      ))}
      <img src={`${IMAGE_ROOT}fundo.png`} alt="" loading="eager" />
      {ANGELS.map(angel => (
        <img key={angel.name} src={angel.image} alt="" loading="eager" />
      ))}
      <img src={STOP_IMAGE} alt="" loading="eager" />
    </div>
  );
}

function Step1({ onSelect }: { onSelect: (sign: ZodiacSign) => void }) {
  return (
    <div className="flex flex-col items-center text-center">
      <ImagePreloader />
      <h3 className="text-[28px] font-extrabold mb-10 uppercase tracking-tight bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent">
        Clique no SEU SIGNO
      </h3>
      <div className="grid grid-cols-3 gap-4 w-full">
        {ZODIAC_SIGNS.map((sign, index) => (
          <button
            id={`sign-${sign.id}`}
            key={sign.id}
            onClick={() => onSelect(sign)}
            className="group relative flex flex-col items-center justify-center bg-white rounded-2xl p-4 shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:ring-2 hover:ring-yellow-400 transition-all hover:scale-[1.05] active:scale-95 duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src={sign.image} 
              alt={sign.name} 
              className="w-14 h-14 object-contain mb-3 group-hover:brightness-110 group-hover:scale-110 transition-transform duration-500" 
              referrerPolicy="no-referrer"
              fetchPriority={index < 6 ? "high" : "auto"}
            />
            <span className="text-blue-900 font-extrabold text-[10px] uppercase text-center tracking-wider">{sign.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2({ sign, onSelect, onBack }: { sign: ZodiacSign, onSelect: (day: number, month: number) => void, onBack: () => void }) {
  const renderMonth = (monthIndex: number, startDay: number, endDay: number) => {
    const days = [];
    for (let i = startDay; i <= endDay; i++) {
        days.push(i);
    }

    return (
      <div key={monthIndex} className="mb-10 w-full">
        <div className="bg-blue-500/30 backdrop-blur-sm border border-blue-400/20 py-2 rounded-xl mb-4">
          <h4 className="text-center font-extrabold text-xl tracking-tight">{MONTH_NAMES[monthIndex]}</h4>
        </div>
        <div className="grid grid-cols-5 gap-2.5">
          {days.map(day => (
            <button
               id={`day-${monthIndex}-${day}`}
               key={day}
               onClick={() => onSelect(day, monthIndex)}
               className="bg-white text-blue-900 font-extrabold py-4 rounded-xl shadow-md hover:bg-blue-50 transition-all active:scale-90"
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const getMaxDays = (month: number) => new Date(2024, month + 1, 0).getDate();

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-extrabold mb-10 bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent text-center leading-tight">
        Qual é o seu Dia de Nascimento?
      </h3>
      
      <div className="w-full flex flex-col items-center">
        {renderMonth(sign.startMonth, sign.startDay, getMaxDays(sign.startMonth))}
        {renderMonth(sign.endMonth, 1, sign.endDay)}
      </div>

      <BackButton onClick={onBack} />
    </div>
  );
}

function Step3({ onSelect, onBack }: { onSelect: (decade: number) => void, onBack: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-5 px-8 rounded-3xl mb-10 w-full">
        <h3 className="text-xl font-extrabold uppercase tracking-tight text-center">EM QUE DÉCADA VOCÊ NASCEU?</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {DECADES.map(decade => (
          <button
            id={`decade-${decade}`}
            key={decade}
            onClick={() => onSelect(decade)}
            className="bg-white text-blue-900 font-extrabold py-5 rounded-2xl shadow-xl hover:ring-2 hover:ring-yellow-400/50 transition-all hover:scale-[1.02] active:scale-95 duration-300"
          >
            {decade}
          </button>
        ))}
      </div>
      <BackButton onClick={onBack} />
    </div>
  );
}

function Step4({ decade, onSelect, onBack }: { decade: number, onSelect: (year: number) => void, onBack: () => void }) {
  const years = Array.from({ length: 10 }, (_, i) => decade + i);
  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-5 px-8 rounded-3xl mb-10 w-full">
        <h3 className="text-xl font-extrabold uppercase tracking-tight text-center">EM QUE ANO VOCÊ NASCEU?</h3>
      </div>
      <div className="grid grid-cols-3 gap-3 w-full">
        {years.map(year => (
          <button
            id={`year-${year}`}
            key={year}
            onClick={() => onSelect(year)}
            className="bg-white text-blue-900 font-extrabold py-5 rounded-2xl shadow-xl hover:ring-2 hover:ring-yellow-400/50 transition-all hover:scale-[1.02] active:scale-95 duration-300"
          >
            {year}
          </button>
        ))}
      </div>
      <BackButton onClick={onBack} />
    </div>
  );
}

function Step5({ onSelect, onBack }: { onSelect: (status: MaritalStatus) => void, onBack: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-5 px-8 rounded-3xl mb-10 w-full">
        <h3 className="text-xl font-extrabold uppercase tracking-tight text-center">QUAL É O SEU ESTADO CIVIL?</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {MARITAL_STATUSES.map(status => (
          <button
            id={`marital-${status}`}
            key={status}
            onClick={() => onSelect(status as MaritalStatus)}
            className="flex flex-col items-center justify-center bg-blue-500/10 border border-white/5 py-10 rounded-3xl shadow-xl hover:bg-blue-500/20 hover:border-white/20 transition-all group duration-300"
          >
            <div className="mb-4 text-4xl transform group-hover:scale-125 transition-transform duration-500">
               <StatusIcon status={status as MaritalStatus} />
            </div>
            <span className="font-extrabold text-sm tracking-wide">{status}</span>
          </button>
        ))}
      </div>
      <BackButton onClick={onBack} />
    </div>
  );
}

function Step6({ onSelect, onBack }: { onSelect: (challenge: LifeChallenge) => void, onBack: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-5 px-8 rounded-3xl mb-10 w-full">
        <h3 className="text-xl font-extrabold uppercase tracking-tight text-center leading-tight">QUAL É O MAIOR DESAFIO DA SUA VIDA?</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {CHALLENGES.map(challenge => (
          <button
            id={`challenge-${challenge}`}
            key={challenge}
            onClick={() => onSelect(challenge as LifeChallenge)}
            className="flex flex-col items-center justify-center bg-blue-500/10 border border-white/5 py-10 rounded-3xl shadow-xl hover:bg-blue-500/20 hover:border-white/20 transition-all group duration-300"
          >
            <div className="mb-4 text-4xl transform group-hover:scale-125 transition-transform duration-500">
               <ChallengeIcon challenge={challenge as LifeChallenge} />
            </div>
            <span className="font-extrabold text-sm tracking-wide">{challenge}</span>
          </button>
        ))}
      </div>
      <BackButton onClick={onBack} />
    </div>
  );
}

function Step7({ onSelect, onBack }: { onSelect: (gender: Gender) => void, onBack: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-5 px-8 rounded-3xl mb-10 w-full">
        <h3 className="text-xl font-extrabold uppercase tracking-tight text-center">QUAL É O SEU SEXO?</h3>
      </div>
      <div className="flex flex-col gap-5 w-full max-w-[240px]">
        {GENDERS.map(gender => (
          <button
            id={`gender-${gender}`}
            key={gender}
            onClick={() => onSelect(gender as Gender)}
            className="flex flex-col items-center justify-center bg-white py-8 px-10 rounded-3xl shadow-2xl hover:scale-[1.05] transition-all group active:scale-95 duration-300"
          >
            <div className={`mb-3 text-5xl ${gender === "Masculino" ? "text-blue-500" : "text-pink-500"} transform group-hover:rotate-12 transition-transform`}>
               {gender === "Masculino" ? "♂" : "♀"}
            </div>
            <span className="font-extrabold text-blue-900 text-xl tracking-tight">{gender}</span>
          </button>
        ))}
      </div>
      <BackButton onClick={onBack} />
    </div>
  );
}

function Step8({ onComplete, onBack }: { onComplete: (name: string) => void, onBack: () => void }) {
  const [name, setName] = useState("");

  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-5 px-8 rounded-3xl mb-10 w-full">
        <h3 className="text-xl font-extrabold uppercase tracking-tight text-center">QUAL É O SEU PRIMEIRO NOME?</h3>
      </div>
      
      <div className="w-full max-w-[340px] flex flex-col gap-8">
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          className="w-full bg-white text-blue-900 font-extrabold py-6 px-8 rounded-2xl shadow-inner text-center text-2xl focus:outline-none focus:ring-4 focus:ring-yellow-400/50 placeholder:text-gray-400 transition-all"
          autoFocus
        />

        <button
          id="btn-continue"
          onClick={() => name.length > 1 && onComplete(name)}
          disabled={name.length < 2}
          className="relative bg-gradient-to-b from-blue-400 to-blue-600 text-white font-extrabold py-6 px-10 rounded-full shadow-[0_6px_0_rgba(15,23,42,0.8)] hover:brightness-110 hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all text-xl uppercase tracking-[0.1em] disabled:opacity-50 group overflow-hidden"
        >
          <span className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          Clique aqui para continuar!
        </button>
      </div>

      <BackButton onClick={onBack} />
    </div>
  );
}

function LoadingStep({ onComplete }: { onComplete: () => void }) {
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProg(old => {
        if (old >= 100) {
            clearInterval(timer);
            setTimeout(onComplete, 500);
            return 100;
        }
        return old + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 className="text-xl font-bold mb-6">Carregando a sua leitura....</h2>
      <div className="h-4 w-64 bg-white/10 rounded-full overflow-hidden border border-white/10 p-0.5">
          <motion.div 
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${prog}%` }}
          />
      </div>
    </div>
  );
}

function EmailStep({ onNext }: { onNext: (email: string) => void }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      onNext(email);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#1a2b4b]/95 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 shadow-2xl text-center flex flex-col items-center justify-center py-20"
    >
      <p className="text-xl font-bold mb-10 leading-relaxed text-blue-100/90">
        Digite o seu <span className="text-yellow-400 font-bold whitespace-nowrap">e-mail</span> para receber o restante da sua <span className="font-bold">leitura personalizada...</span>
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center">
        <label className="text-2xl font-black mb-4 uppercase tracking-tighter">
          Qual é o seu Email?
        </label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu Email"
          className="w-full bg-white text-blue-900 font-bold py-5 px-8 rounded-2xl mb-12 text-center text-xl focus:outline-none focus:ring-4 focus:ring-yellow-400"
          required
        />
        <button 
          type="submit"
          className="bg-[#2ebc15] hover:bg-green-500 text-white font-black py-6 px-12 md:px-20 rounded-full shadow-[0_0_20px_rgba(46,188,21,0.3)] border-2 border-white/20 transition-all active:scale-95 text-xl md:text-2xl uppercase tracking-widest whitespace-nowrap"
        >
          CLIQUE PARA CONTINUAR
        </button>
      </form>
    </motion.div>
  );
}

function AudioStep({ state, audioUrl, captions, showEmailAt, onComplete, isSecondAudio }: { 
    state: FunnelState, 
    audioUrl: string, 
    captions: { start: number, end: number, text: string }[], 
    showEmailAt?: number, 
    onComplete: () => void,
    isSecondAudio?: boolean 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
        setCurrentTime(audio.currentTime);
        if (showEmailAt && audio.currentTime >= showEmailAt) {
            audio.pause();
            setIsPlaying(false);
            onComplete();
        }
    };

    const handleEnded = () => {
        onComplete();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);
    return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('ended', handleEnded);
    };
  }, [showEmailAt, onComplete]);

  const togglePlay = () => {
    if (isPlaying) {
        audioRef.current?.pause();
        setShowModal(true);
    } else {
        audioRef.current?.play();
        setShowModal(false);
    }
    setIsPlaying(!isPlaying);
  };

  const currentCaption = captions.find(c => currentTime >= c.start && currentTime < c.end)?.text || "...";

  return (
    <div className="flex flex-col items-center">
      {/* Invisible Audio Element */}
      <audio ref={audioRef} src={audioUrl} />

      <div className="w-full flex-grow flex flex-col items-center text-center bg-blue-500/10 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 min-h-[80vh] relative overflow-hidden">
        
        {/* Modal Overlay when paused */}
        <AnimatePresence>
          {showModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-[#07132a]/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
            >
              <h3 className="text-xl font-black mb-6 uppercase tracking-tighter leading-tight drop-shadow-sm">
                <span className="text-yellow-400">{state.firstName?.toUpperCase()}</span>, sua leitura vai sair do ar em breve.
              </h3>
              
              <img src={STOP_IMAGE} alt="Wait" className="w-48 h-48 object-contain mb-8 animate-pulse" />

              <p className="text-lg font-bold mb-10 leading-relaxed text-blue-100/90">
                Essa é a sua última chance de assistir até o final. Clique no botão abaixo...
              </p>

              <button 
                onClick={togglePlay}
                className="bg-green-600 hover:bg-green-500 text-white font-extrabold py-5 px-16 rounded-full shadow-[0_6px_0_rgba(20,83,45,1)] transition-all active:translate-y-1 active:shadow-none text-2xl uppercase tracking-widest"
              >
                COMEÇAR
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {isSecondAudio ? (
            <div className="flex flex-col items-center justify-center flex-grow py-20 px-4">
                <h2 className="text-3xl md:text-5xl font-black text-blue-100/40 uppercase tracking-tighter leading-tight max-w-2xl">
                    Obrigada por continuar comigo!
                </h2>
            </div>
        ) : (
            <>
                <div className="mb-8">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                        {state.firstName}, seu anjo da guarda é:
                    </h2>
                    <p className="text-3xl md:text-4xl font-black text-yellow-400 uppercase tracking-tighter">
                        {state.angelName}
                    </p>
                </div>

                <div className="relative mb-12 group">
                    <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-2xl group-hover:bg-yellow-400/30 transition-all duration-1000" />
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                        <img 
                            src={state.angelImage} 
                            alt={state.angelName} 
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                        />
                    </div>
                </div>
            </>
        )}

        {/* Captions and Player Bar */}
        <div className="w-full mt-auto bg-[#1a2b4b]/80 border-t border-white/10 -mx-8 -mb-8 p-6 md:p-10 flex flex-col items-center gap-6 min-h-[220px] md:min-h-[180px]">
           <div className="w-full flex items-center justify-between gap-6">
              <div className="flex-grow text-center text-blue-50 font-medium px-4 leading-relaxed text-lg md:text-xl min-h-[4em] flex items-center justify-center">
                  {isPlaying ? currentCaption : "Reprodução pausada..."}
              </div>

              <div className="hidden md:block h-16 w-px bg-white/20 mx-4 shrink-0" />

              <button 
                onClick={togglePlay}
                className="shrink-0 w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-400 flex items-center justify-center transition-all shadow-lg active:scale-95"
              >
                {isPlaying ? <Pause fill="white" size={32} /> : <Play fill="white" size={32} className="ml-1" />}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="mt-12 flex items-center justify-center gap-2 bg-white/5 border border-white/5 py-3 px-8 rounded-full hover:bg-white/10 hover:border-white/20 transition-all text-xs font-extrabold uppercase tracking-[0.2em] opacity-60 group"
    >
      <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
      Voltar
    </button>
  );
}

function StatusIcon({ status }: { status: MaritalStatus }) {
  // Rough implementation of the icons in Step 5
  switch(status) {
    case "Casado(a)": return <div className="text-3xl">🤝</div>;
    case "Namorando": return <div className="text-3xl">💕</div>;
    case "Noivo(a)": return <div className="text-3xl">💍</div>;
    case "Solteiro(a)": return <div className="text-3xl">🤍</div>;
    case "Separado(a)": return <div className="text-3xl">🧩</div>;
    case "Viúvo(a)": return <div className="text-3xl">💔</div>;
    default: return null;
  }
}

function ChallengeIcon({ challenge }: { challenge: LifeChallenge }) {
  // Rough implementation of the icons in Step 6
  switch(challenge) {
    case "Vida Amorosa": return <div className="text-3xl">💍</div>;
    case "Finanças": return <div className="text-3xl">💰</div>;
    case "Saúde": return <div className="text-3xl">💓</div>;
    case "Felicidadee": return <div className="text-3xl">🙌</div>;
    default: return null;
  }
}

