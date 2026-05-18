/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, ChevronLeft, Lock } from "lucide-react";
import { 
  ZODIAC_SIGNS, 
  IMAGE_ROOT, 
  DECADES, 
  MARITAL_STATUSES, 
  CHALLENGES, 
  GENDERS,
  MONTH_NAMES
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

  const progress = (state.currentStep / 8) * 100;

  return (
    <div className="min-h-screen bg-[#07132a] text-white font-sans relative overflow-x-hidden selection:bg-yellow-400 selection:text-blue-900">
      {/* Background Image with more control */}
      <div 
        className="fixed inset-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{ 
          backgroundImage: `url(${IMAGE_ROOT}fundo.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(100px)'
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto px-6 py-10 flex flex-col min-h-screen">
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
              {state.currentStep === 9 && <FinalStep state={state} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Privacy - Refined */}
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
      
      <div className="w-full flex flex-col items-center overflow-y-auto max-h-[55vh] pr-2 custom-scrollbar">
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

function FinalStep({ state }: { state: FunnelState }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-yellow-400/10 border border-yellow-400/30 p-10 rounded-[40px] mb-12 backdrop-blur-md">
        <h3 className="text-3xl font-extrabold text-yellow-400 mb-6 animate-pulse tracking-tight">SINTONIZANDO...</h3>
        <p className="text-2xl font-bold mb-3 tracking-tight">Olá, <span className="text-yellow-400">{state.firstName}</span>!</p>
        <p className="text-lg opacity-70 font-medium">Estamos conectando você com o seu Anjo da Guarda...</p>
      </div>

      <div className="relative w-28 h-28 mb-12">
        <div className="absolute inset-0 border-4 border-yellow-400/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-4 border-4 border-blue-400/20 rounded-full" />
        <div className="absolute inset-4 border-4 border-blue-400 border-b-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
      </div>
      
      <p className="text-blue-100/90 text-lg leading-relaxed italic max-w-[320px] mx-auto font-medium">
        "O universo tem uma mensagem sagrada preparada para você agora, focada em sua {state.challenge?.toLowerCase()}."
      </p>
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

