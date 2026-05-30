/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useRef, FormEvent, ReactNode } from "react";
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
  AUDIO2_URL,
  STOP_IMAGE,
  getCaptionsForAudio,
  getCaptionsForAudio2
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

  const nextStep = (updates: Partial<FunnelState>, fromStep?: number) => {
    setState((prev) => {
      if (fromStep !== undefined && prev.currentStep !== fromStep) {
        return prev;
      }
      return { ...prev, ...updates, currentStep: prev.currentStep + 1 };
    });
  };

  const prevStep = (fromStep?: number) => {
    setState((prev) => {
      if (fromStep !== undefined && prev.currentStep !== fromStep) {
        return prev;
      }
      return { ...prev, currentStep: Math.max(1, prev.currentStep - 1) };
    });
  };

  // Helper to get a consistent angel based on year of birth
  const selectAngel = (funnelState: FunnelState) => {
    const year = funnelState.year || 1910;
    const index = (year - 1910) % ANGELS.length;
    return ANGELS[index];
  };

  const getAudio1Url = (funnelState: FunnelState) => {
    const isMale = funnelState.gender === "Masculino";
    const status = funnelState.maritalStatus || "Solteiro(a)";
    const isCompactedStatus = ["Casado(a)", "Namorando", "Noivo(a)"].includes(status);
    const year = funnelState.year || 1910;

    let yearGroup = "";
    if (year >= 1910 && year <= 1960) {
      yearGroup = "1910-1960";
    } else if (year >= 1961 && year <= 1975) {
      yearGroup = "1961-1975";
    } else if (year >= 1976 && year <= 1990) {
      yearGroup = "1976-1990";
    } else {
      yearGroup = "1991-2018";
    }

    if (isMale) {
      if (isCompactedStatus) {
        const file = yearGroup === "1910-1960" ? "0lg2n7hn.mp3" :
                     yearGroup === "1961-1975" ? "4sm7lhtr.mp3" :
                     yearGroup === "1976-1990" ? "9q06p0e0.mp3" : "ozaxw8b9.mp3";
        return `https://tudoprahoje.site/anjo/audios/casado-noivo-namorando/homem/${file}`;
      } else {
        const file = yearGroup === "1910-1960" ? "ll1frm7w.mp3" :
                     yearGroup === "1961-1975" ? "usw5x1wv.mp3" :
                     yearGroup === "1976-1990" ? "lq7gqhwj.mp3" : "yf42bp5p.mp3";
        return `https://tudoprahoje.site/anjo/audios/solteiro-separado-viuvo/homem/${file}`;
      }
    } else {
      if (isCompactedStatus) {
        const file = yearGroup === "1910-1960" ? "zc1hhf57.mp3" :
                     yearGroup === "1961-1975" ? "ssr88pgj.mp3" :
                     yearGroup === "1976-1990" ? "pllma5k5.mp3" : "jmkwj7my.mp3";
        return `https://tudoprahoje.site/anjo/audios/casado-noivo-namorando/mulher/${file}`;
      } else {
        const file = yearGroup === "1910-1960" ? "3rhbu41z.mp3" :
                     yearGroup === "1961-1975" ? "6re2y2zl.mp3" :
                     yearGroup === "1976-1990" ? "yb6yv0ur.mp3" : "ghrh8wbq.mp3";
        return `https://tudoprahoje.site/anjo/audios/solteiro-separado-viuvo/mulher/${file}`;
      }
    }
  };

  const getAudio2Url = (funnelState: FunnelState) => {
    const root = "https://tudoprahoje.site/anjo/audios/etapa2/";
    const challenge = funnelState.challenge || "Finanças";
    const isMale = funnelState.gender === "Masculino";
    const status = funnelState.maritalStatus || "Solteiro(a)";
    const isCompactedStatus = ["Casado(a)", "Namorando", "Noivo(a)"].includes(status);

    if (challenge === "Finanças" || challenge === "Felicidadee") {
      return `${root}fplauj94.mp3`;
    }
    if (challenge === "Saúde") {
      return `${root}tu9b2swd.mp3`;
    }

    // Default fallback to "Vida Amorosa"
    if (isMale) {
      if (isCompactedStatus) {
        return `${root}gclzuxeh.mp3`;
      } else {
        return `${root}3es4cath.mp3`;
      }
    } else {
      if (isCompactedStatus) {
        return `${root}5iw1cntr.mp3`;
      } else {
        return `${root}hlboo7u3.mp3`;
      }
    }
  };

  const getEmailUnlockTime = (audioUrl: string): number => {
    if (audioUrl.includes("0lg2n7hn.mp3")) return 316;
    if (audioUrl.includes("3rhbu41z.mp3")) return 319;
    if (audioUrl.includes("4sm7lhtr.mp3")) return 314;
    if (audioUrl.includes("ozaxw8b9.mp3")) return 323;
    if (audioUrl.includes("ssr88pgj.mp3")) return 344;
    if (audioUrl.includes("zc1hhf57.mp3")) return 345;
    if (audioUrl.includes("6re2y2zl.mp3")) return 345;
    if (audioUrl.includes("9q06p0e0.mp3")) return 341;
    if (audioUrl.includes("jmkwj7my.mp3")) return 347;
    if (audioUrl.includes("pllma5k5.mp3")) return 343;
    return 323; // fallback default
  };

  useEffect(() => {
    if (state.currentStep === 9 && !state.angelName) {
        const angel = selectAngel(state);
        setState(prev => ({ ...prev, angelName: angel.name, angelImage: angel.image }));
    }
  }, [state.currentStep, state.angelName, state.year]);

  const progress = (state.currentStep / 12) * 100;

  return (
    <div className="min-h-screen bg-[#07132a] text-white font-sans relative overflow-x-hidden selection:bg-yellow-400 selection:text-blue-900">
      <ImagePreloader />
      {/* Background Image - Essential for the look */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          backgroundImage: `url(${IMAGE_ROOT}fundo.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className={`relative z-10 ${state.currentStep >= 9 && state.currentStep !== 13 ? 'max-w-4xl' : 'max-w-lg'} mx-auto px-5 py-4 flex flex-col min-h-screen transition-all duration-700`}>
        {state.currentStep <= 8 && (
          <>
            {/* Header Alert - More Compact */}
            <div className="bg-red-600/90 backdrop-blur-md rounded-xl py-2 px-6 flex items-center justify-center gap-2 mb-4 shadow-[0_0_15px_rgba(220,38,38,0.3)] border border-red-500/50 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-white/90" strokeWidth={2.5} />
              <span className="text-white font-black uppercase tracking-wider text-[10px] md:text-xs">Alerta Vibracional</span>
              <AlertTriangle className="w-4 h-4 text-white/90" strokeWidth={2.5} />
            </div>

            {/* Title Section - More Compact Fonts */}
            <div className="text-center mb-4">
              <h1 className="text-[22px] md:text-[26px] font-extrabold mb-2 leading-tight text-blue-100 tracking-tight drop-shadow-lg">
                Seu Anjo está tentando falar, mas seu rádio está desligado?
              </h1>
              <p className="text-sm md:text-base text-blue-200/80 font-medium max-w-[90%] mx-auto leading-tight">
                Este teste de 30 segundos te revela seu Anjo da Guarda e te sintoniza com ele
              </p>
            </div>

            {/* Progress Bar - More Compact */}
            <div className="mb-6">
              <div className="flex justify-center mb-1">
                <span className="text-[9px] text-blue-300 font-bold tracking-widest uppercase opacity-70">
                  Passo {state.currentStep} de 8
                </span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
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
              {state.currentStep === 1 && <Step1 onSelect={(sign) => nextStep({ sign }, 1)} />}
              {state.currentStep === 2 && state.sign && (
                <Step2 
                  sign={state.sign} 
                  onSelect={(day, month) => nextStep({ birthDay: day, birthMonth: month }, 2)}
                  onBack={() => prevStep(2)}
                />
              )}
              {state.currentStep === 3 && (
                <Step3 
                  onSelect={(decade) => nextStep({ decade }, 3)} 
                  onBack={() => prevStep(3)}
                />
              )}
              {state.currentStep === 4 && state.decade && (
                <Step4 
                  decade={state.decade}
                  onSelect={(year) => nextStep({ year }, 4)} 
                  onBack={() => prevStep(4)}
                />
              )}
              {state.currentStep === 5 && (
                <Step5 
                  onSelect={(status) => nextStep({ maritalStatus: status }, 5)} 
                  onBack={() => prevStep(5)}
                />
              )}
              {state.currentStep === 6 && (
                <Step6 
                  onSelect={(challenge) => nextStep({ challenge }, 6)} 
                  onBack={() => prevStep(6)}
                />
              )}
              {state.currentStep === 7 && (
                <Step7 
                  onSelect={(gender) => nextStep({ gender }, 7)} 
                  onBack={() => prevStep(7)}
                />
              )}
              {state.currentStep === 8 && (
                <Step8 
                  onComplete={(name) => nextStep({ firstName: name }, 8)} 
                  onBack={() => prevStep(8)}
                />
              )}
              {state.currentStep === 9 && (
                <LoadingStep onComplete={() => setState(prev => prev.currentStep === 9 ? { ...prev, currentStep: 10 } : prev)} />
              )}
              {state.currentStep === 10 && (
                <AudioStep 
                  state={state} 
                  audioUrl={getAudio1Url(state)} 
                  captions={getCaptionsForAudio(getAudio1Url(state))} 
                  showEmailAt={getEmailUnlockTime(getAudio1Url(state))} 
                  onComplete={() => setState(prev => prev.currentStep === 10 ? { ...prev, currentStep: 11 } : prev)} 
                />
              )}
              {state.currentStep === 11 && (
                <EmailStep onNext={(email) => setState(prev => prev.currentStep === 11 ? { ...prev, email, currentStep: 12 } : prev)} />
              )}
              {state.currentStep === 12 && (
                <AudioStep 
                    state={state} 
                    audioUrl={getAudio2Url(state)} 
                    captions={getCaptionsForAudio2(getAudio2Url(state))} 
                    isSecondAudio 
                    onComplete={() => setState(prev => prev.currentStep === 12 ? { ...prev, currentStep: 13 } : prev)} 
                />
              )}
              {state.currentStep === 13 && (
                <div className="flex-grow flex items-center justify-center p-4">
                  <button 
                    onClick={() => setState(prev => ({ ...prev, currentStep: 14 }))}
                    className="bg-[#2ebc15] hover:bg-green-500 text-white font-black py-4 px-8 md:py-6 md:px-12 rounded-3xl shadow-[0_0_40px_rgba(46,188,21,0.5)] border-2 border-white/20 transition-all active:scale-95 text-xl md:text-3xl uppercase tracking-tighter text-center max-w-full leading-tight"
                  >
                    QUERO DESCOBRIR<br/>MINHAS DATAS
                  </button>
                </div>
              )}
              {state.currentStep === 14 && (
                <VSLStep />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {state.currentStep <= 8 && (
          /* Footer Privacy - More Compact */
          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                  <Lock className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-[10px] text-left max-w-[200px]">
                  <p className="font-extrabold text-yellow-500 uppercase tracking-wider">Privacidade Garantida:</p>
                  <p className="text-blue-100/60 font-medium leading-tight">Suas respostas são 100% anônimas e confidenciais.</p>
              </div>
            </div>
            <p className="text-center text-[9px] text-blue-200/20 max-w-[280px] mx-auto uppercase tracking-widest font-semibold">
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
  const extraImages = [
    "casado.png", "namorando.png", "noivo.png", "solteiro.png", "separado.png", "viuvo.png",
    "vidaamorosa.png", "finanças.png", "saude.png", "felicidade.png",
    "masculine.png", "female.png"
  ];

  const etapa1Images = Array.from({ length: 30 }, (_, i) => {
    const num = i + 4;
    let name = "";
    if (num === 4) name = "imgi_4_alma_captou_converted";
    else if (num === 5) name = "imgi_5_anjo_conectar_converted";
    else if (num === 6) name = "imgi_6_bloqueio_milagres_converted";
    else if (num === 7) name = "imgi_7_bloqueio_frequencia_converted";
    else if (num === 8) name = "imgi_8_anjo_radio_converted";
    else if (num === 9) name = "imgi_9_repelindo_bencaos_converted";
    else if (num === 10) name = "imgi_10_ponto_virada_2026_converted";
    else if (num === 11) name = "imgi_11_colheita_divina_converted";
    else if (num === 12) name = "imgi_12_img_mahila_converted";
    else if (num === 13) name = "imgi_13_img_mahila_retiro_converted";
    else if (num === 14) name = "imgi_14_img_cortando_bloqueios_converted";
    else if (num === 15) name = "imgi_15_img_ponto_virada_converted";
    else if (num === 16) name = "imgi_16_img_bloqueio_anjo_converted";
    else if (num === 17) name = "imgi_17_frequencia_anjo_converted";
    else if (num === 18) name = "imgi_18_anjo_sintonizando_converted";
    else if (num === 19) name = "imgi_19_img_alerta_converted";
    else if (num === 20) name = "imgi_20_img_frequencia_detectada_converted";
    else if (num === 21) name = "imgi_21_img_sinastria_converted";
    else if (num === 22) name = "imgi_22_universo_abrindo_caminho_converted";
    else if (num === 23) name = "imgi_23_oportunidade_perdida_converted";
    else if (num === 24) name = "imgi_24_codigo_angelico_converted";
    else if (num === 25) name = "imgi_25_ima_prosperidade_converted";
    else if (num === 26) name = "imgi_26_clareza_mental_converted";
    else if (num === 27) name = "imgi_27_cadeado_vibracional_converted";
    else if (num === 28) name = "imgi_28_oportunidade_unica_converted";
    else if (num === 29) name = "imgi_29_era_dourada_converted";
    else if (num === 30) name = "imgi_30_sequencia_ativacao_converted";
    else if (num === 31) name = "imgi_31_atuacao_areas_converted";
    else if (num === 32) name = "imgi_32_ciclo_abundancia_converted";
    else if (num === 33) name = "imgi_33_papel_analise_converted";
    return `https://tudoprahoje.site/anjo/img/etapa1/${name}.webp`;
  });

  return (
    <div className="fixed opacity-0 pointer-events-none -z-50 overflow-hidden w-0 h-0">
      {ZODIAC_SIGNS.map(sign => (
        <img key={sign.id} src={sign.image} alt="" loading="eager" referrerPolicy="no-referrer" />
      ))}
      <img src={`${IMAGE_ROOT}fundo.png`} alt="" loading="eager" referrerPolicy="no-referrer" />
      {ANGELS.map(angel => (
        <img key={angel.name} src={angel.image} alt="" loading="eager" referrerPolicy="no-referrer" />
      ))}
      {extraImages.map(imgName => (
        <img key={imgName} src={`${IMAGE_ROOT}${imgName}`} alt="" loading="eager" referrerPolicy="no-referrer" />
      ))}
      {etapa1Images.map((src, i) => (
        <img key={i} src={src} alt="" loading="eager" referrerPolicy="no-referrer" />
      ))}
      <img src={STOP_IMAGE} alt="" loading="eager" referrerPolicy="no-referrer" />
    </div>
  );
}

function Step1({ onSelect }: { onSelect: (sign: ZodiacSign) => void }) {
  return (
    <div className="flex flex-col items-center text-center">
      <ImagePreloader />
      <h3 className="text-[22px] font-black mb-6 uppercase tracking-tight bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent italic">
        Clique no SEU SIGNO
      </h3>
      <div className="grid grid-cols-3 gap-3 w-full">
        {ZODIAC_SIGNS.map((sign, index) => (
          <button
            id={`sign-${sign.id}`}
            key={sign.id}
            onClick={() => onSelect(sign)}
            className="group relative flex flex-col items-center justify-center bg-white rounded-xl p-2 md:p-3 shadow-[0_6px_15px_rgba(0,0,0,0.15)] hover:ring-2 hover:ring-yellow-400 transition-all hover:scale-[1.03] active:scale-95 duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src={sign.image} 
              alt={sign.name} 
              className="w-10 h-10 md:w-12 md:h-12 object-contain mb-1.5 group-hover:brightness-110 group-hover:scale-110 transition-transform duration-500" 
              referrerPolicy="no-referrer"
              fetchPriority={index < 6 ? "high" : "auto"}
            />
            <span className="text-blue-900 font-extrabold text-[9px] md:text-[10px] uppercase text-center tracking-tight leading-tight">{sign.name}</span>
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
      <div key={monthIndex} className="mb-6 w-full">
        <div className="bg-blue-500/30 backdrop-blur-sm border border-blue-400/20 py-1.5 rounded-xl mb-3">
          <h4 className="text-center font-extrabold text-lg tracking-tight">{MONTH_NAMES[monthIndex]}</h4>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {days.map(day => (
            <button
               id={`day-${monthIndex}-${day}`}
               key={day}
               onClick={() => onSelect(day, monthIndex)}
               className="bg-white text-blue-900 font-extrabold py-3 rounded-xl shadow-md hover:bg-blue-50 transition-all active:scale-90 text-sm md:text-base"
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
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-3 px-6 rounded-2xl mb-6 w-full">
        <h3 className="text-lg font-extrabold uppercase tracking-tight text-center italic">EM QUE DÉCADA VOCÊ NASCEU?</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        {DECADES.map(decade => (
          <button
            id={`decade-${decade}`}
            key={decade}
            onClick={() => onSelect(decade)}
            className="bg-white text-blue-900 font-extrabold py-4 rounded-xl shadow-lg hover:ring-2 hover:ring-yellow-400/50 transition-all hover:scale-[1.02] active:scale-95 duration-300"
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
  const years = Array.from({ length: 10 }, (_, i) => decade + i).filter(year => year <= 2018);
  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-3 px-6 rounded-2xl mb-6 w-full">
        <h3 className="text-lg font-extrabold uppercase tracking-tight text-center italic">EM QUE ANO VOCÊ NASCEU?</h3>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full">
        {years.map(year => (
          <button
            id={`year-${year}`}
            key={year}
            onClick={() => onSelect(year)}
            className="bg-white text-blue-900 font-extrabold py-4 rounded-xl shadow-lg hover:ring-2 hover:ring-yellow-400/50 transition-all hover:scale-[1.02] active:scale-95 duration-300"
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
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-3 px-6 rounded-2xl mb-6 w-full">
        <h3 className="text-lg font-extrabold uppercase tracking-tight text-center italic">QUAL É O SEU ESTADO CIVIL?</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        {MARITAL_STATUSES.map(status => (
          <button
            id={`marital-${status}`}
            key={status}
            onClick={() => onSelect(status as MaritalStatus)}
            className="flex flex-col items-center justify-center bg-blue-500/10 border border-white/5 py-6 rounded-2xl shadow-xl hover:bg-blue-500/20 hover:border-white/20 transition-all group duration-300"
          >
            <div className="mb-2 text-3xl transform group-hover:scale-110 transition-transform duration-500">
               <StatusIcon status={status as MaritalStatus} />
            </div>
            <span className="font-extrabold text-[12px] uppercase tracking-tight">{status}</span>
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
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-3 px-6 rounded-2xl mb-6 w-full">
        <h3 className="text-lg font-extrabold uppercase tracking-tight text-center leading-tight italic">QUAL É O MAIOR DESAFIO?</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        {CHALLENGES.map(challenge => (
          <button
            id={`challenge-${challenge}`}
            key={challenge}
            onClick={() => onSelect(challenge as LifeChallenge)}
            className="flex flex-col items-center justify-center bg-blue-500/10 border border-white/5 py-6 rounded-2xl shadow-xl hover:bg-blue-500/20 hover:border-white/20 transition-all group duration-300"
          >
            <div className="mb-2 text-3xl transform group-hover:scale-110 transition-transform duration-500">
               <ChallengeIcon challenge={challenge as LifeChallenge} />
            </div>
            <span className="font-extrabold text-[12px] uppercase tracking-tight line-clamp-1 px-1">{challenge === "Felicidadee" ? "Felicidade" : challenge}</span>
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
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-3 px-6 rounded-2xl mb-6 w-full">
        <h3 className="text-lg font-extrabold uppercase tracking-tight text-center italic">QUAL É O SEU SEXO?</h3>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-[220px]">
        {GENDERS.map(gender => (
          <button
            id={`gender-${gender}`}
            key={gender}
            onClick={() => onSelect(gender as Gender)}
            className="flex flex-col items-center justify-center bg-white py-5 px-8 rounded-2xl shadow-xl hover:scale-[1.03] transition-all group active:scale-95 duration-300"
          >
            <div className="mb-2 transform group-hover:scale-110 transition-transform duration-500">
               <GenderIcon gender={gender as Gender} />
            </div>
            <span className="font-black text-blue-900 text-lg uppercase tracking-tighter">{gender}</span>
          </button>
        ))}
      </div>
      <BackButton onClick={onBack} />
    </div>
  );
}

function Step8({ onComplete, onBack }: { onComplete: (name: string) => void, onBack: () => void }) {
  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length > 1) {
      onComplete(trimmed);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-3 px-6 rounded-2xl mb-6 w-full">
        <h3 className="text-lg font-extrabold uppercase tracking-tight text-center italic">QUAL É O SEU NOME?</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full max-w-[300px] flex flex-col gap-6">
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          className="w-full bg-white text-blue-900 font-extrabold py-4 px-6 rounded-xl shadow-inner text-center text-xl focus:outline-none focus:ring-4 focus:ring-yellow-400/50 placeholder:text-gray-400 transition-all uppercase tracking-tighter"
          autoFocus
        />

        <button
          id="btn-continue"
          type="submit"
          disabled={name.trim().length < 2}
          className="relative bg-gradient-to-b from-blue-400 to-blue-600 text-white font-extrabold py-5 px-8 rounded-full shadow-[0_4px_0_rgba(15,23,42,0.8)] hover:brightness-110 hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all text-lg uppercase tracking-tight disabled:opacity-50 group overflow-hidden"
        >
          <span className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          PRÓXIMO PASSO
        </button>
      </form>

      <div className="mt-4">
        <BackButton onClick={onBack} />
      </div>
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
      className="text-center flex flex-col items-center justify-center py-4 md:py-12"
    >
      <p className="text-lg md:text-xl font-bold mb-6 md:mb-10 leading-relaxed text-blue-100/90">
        Digite o seu <span className="text-yellow-400 font-bold whitespace-nowrap">e-mail</span> para receber o restante da sua <span className="font-bold">leitura personalizada...</span>
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center px-2">
        <label className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tighter">
          Qual é o seu Email?
        </label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu Email"
          className="w-full bg-white text-blue-900 font-bold py-4 px-6 rounded-xl mb-8 text-center text-lg md:text-xl focus:outline-none focus:ring-4 focus:ring-yellow-400 shadow-xl"
          required
        />
        <button 
          type="submit"
          className="w-full bg-[#2ebc15] hover:bg-green-500 text-white font-black py-5 px-6 rounded-full shadow-[0_6px_0_rgba(20,83,45,1)] border-2 border-white/10 transition-all active:translate-y-1 active:shadow-none text-lg md:text-xl uppercase tracking-wider leading-tight"
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
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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

  useEffect(() => {
    if (!isSecondAudio) return;

    const totalSlides = 33;
    const duration = audioRef.current?.duration;
    const safeDuration = (duration && !isNaN(duration) && duration > 0) ? duration : 320;
    const currentProg = currentTime / safeDuration;
    const index = Math.min(totalSlides - 1, Math.max(0, Math.floor(currentProg * totalSlides)));
    setActiveSlideIndex(index);
  }, [currentTime, isSecondAudio]);

  useEffect(() => {
    if (isSecondAudio) return;

    const activeCaption = captions.find(c => currentTime >= c.start && currentTime < c.end)?.text || "";
    const normalizedText = activeCaption.toLowerCase();

    let detectedIndex = -1;

    if (normalizedText.includes("não foi por acaso") || normalizedText.includes("nao foi por acaso")) {
      detectedIndex = 0;
    } else if (normalizedText.includes("sua alma captou")) {
      detectedIndex = 2;
    } else if (normalizedText.includes("frequência divina") || normalizedText.includes("frequencia divina")) {
      detectedIndex = 3;
    } else if (normalizedText.includes("vida de milagres")) {
      detectedIndex = 4;
    } else if (normalizedText.includes("não chegam") || normalizedText.includes("nao chegam")) {
      detectedIndex = 5;
    } else if (normalizedText.includes("rádio está desligado") || normalizedText.includes("radio esta desligado")) {
      detectedIndex = 6;
    } else if (normalizedText.includes("bênçãos estão") || normalizedText.includes("bencas estao") || normalizedText.includes("só experimenta") || normalizedText.includes("so experimenta")) {
      detectedIndex = 7;
    } else if (normalizedText.includes("ponto de virada") || normalizedText.includes("2026 é") || normalizedText.includes("2026 e")) {
      if (currentTime < 90) {
        detectedIndex = 8;
      } else {
        detectedIndex = 13;
      }
    } else if (normalizedText.includes("colheita agressiva")) {
      detectedIndex = 9;
    } else if (normalizedText.includes("mahila luz")) {
      detectedIndex = 10;
    } else if (normalizedText.includes("ajudei mais de")) {
      detectedIndex = 11;
    } else if (normalizedText.includes("repetirá nesta") || normalizedText.includes("repetira nesta")) {
      detectedIndex = 12;
    } else if (normalizedText.includes("se segura") || normalizedText.includes("o problema não") || normalizedText.includes("o problema nao")) {
      detectedIndex = 13;
    } else if (normalizedText.includes("confirmar exatamente") || normalizedText.includes("revela sobre o seu futuro") || normalizedText.includes("revela sobre o seu amanhã")) {
      detectedIndex = 14;
    } else if (
      normalizedText.includes("você projeta") || normalizedText.includes("voce projeta") ||
      normalizedText.includes("você é") || normalizedText.includes("voce e") ||
      normalizedText.includes("você carrega") || normalizedText.includes("voce carrega") ||
      normalizedText.includes("você sustenta") || normalizedText.includes("voce sustenta") ||
      normalizedText.includes("resiliência") || normalizedText.includes("resiliencia") ||
      normalizedText.includes("possui um dinamismo") || normalizedText.includes("no campo profissional")
    ) {
      detectedIndex = 15;
    } else if (
      normalizedText.includes("casamento") || normalizedText.includes("diálogo") || normalizedText.includes("dialogo") ||
      normalizedText.includes("estou certa") || normalizedText.includes("estou certo") || normalizedText.includes("orçamento") || normalizedText.includes("orcamento") ||
      normalizedText.includes("solidão") || normalizedText.includes("solidao") || normalizedText.includes("estranhos")
    ) {
      detectedIndex = 16;
    } else if (
      normalizedText.includes("corpo também") || normalizedText.includes("corpo tambem") ||
      normalizedText.includes("espelho") || normalizedText.includes("vitalidade") ||
      normalizedText.includes("fardo") || normalizedText.includes("exaustão") || normalizedText.includes("exaustao") ||
      normalizedText.includes("porto seguro") || normalizedText.includes("batalha mensal") || normalizedText.includes("consequências") || normalizedText.includes("consequencias")
    ) {
      detectedIndex = 17;
    } else if (
      normalizedText.includes("sua alma pergunta") || normalizedText.includes("is só isso") || normalizedText.includes("is so isso") ||
      normalizedText.includes("historias") || normalizedText.includes("história") || normalizedText.includes("medo de que") ||
      normalizedText.includes("seus sonhos") || normalizedText.includes("voar mais alto") || normalizedText.includes("melhor obra") ||
      normalizedText.includes("chama") || normalizedText.includes("auges") || normalizedText.includes("auge")
    ) {
      detectedIndex = 18;
    } else if (normalizedText.includes("direcione toda") || normalizedText.includes("sua atenção") || normalizedText.includes("sua atencao")) {
      detectedIndex = 19;
    } else if (normalizedText.includes("espere, sinta") || normalizedText.includes("espere. sinta") || normalizedText.includes("sinta isso")) {
      detectedIndex = 20;
    } else if (normalizedText.includes("não acontece") || normalizedText.includes("nao acontece") || normalizedText.includes("frequência comum") || normalizedText.includes("comum")) {
      detectedIndex = 21;
    } else if (normalizedText.includes("surto de ressonância") || normalizedText.includes("surto de ressonancia")) {
      detectedIndex = 22;
    } else if (normalizedText.includes("antiga se esgota")) {
      detectedIndex = 23;
    } else if (normalizedText.includes("três picos") || normalizedText.includes("tres picos") || normalizedText.includes("sincronia em sequência") || normalizedText.includes("sincronia em sequencia")) {
      detectedIndex = 24;
    } else if (normalizedText.includes("colidir") || normalizedText.includes("precisão matemática") || normalizedText.includes("precisao matematica")) {
      detectedIndex = 25;
    } else if (normalizedText.includes("universo calibrando") || normalizedText.includes("ruído mental") || normalizedText.includes("ruido mental") || normalizedText.includes("sinal toca") || normalizedText.includes("oportunidade perdida")) {
      detectedIndex = 26;
    } else if (normalizedText.includes("código angélico") || normalizedText.includes("codigo angelico") || normalizedText.includes("sincronização ativa") || normalizedText.includes("sincronizacao ativa")) {
      detectedIndex = 27;
    } else if (normalizedText.includes("escudo passivo") || normalizedText.includes("imã magnético") || normalizedText.includes("ima magnetico") || normalizedText.includes("prosperidade")) {
      detectedIndex = 28;
    } else if (normalizedText.includes("redor muda") || normalizedText.includes("finalmente fica claro") || normalizedText.includes("fica claro")) {
      detectedIndex = 29;
    } else if (normalizedText.includes("portas trancadas") || normalizedText.includes("cadeado vibracional")) {
      detectedIndex = 30;
    } else if (normalizedText.includes("rara e não") || normalizedText.includes("rara e nao") || normalizedText.includes("mesmo ciclo de vida")) {
      detectedIndex = 31;
    } else if (normalizedText.includes("era de ouro") || normalizedText.includes("decisão ecoará") || normalizedText.includes("decisao ecoara")) {
      detectedIndex = 32;
    } else if (normalizedText.includes("ativação está") || normalizedText.includes("ativacao esta") || normalizedText.includes("este exato minuto")) {
      detectedIndex = 33;
    } else if (normalizedText.includes("identificar qual nota") || normalizedText.includes("responderá primeiro") || normalizedText.includes("respondera primeiro")) {
      detectedIndex = 34;
    } else if (normalizedText.includes("ano bom") || normalizedText.includes("ciclo prolongado")) {
      detectedIndex = 35;
    } else if (
      normalizedText.includes("leitura de ressonância") || normalizedText.includes("leitura de ressonancia") ||
      normalizedText.includes("tela") || normalizedText.includes("e-mail") || normalizedText.includes("email") ||
      normalizedText.includes("mapa de frequência") || normalizedText.includes("mapa de frequencia") ||
      normalizedText.includes("janela específica") || normalizedText.includes("janela especifica") ||
      normalizedText.includes("conexões") || normalizedText.includes("conexoes") || normalizedText.includes("chiado")
    ) {
      detectedIndex = 36;
    }

    if (detectedIndex === -1) {
      if (currentTime < 2) {
        detectedIndex = 0;
      } else if (currentTime < 4) {
        detectedIndex = 1;
      } else if (currentTime < 9) {
        detectedIndex = 2;
      } else if (currentTime < 14) {
        detectedIndex = 3;
      } else if (currentTime < 20) {
        detectedIndex = 4;
      } else if (currentTime < 26) {
        detectedIndex = 5;
      } else if (currentTime < 33) {
        detectedIndex = 6;
      } else if (currentTime < 40) {
        detectedIndex = 7;
      } else if (currentTime < 47) {
        detectedIndex = 8;
      } else if (currentTime < 55) {
        detectedIndex = 9;
      } else if (currentTime < 62) {
        detectedIndex = 10;
      } else if (currentTime < 71) {
        detectedIndex = 11;
      } else if (currentTime < 76) {
        detectedIndex = 12;
      } else if (currentTime < 91) {
        detectedIndex = 13;
      } else if (currentTime < 97) {
        detectedIndex = 14;
      }
    }

    if (detectedIndex === -1) {
      const transitionIdx = captions.findIndex(c => c.text.toLowerCase().includes("direcione toda") || c.text.toLowerCase().includes("sua atenção") || c.text.toLowerCase().includes("sua atencao"));
      const transitionStart = transitionIdx !== -1 ? captions[transitionIdx].start : 194;

      if (currentTime >= transitionStart) {
        const showEmailLimit = showEmailAt || 340;
        const proportion = (currentTime - transitionStart) / (showEmailLimit - transitionStart);
        const indexOffset = Math.min(17, Math.floor(proportion * 18));
        detectedIndex = 19 + indexOffset;
      } else {
        const portraitDuration = transitionStart - 97;
        const proportion = (currentTime - 97) / portraitDuration;
        const indexOffset = Math.min(3, Math.floor(proportion * 4));
        detectedIndex = 15 + indexOffset;
      }
    }

    if (detectedIndex !== -1) {
      setActiveSlideIndex(detectedIndex);
    }
  }, [currentTime, captions, isSecondAudio, showEmailAt]);

  const togglePlay = () => {
    if (isPlaying) {
        audioRef.current?.pause();
        // Only show stop modal if the completion modal is not active
        const isCompletionActive = isSecondAudio && currentTime >= 300;
        if (!isCompletionActive) {
            setShowModal(true);
        }
    } else {
        audioRef.current?.play();
        setShowModal(false);
    }
    setIsPlaying(!isPlaying);
  };

  const currentCaption = captions.length > 0 
    ? (captions.find(c => currentTime >= c.start && currentTime < c.end)?.text || "...")
    : "Ouça com atenção a revelação do seu anjo...";

  const renderSlideContent = (idx: number) => {
    // 1. Get the text header content for the slide
    let textContent: ReactNode = null;
    switch (idx) {
      case 0:
        textContent = (
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-xs md:text-sm font-bold text-gray-300 uppercase tracking-wider mb-0.5 md:mb-1">
              {state.firstName}, seu anjo da guarda é:
            </p>
            <p className="text-2xl md:text-4xl font-black text-yellow-400 uppercase tracking-tighter drop-shadow-md leading-none">
              {state.angelName}
            </p>
          </div>
        );
        break;
      case 14:
        textContent = (
          <p className="text-base md:text-xl font-black text-white uppercase tracking-tight leading-tight max-w-sm">
            {state.angelName} está tentando falar com você agora!
          </p>
        );
        break;
      case 17:
        textContent = (
          <p className="text-base md:text-lg font-black text-white uppercase tracking-tight leading-normal max-w-sm">
            É isso que {state.angelName} está dizendo sobre você.
          </p>
        );
        break;
      case 21:
        textContent = (
          <p className="text-base md:text-xl font-black text-yellow-400 uppercase tracking-tighter leading-tight drop-shadow-lg animate-pulse max-w-sm">
            Espere... Isso não é comum
          </p>
        );
        break;
      case 23:
        textContent = (
          <p className="text-base md:text-xl font-black text-white uppercase tracking-tight leading-tight max-w-sm">
            {state.angelName} está tentando se conectar com você!
          </p>
        );
        break;
      default:
        textContent = null;
    }

    // 2. Get the image URL for the slide
    let imgUrl = "";
    let isAngel = false;
    let animatePulse = false;

    switch (idx) {
      case 0:
      case 1:
      case 14:
      case 18:
      case 23:
        imgUrl = state.angelImage || "";
        isAngel = true;
        break;
      case 2:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_4_alma_captou_converted.webp";
        break;
      case 3:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_5_anjo_conectar_converted.webp";
        break;
      case 4:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_6_bloqueio_milagres_converted.webp";
        break;
      case 5:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_7_bloqueio_frequencia_converted.webp";
        break;
      case 6:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_8_anjo_radio_converted.webp";
        break;
      case 7:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_9_repelindo_bencaos_converted.webp";
        break;
      case 8:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_10_ponto_virada_2026_converted.webp";
        break;
      case 9:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_11_colheita_divina_converted.webp";
        break;
      case 10:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_12_img_mahila_converted.webp";
        break;
      case 11:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_13_img_mahila_retiro_converted.webp";
        break;
      case 12:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_14_img_cortando_bloqueios_converted.webp";
        break;
      case 13:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_15_img_ponto_virada_converted.webp";
        break;
      case 15:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_16_img_bloqueio_anjo_converted.webp";
        break;
      case 16:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_17_frequencia_anjo_converted.webp";
        break;
      case 17:
        imgUrl = state.angelImage || "";
        isAngel = true;
        break;
      case 19:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_18_anjo_sintonizando_converted.webp";
        break;
      case 20:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_19_img_alerta_converted.webp";
        animatePulse = true;
        break;
      case 21:
        imgUrl = state.angelImage || "";
        isAngel = true;
        break;
      case 22:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_20_img_frequencia_detectada_converted.webp";
        break;
      case 24:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_21_img_sinastria_converted.webp";
        break;
      case 25:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_22_universo_abrindo_caminho_converted.webp";
        break;
      case 26:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_23_oportunidade_perdida_converted.webp";
        break;
      case 27:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_24_codigo_angelico_converted.webp";
        break;
      case 28:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_25_ima_prosperidade_converted.webp";
        break;
      case 29:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_26_clareza_mental_converted.webp";
        break;
      case 30:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_27_cadeado_vibracional_converted.webp";
        break;
      case 31:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_28_oportunidade_unica_converted.webp";
        break;
      case 32:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_29_era_dourada_converted.webp";
        break;
      case 33:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_30_sequencia_ativacao_converted.webp";
        break;
      case 34:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_31_atuacao_areas_converted.webp";
        break;
      case 35:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_32_ciclo_abundancia_converted.webp";
        break;
      case 36:
        imgUrl = "https://tudoprahoje.site/anjo/img/etapa1/imgi_33_papel_analise_converted.webp";
        break;
      default:
        imgUrl = state.angelImage || "";
        isAngel = true;
    }

    const dropShadowStyle = isAngel 
      ? "drop-shadow-[0_0_35px_rgba(251,191,36,0.35)]" 
      : "drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]";

    return (
      <div className="flex flex-col items-center justify-start w-full h-full p-2 select-none">
        {/* TEXT HEADER BLOCK - Fixed height, so empty slides have same space */}
        <div className="h-[96px] md:h-[120px] w-full flex items-center justify-center mb-6 text-center select-none">
          {textContent ? textContent : <div className="invisible h-1 w-1" />}
        </div>

        {/* IMAGE BLOCK - Constantly centered and sized under the fixed header */}
        <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 select-none">
          {imgUrl && (
            <img 
              src={imgUrl} 
              alt={isAngel ? (state.angelName || "Anjo") : "Slide"} 
              className={`w-full h-full object-contain ${dropShadowStyle} ${animatePulse ? 'animate-pulse' : ''}`} 
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      </div>
    );
  };

  const renderSecondSlideContent = (idx: number) => {
    let textContent: ReactNode = null;
    let imgUrl = "";
    let isAngel = false;
    let animatePulse = false;

    const challenge = state.challenge || "Finanças";
    const name = state.firstName || "Carlos";
    const subPath = (challenge === "Saúde") ? "saude" : "financeiro-felicidade";
    const rootUrl = `https://tudoprahoje.site/anjo/img/etapa2/${subPath}/`;

    // 1. Determine Text Overlay content
    switch (idx) {
      case 0:
        textContent = (
          <p className="text-xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight max-w-sm">
            Obrigada por continuar comigo!
          </p>
        );
        break;
      case 5:
        textContent = (
          <p className="text-xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight max-w-sm">
            Não é por acaso que você está aqui, <span className="text-yellow-400">{name.toUpperCase()}</span>!
          </p>
        );
        break;
      case 31:
        textContent = (
          <p className="text-lg md:text-2xl font-black text-white uppercase tracking-tight leading-tight max-w-sm">
            Vou te revelar as datas de ativação
          </p>
        );
        break;
      default:
        textContent = null;
    }

    // 2. Determine Image URL
    let derivedRootUrl = rootUrl;
    if (challenge === "Vida Amorosa") {
      const isMale = state.gender === "Masculino";
      const status = state.maritalStatus || "Solteiro(a)";
      const isCompactedStatus = ["Casado(a)", "Namorando", "Noivo(a)"].includes(status);

      let amorPath = "";
      if (isMale) {
        if (isCompactedStatus) {
          amorPath = "vidaamorosa-homem-casado-namorando-noivo";
        } else {
          amorPath = "vidaamorosa-homem-solteiro-viuvo-separado";
        }
      } else {
        if (isCompactedStatus) {
          amorPath = "vidaamorosa-mulher-casada-namorando-noiva";
        } else {
          amorPath = "vidaamorosa-mulher-separada-viuva-solteira";
        }
      }

      derivedRootUrl = `https://tudoprahoje.site/anjo/img/etapa2/${amorPath}/`;

      if (idx !== 0 && idx !== 5 && idx !== 31) {
        let fileName = "";
        
        // Dynamic map covering all scenarios
        if (idx === 1) fileName = "imgi_3_potencial_amoroso_converted.webp";
        else if (idx === 2) fileName = "imgi_4_portal_energetico_converted.webp";
        else if (idx === 3) fileName = "imgi_5_energia_forte_converted.webp";
        else if (idx === 4) fileName = "imgi_6_img_recalibrado_converted.webp";
        else if (idx === 6) {
          if (!isMale && isCompactedStatus) {
            fileName = "imgi_7_img_alinhamento_raro_jupiter_converted.webp";
          } else {
            fileName = "imgi_7_img_alinhamento_raro_converted.webp";
          }
        }
        else if (idx === 7) fileName = "imgi_8_img_intervalo_converted.webp";
        else if (idx === 8) fileName = "imgi_9_img_transferencia_converted.webp";
        else if (idx === 9) fileName = "imgi_10_img_anjo_interferir_converted.webp";
        else if (idx === 10) fileName = "imgi_11_img_ciclo_vibracao_alta_converted.webp";
        else if (idx === 11) {
          if (!isMale) {
            if (isCompactedStatus) {
              fileName = "imgi_12_img_liberacao_massiva_jupiter_converted.webp";
            } else {
              fileName = "imgi_12_img_liberacao_massiva_venus_converted.webp";
            }
          } else {
            fileName = "imgi_12_img_liberacao_massiva_converted.webp";
          }
        }
        else if (idx === 12) fileName = "imgi_13_img_represa_amor_converted.webp";
        else if (idx === 13) fileName = "imgi_14_img_frequencia_ajustada_converted.webp";
        else if (idx === 14) fileName = "imgi_15_img_3_batidas_converted.webp";
        else if (idx === 15) {
          if (isCompactedStatus) {
            if (isMale) {
              fileName = "imgi_16_img_passo1_amor_converted.webp";
            } else {
              fileName = "imgi_16_img_passo1_amor_m_converted.webp";
            }
          } else {
            // BOTH male and female single/separated/widowed match their respective list
            if (isMale) {
              fileName = "imgi_16_img_passo1_solteiro_converted.webp";
            } else {
              fileName = "imgi_16_img_passo1_amor_m_converted.webp";
            }
          }
        }
        else if (idx === 16) {
          if (isCompactedStatus) {
            if (isMale) {
              fileName = "imgi_17_img_passo2_amor_converted.webp";
            } else {
              fileName = "imgi_17_img_passo2_amor_m_converted.webp";
            }
          } else {
            if (isMale) {
              fileName = "imgi_17_img_passo2_solteiro_converted.webp";
            } else {
              fileName = "imgi_17_img_passo2_solteira_converted.webp";
            }
          }
        }
        else if (idx === 17) {
          if (isCompactedStatus) {
            if (isMale) {
              fileName = "imgi_18_img_passo3_amor_converted.webp";
            } else {
              fileName = "imgi_18_img_passo3_amor_m_converted.webp";
            }
          } else {
            if (isMale) {
              fileName = "imgi_18_img_passo3_solteiro_converted.webp";
            } else {
              fileName = "imgi_18_img_passo3_solteira_converted.webp";
            }
          }
        }
        else if (idx === 18) fileName = "imgi_19_img_porta_passando_converted.webp";
        else if (idx === 19) {
          if (isCompactedStatus) {
            fileName = "imgi_20_img_mahila_casada_triste_converted.webp";
          } else {
            fileName = "imgi_20_img_mahila_solteira_sozinha_converted.webp";
          }
        }
        else if (idx === 20) fileName = "imgi_21_img_elias_converted.webp";
        else if (idx === 21) fileName = "imgi_22_img_elias_mahila_converted.webp";
        else if (idx === 22) {
          if (isCompactedStatus) {
            fileName = "imgi_23_img_mahila_mensagem_amor_converted.webp";
          } else {
            fileName = "imgi_23_img_mahila_solteira_encontro_converted.webp";
          }
        }
        else if (idx === 23) fileName = "imgi_24_img_mahila_casada_converted.webp";
        else if (idx === 24) {
          if (isCompactedStatus) {
            if (isMale) {
              fileName = "imgi_25_img_depoimento1_casado_converted.webp";
            } else {
              fileName = "imgi_25_img_depoimento1_casada_converted.webp";
            }
          } else {
            if (isMale) {
              fileName = "imgi_25_img_depoimento1_solteiro_converted.webp";
            } else {
              fileName = "imgi_25_img_depoimento1_solteira_converted.webp";
            }
          }
        }
        else if (idx === 25) {
          if (isCompactedStatus) {
            if (isMale) {
              fileName = "imgi_26_img_depoimento2_casado_converted.webp";
            } else {
              fileName = "imgi_26_img_depoimento2_casada_converted.webp";
            }
          } else {
            if (isMale) {
              fileName = "imgi_26_img_depoimento2_solteiro_converted.webp";
            } else {
              fileName = "imgi_26_img_depoimento2_solteira_converted.webp";
            }
          }
        }
        else if (idx === 26) {
          if (isCompactedStatus) {
            if (isMale) {
              fileName = "imgi_27_img_pessoas_comuns_casado_converted.webp";
            } else {
              fileName = "imgi_27_img_pessoas_comuns_casada_converted.webp";
            }
          } else {
            if (isMale) {
              fileName = "imgi_27_img_pessoas_comuns_solteiro_converted.webp";
            } else {
              fileName = "imgi_27_img_pessoas_comuns_solteira_converted.webp";
            }
          }
        }
        else if (idx === 27) {
          if (isCompactedStatus) {
            fileName = "imgi_28_img_familia_casado_converted.webp";
          } else {
            if (isMale) {
              fileName = "imgi_28_img_solteiro_picture_converted.webp";
            } else {
              fileName = "imgi_28_img_solteira_picture_converted.webp";
            }
          }
        }
        else if (idx === 28) {
          if (isCompactedStatus) {
            fileName = "imgi_29_img_estacao_trem_converted.webp";
          } else {
            if (isMale) {
              fileName = "imgi_29_img_mulher_passando_converted.webp";
            } else {
              fileName = "imgi_29_img_estacao_trem_converted.webp";
            }
          }
        }
        else if (idx === 29) fileName = "imgi_30_img_trem_perdido_converted.webp";
        else if (idx === 30) fileName = "imgi_31_img_calendario_converted.webp";
        else if (idx === 32) fileName = "imgi_32_img_calendario_3datas_converted.webp";

        if (fileName) {
          imgUrl = `${derivedRootUrl}${fileName}`;
        } else {
          imgUrl = state.angelImage || "";
          isAngel = true;
        }
      }
    } else {
      // Financeiro/Felicidade or Saude
      const imageNameMap: Record<number, string> = {
        1: "imgi_3_potencial_financeiro_converted.webp",
        2: "imgi_4_portal_energetico_converted.webp",
        3: "imgi_5_energia_forte_converted.webp",
        4: "imgi_6_img_recalibrado_converted.webp",
        6: "imgi_7_img_alinhamento_raro_converted.webp",
        7: "imgi_8_img_intervalo_converted.webp",
        8: "imgi_9_img_transferencia_converted.webp",
        9: "imgi_10_img_anjo_interferir_converted.webp",
        10: "imgi_11_img_ciclo_vibracao_alta_converted.webp",
        11: "imgi_12_img_liberacao_massiva_converted.webp",
        12: "imgi_13_img_represa_converted.webp",
        13: "imgi_14_img_frequencia_ajustada_converted.webp",
        14: "imgi_15_img_3_batidas_converted.webp",
        15: "imgi_16_img_passo1_converted.webp",
        16: "imgi_17_img_passo2_converted.webp",
        17: "imgi_18_img_passo3_converted.webp",
        18: "imgi_19_img_porta_passando_converted.webp",
        19: "imgi_20_img_mahila_contas_converted.webp",
        20: "imgi_21_img_elias_converted.webp",
        21: "imgi_22_img_elias_mahila_converted.webp",
        22: "imgi_23_img_mahila_ligacao_converted.webp",
        23: "imgi_24_img_mahila_prosperidade_converted.webp",
        24: "imgi_25_img_depoimento1_dinheiro_converted.webp",
        25: "imgi_26_img_depoimento2_dinheiro_converted.webp",
        26: "pessoas_converted.webp",
        27: "imgi_28_img_familia_dinheiro_converted.webp",
        28: "imgi_29_img_estacao_trem_converted.webp",
        29: "imgi_30_img_trem_perdido_converted.webp",
        30: "imgi_31_img_calendario_converted.webp",
        32: "imgi_32_img_calendario_3datas_converted.webp",
      };

      if (idx !== 0 && idx !== 5 && idx !== 31) {
        let fileName = imageNameMap[idx] || "";
        
        // Handle variations for Saúde
        if (challenge === "Saúde") {
          if (idx === 1) fileName = "imgi_3_potencial_saude_converted.webp";
          else if (idx === 12) fileName = "imgi_13_img_represa_saude_converted.webp";
          else if (idx === 15) fileName = "imgi_16_img_passo1_saude_converted.webp";
          else if (idx === 16) fileName = "imgi_17_img_passo2_saude_converted.webp";
          else if (idx === 17) fileName = "imgi_18_img_passo3_saude_converted.webp";
          else if (idx === 19) fileName = "imgi_20_img_mahila_enxaqueca_converted.webp";
          else if (idx === 22) fileName = "imgi_23_img_mahila_saude_48_horas_converted.webp";
          else if (idx === 24) fileName = "imgi_25_img_depoimento1_saude_converted.webp";
          else if (idx === 25) fileName = "imgi_26_img_depoimento2_saude_converted.webp";
          else if (idx === 26) fileName = "imgi_27_img_pessoas_comuns_saude_converted.webp";
          else if (idx === 27) fileName = "imgi_28_img_familia_saude_converted.webp";
          else if (idx === 28) fileName = "imgi_29_img_estacao_trem_felicidade_converted.webp";
        }

        if (fileName) {
          imgUrl = `${derivedRootUrl}${fileName}`;
        }
      }
    }

    if (idx === 0 || idx === 5 || idx === 31) {
      imgUrl = state.angelImage || "";
      isAngel = true;
    }

    const dropShadowStyle = isAngel 
      ? "drop-shadow-[0_0_35px_rgba(251,191,36,0.35)]" 
      : "drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]";

    return (
      <div className="flex flex-col items-center justify-start w-full h-full p-2 select-none">
        {/* TEXT HEADER BLOCK */}
        <div className="h-[96px] md:h-[120px] w-full flex items-center justify-center mb-6 text-center select-none">
          {textContent ? textContent : <div className="invisible h-1 w-1" />}
        </div>

        {/* IMAGE BLOCK */}
        <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 select-none">
          {imgUrl && (
            <img 
              src={imgUrl} 
              alt="Slide" 
              className={`w-full h-full object-contain ${dropShadowStyle} ${animatePulse ? 'animate-pulse' : ''}`} 
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      </div>
    );
  };

  const renderSlideshow = () => {
    const totalSlides = isSecondAudio ? 33 : 37;
    return (
      <div className="relative w-full md:w-[450px] md:h-[450px] mx-auto mb-4 flex items-center justify-center min-h-[380px] md:min-h-0">
        <div className="absolute inset-4 bg-yellow-400/5 rounded-full blur-[80px] animate-pulse pointer-events-none" />
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = activeSlideIndex === idx;
          return (
            <div
              key={idx}
              className="absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out"
              style={{
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
                transform: isActive ? "scale(1)" : "scale(0.96)",
              }}
            >
              {isSecondAudio ? renderSecondSlideContent(idx) : renderSlideContent(idx)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Invisible Audio Element */}
      <audio ref={audioRef} src={audioUrl} />

      <div className="w-full flex-grow flex flex-col items-center text-center relative overflow-hidden py-4">
        
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

        <div className="flex-grow flex flex-col items-center justify-center py-4 w-full animate-fadeIn">
          {renderSlideshow()}
        </div>

        {/* Captions and Player Bar */}
        <div className="w-full mt-auto p-4 md:p-6 flex flex-col items-center gap-8">
           <div className="w-full text-center text-blue-100 font-bold px-2 leading-relaxed text-base md:text-xl min-h-[4em] flex items-center justify-center max-w-2xl mx-auto">
               {isPlaying ? currentCaption : "Clique no play para ouvir..."}
           </div>

           <button 
             onClick={togglePlay}
             className="w-20 h-20 rounded-full bg-blue-500 hover:bg-blue-400 flex items-center justify-center transition-all shadow-xl shadow-blue-500/30 active:scale-95"
           >
             {isPlaying ? <Pause fill="white" size={40} /> : <Play fill="white" size={40} className="ml-1" />}
           </button>
        </div>
      </div>
    </div>
  );
}

function VSLStep() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      var s=document.createElement("script");
      s.src="https://scripts.converteai.net/853c4f04-8442-44da-b89d-0541d78036bb/players/6a0c89d4f2566ea03b0ac950/v4/player.js",
      s.async=!0,
      document.head.appendChild(s);
    `;
    document.head.appendChild(script);
  }, []);

  return (
    <div className="flex-grow flex flex-col items-center justify-center py-4 w-full px-4">
      <div className="w-full max-w-[400px] mx-auto">
        <div 
          dangerouslySetInnerHTML={{ 
            __html: `<vturb-smartplayer id="vid-6a0c89d4f2566ea03b0ac950" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>` 
          }} 
        />
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
  const getFileName = (s: MaritalStatus) => {
    switch (s) {
      case "Casado(a)": return "casado.png";
      case "Namorando": return "namorando.png";
      case "Noivo(a)": return "noivo.png";
      case "Solteiro(a)": return "solteiro.png";
      case "Separado(a)": return "separado.png";
      case "Viúvo(a)": return "viuvo.png";
      default: return "";
    }
  };
  const fileName = getFileName(status);
  if (!fileName) return null;
  return (
    <img 
      src={`${IMAGE_ROOT}${fileName}`} 
      alt={status} 
      className="w-12 h-12 md:w-14 md:h-14 object-contain" 
      referrerPolicy="no-referrer"
    />
  );
}

function ChallengeIcon({ challenge }: { challenge: LifeChallenge }) {
  const getFileName = (c: LifeChallenge) => {
    switch (c) {
      case "Vida Amorosa": return "vidaamorosa.png";
      case "Finanças": return "finanças.png";
      case "Saúde": return "saude.png";
      case "Felicidadee": return "felicidade.png";
      default: return "";
    }
  };
  const fileName = getFileName(challenge);
  if (!fileName) return null;
  return (
    <img 
      src={`${IMAGE_ROOT}${fileName}`} 
      alt={challenge} 
      className="w-12 h-12 md:w-14 md:h-14 object-contain" 
      referrerPolicy="no-referrer"
    />
  );
}

function GenderIcon({ gender }: { gender: Gender }) {
  const fileName = gender === "Masculino" ? "masculine.png" : "female.png";
  return (
    <img 
      src={`${IMAGE_ROOT}${fileName}`} 
      alt={gender} 
      className="w-12 h-12 object-contain" 
      referrerPolicy="no-referrer"
    />
  );
}

