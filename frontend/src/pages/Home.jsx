import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/logo.png";
/**
 * ChatbotDemoPage — Modo móvil (Mock) con 3 pantallas
 * 1) StartScreen (estilo panel central): prisma/diamante y CTA "Empezar demo".
 * 2) MenuScreen (estilo tarjetas de la izquierda): FAQs grandes (Precios, Horarios, Envíos, Integraciones, Soporte).
 * 3) ChatScreen (mensajes con estética de tarjetas de la izquierda: glass suave + gradiente para el usuario).
 * Mantiene el look del portfolio (verde/teal, dark, glass + neon).
 */

const LOGO_COLOR = "#3AE1D7"; // color principal del logo (acent)
const ACCENT = LOGO_COLOR; // acento de toda la web = color del logo
const LOGO_REM = 20; // tamaño del logo en rem (editable)
const HEADER_OFFSET_REM = 0; // (opcional) desplaza el bloque del header completo
// Offsets individuales (rem) para posicionar elementos dentro del header
const HEADER_LOGO_Y_REM = 0;  // mueve el logo
const HEADER_TITLE_Y_REM = -8; // mueve el título
const HEADER_SUB_Y_REM = -8;   // mueve el subtítulo
const HEADER_CTA_Y_REM = -8;   // mueve el botón CTA
const EMBED_URL = ""; // si pegas una URL, se incrusta el bot real (omite mock)
const BG_GRID_OPACITY = 0.35; // visibilidad de la textura de cuadrícula (0 = invisible, 1 = muy marcada)
// Glow del mock (controlable en rem)
const CHAT_GLOW_EXPAND_X_REM = 0; // expande el glow a lo ancho
const CHAT_GLOW_EXPAND_Y_REM = 0; // expande el glow a lo alto
const CHAT_GLOW_OFFSET_X_REM = 0; // desplaza el glow en X
const CHAT_GLOW_OFFSET_Y_REM = 0; // desplaza el glow en Y
const CHAT_GLOW_ALPHA = 0.05;     // intensidad (0–1)

// Animaciones del diamante (start)
const DIAMOND_BOUNCE_SPEED_S = 2.2; // velocidad del bote (segundos)
const DIAMOND_BOUNCE_REM = 1.2;     // distancia del bote (rem)
const DIAMOND_SPIN_SPEED_S = 1.3;     // velocidad del giro al hover (segundos)
const DIAMOND_RETURN_SPEED_S = 0.7;   // velocidad de retorno suave al soltar hover (segundos)
const CHAT_GLOW_BLUR_REM = 5;     // blur en rem

export default function ChatbotDemoPage() {
  return (
    <div className="relative min-h-screen text-white">
      <NeonBackground />
      <HeaderHero />
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24">
        {EMBED_URL ? <EmbedSection url={EMBED_URL} /> : <DemoSection />}
        <HudStrip />
        <InfoHowWorks />
        <InfoIdealInclude />
        <InfoCTA />
      </main>
    </div>
  );
}

// === BG Futurista ===
function NeonBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* auroras/teal glows */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(60% 100% at 95% 15%, ${ACCENT}40 0%, ${ACCENT}14 35%, transparent 70%),
            radial-gradient(40% 60% at 10% 90%, ${ACCENT}22 0%, transparent 60%),
            linear-gradient(180deg, #0b1312 0%, #0a0f10 60%, #080c0d 100%)
          `
        }}
      />
      {/* grid sutil */}
      <div
        className="absolute inset-0"
        style={{
          opacity: `var(--bg-grid-opacity, ${BG_GRID_OPACITY})`,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(circle at 50% 0%, rgba(0,0,0,.9), transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 0%, rgba(0,0,0,.9), transparent 70%)",
        }}
      />
    </div>
  );
}

function HeaderHero() {
  return (
    <section className="relative border-b border-white/10 pt-16 pb-20 text-center md:pt-24 md:pb-28">
      <div className="mx-auto max-w-3xl">
        <img
          src={Logo}
          alt="Logo"
          className="mx-auto mb-6 block object-contain"
          style={{
            height: `var(--logo-rem, ${LOGO_REM}rem)`,
            width: "auto",
            transform: `translateY(var(--header-logo-y, ${HEADER_LOGO_Y_REM}rem))`
          }}
        />
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl" style={{ transform: `translateY(var(--header-title-y, ${HEADER_TITLE_Y_REM}rem))` }}>
          Demo <span style={{ color: ACCENT }}>Chatbot IA</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-zinc-300" style={{ transform: `translateY(var(--header-sub-y, ${HEADER_SUB_Y_REM}rem))` }}>
          Aumenta tus ventas 24/7 con un chatbot de IA (GPT) entrenado para tu negocio.
        </p>
        <div className="mt-7 flex items-center justify-center gap-3" style={{ transform: `translateY(var(--header-cta-y, ${HEADER_CTA_Y_REM}rem))` }}>
          <a href="#demo" className="rounded-xl px-6 py-3 font-semibold text-black shadow-[0_0_0_1px_rgba(255,255,255,.06)]" style={{ backgroundColor: ACCENT }}>
            Probar ahora
          </a>
        </div>
      </div>
    </section>
  );
}

function EmbedSection({ url }) {
  return (
    <section id="demo" className="mt-12">
      <HoloTitle title="Demo incrustada" subtitle="Modo embed (bot real)" />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_0_0_1px_rgba(255,255,255,.04)]">
        <iframe title="Chatbot" src={url} className="h-[720px] w-full" allow="microphone; clipboard-read; clipboard-write" />
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section id="demo" className="mt-20 md:mt-28">
      <HoloTitle title="Prueba el bot en acción" subtitle="" />
      <div className="flex w-full items-start justify-center">
        <div className="w-[380px] sm:w-[400px]">
          <MobileChatMock />
        </div>
      </div>
    </section>
  );
}

function HoloTitle({ title, subtitle }) {
  return (
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="text-xs text-zinc-400">{subtitle}</p>
    </div>
  );
}

// ====== MOBILE MOCK ======
function MobileChatMock() {
  const [screen, setScreen] = useState("start"); // start | menu | chat
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, screen]);

  const quickStart = (preset) => {
    const text = preset || "Quiero saber precios";
    setScreen("chat");
    send(text);
  };

  const send = (text) => {
    const userMsg = { id: Date.now(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setTyping(true);
    setTimeout(() => {
      const reply = simulateReply(text);
      setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", text: reply }]);
      setTyping(false);
    }, 500);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    if (screen !== "chat") setScreen("chat");
    send(value.trim());
    setValue("");
  };

  return (
    <PhoneShell>
      {screen === "start" && (
        <StartScreen onStart={() => setScreen("menu")} onStartChat={() => setScreen("chat")} />
      )}
      {screen === "menu" && <MenuScreen onSelect={quickStart} onBack={() => setScreen("start")} />}
      {screen === "chat" && (
        <ChatScreen
          messages={messages}
          typing={typing}
          value={value}
          setValue={setValue}
          onSubmit={onSubmit}
          endRef={endRef}
          onBack={() => setScreen("menu")}
          listRef={listRef}
        />
      )}
    </PhoneShell>
  );
}

function PhoneShell({ children }) {
  return (
    <div className="relative">
      {/* Contenedor rectangular con fondo futurista */}
      <div className="relative">
        {/* Glow detrás del chatbot, mismo tamaño con control por variables */}
        <div
          className="pointer-events-none absolute -z-10 rounded-xl"
          style={{
            top: `calc(0rem - var(--glow-expand-y, ${CHAT_GLOW_EXPAND_Y_REM}rem))`,
            bottom: `calc(0rem - var(--glow-expand-y, ${CHAT_GLOW_EXPAND_Y_REM}rem))`,
            left: `calc(0rem - var(--glow-expand-x, ${CHAT_GLOW_EXPAND_X_REM}rem))`,
            right: `calc(0rem - var(--glow-expand-x, ${CHAT_GLOW_EXPAND_X_REM}rem))`,
            transform: `translate(var(--glow-offset-x, ${CHAT_GLOW_OFFSET_X_REM}rem), var(--glow-offset-y, ${CHAT_GLOW_OFFSET_Y_REM}rem))`,
            background: ACCENT,
            opacity: `var(--glow-alpha, ${CHAT_GLOW_ALPHA})`,
            filter: `blur(var(--glow-blur, ${CHAT_GLOW_BLUR_REM}rem))`
          }}
        />
        <div
          className="relative h-[720px] overflow-hidden rounded-xl border border-white/10 p-0"
          style={{
            background: `
              radial-gradient(120% 140% at 110% -10%, ${ACCENT}33 0%, ${ACCENT}11 30%, transparent 60%),
              linear-gradient(180deg, #0C1413 0%, #0A0F10 60%, #080C0D 100%)
            `
          }}
        >
          {children}
        </div>

        {/* Borde neón: luz que recorre el marco (stroke + glow) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            // === Variables (ajustables) ===
            // grosor del borde en rem
            "--neon-thickness": "0.02rem",
            // tamaño del arco/segmento luminoso en grados
            "--neon-arc-deg": "20deg",
            // velocidad (s) del recorrido
            "--neon-speed": "6s",
            // intensidad del glow (radio de blur) en rem
            "--neon-glow": "200rem",
            // opacidad del glow (0-1)
            "--neon-alpha": "12",
            position: "absolute",
            inset: 0,
            borderRadius: "0.75rem",
            // máscara para dejar solo el borde visible
            padding: "var(--neon-thickness)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            background: `conic-gradient(from var(--a,0deg) at 50% 50%, transparent 0deg calc(360deg - var(--neon-arc-deg)), ${ACCENT} calc(360deg - var(--neon-arc-deg)) 360deg)`,
            filter: "drop-shadow(0 0 6px rgba(0,237,149,.35)) drop-shadow(0 0 12px rgba(0,237,149,.25))",
            animation: "borderSweep var(--neon-speed) linear infinite"
          }}
        />

        {/* GLow que acompaña al arco (mismo gradiente, más blur) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            // misma máscara de borde
            padding: "var(--neon-thickness)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            background: `conic-gradient(from var(--a,0deg) at 50% 50%, transparent 0deg calc(360deg - var(--neon-arc-deg)), rgba(0,237,149,var(--neon-alpha)) calc(360deg - var(--neon-arc-deg)) 360deg)`,
            filter: "blur(var(--neon-glow))",
            animation: "borderSweep var(--neon-speed) linear infinite"
          }}
        />

        {/* defs para la animación y propiedad custom */}
        <style>{`
          @property --a { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
          @keyframes borderSweep { from { --a: 0deg; } to { --a: 360deg; } }
        `}</style>
      </div>
    </div>
  );
}

// --- Pantalla 1: Start ---
function StartScreen({ onStart, onStartChat }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
      {/* Prisma / diamante */}
      <div className="relative mb-8">
        <div className="absolute -inset-8 -z-10 rounded-full blur-3xl" style={{ background: `${ACCENT}33` }} />
        {/* Contenedor con bote y hover-rotación */}
        <div
          className="diamond relative inline-block cursor-pointer select-none"
          onClick={() => onStartChat && onStartChat()}
          style={{
            display: 'inline-block',
            animation: 'diamondBounce var(--d-bounce-speed, 2s) ease-in-out infinite',
            '--d-bounce-speed': `${DIAMOND_BOUNCE_SPEED_S}s`,
            '--d-bounce-dist': `${DIAMOND_BOUNCE_REM}rem`,
            '--d-spin-speed': `${DIAMOND_SPIN_SPEED_S}s`,
            '--d-return-speed': `${DIAMOND_RETURN_SPEED_S}s`,
          }}
          title="Haz clic para empezar"
        >
          <div
            className="diamond-rotator h-32 w-32 rounded-2xl"
            style={{
              // usamos una variable para rotación que permite volver suave al estado base
              background: `linear-gradient(135deg, ${ACCENT} 0%, #0affc4 60%, ${ACCENT} 100%)`,
              transform: 'rotate(var(--rot, 45deg))',
              transition: '--rot .5s ease-out',
              willChange: 'transform',
            }}
          />
        </div>
        <style>{`
@property --rot { syntax: '<angle>'; inherits: false; initial-value: 45deg; }
@keyframes diamondBounce {
  0%, 100% { transform: translateY(calc(var(--d-bounce-dist) * -0.5)); }
  50% { transform: translateY(calc(var(--d-bounce-dist) * 0.5)); }
}
@keyframes diamondSpinVar { from { --rot: 45deg; } to { --rot: 405deg; } }
@keyframes diamondReturn { to { --rot: 45deg; } }
.diamond:hover .diamond-rotator { animation: diamondSpinVar var(--d-spin-speed) linear infinite; }
/* Al salir del hover, vuelve suavemente a 45deg */
.diamond:not(:hover) .diamond-rotator { animation: diamondReturn var(--d-return-speed, .7s) cubic-bezier(.22,.61,.36,1) forwards; }
        `}</style>
      </div>
      <h3 className="text-2xl font-semibold">¿Listo para probar?</h3>
      <p className="mt-2 max-w-xs text-sm text-zinc-400">Interactúa con el bot como si fuera una app real. Empezamos con preguntas típicas.</p>
      <button onClick={onStart} className="mt-7 rounded-full px-6 py-3 text-black shadow-[0_0_0_1px_rgba(255,255,255,.06)]" style={{ backgroundColor: ACCENT }}>
        Empezar demo
      </button>
      <div className="absolute bottom-4 left-0 right-0 grid place-items-center">
        <div className="text-[10px] text-zinc-500">v1.0 • Mock UI</div>
      </div>
    </div>
  );
}

// --- Pantalla 2: Menú de FAQs ---
function MenuScreen({ onSelect, onBack }) {
  const items = [
    { k: "Precios", d: "Planes y qué incluye cada uno", icon: IconTag },
    { k: "Horarios", d: "Disponibilidad para demo", icon: IconClock },
    { k: "Envíos", d: "Tiempos y cobertura", icon: IconTruck },
    { k: "Integraciones", d: "WhatsApp, Web, GSheets", icon: IconPlug },
    { k: "Soporte", d: "Contacto y SLA", icon: IconLife },
  ];
  return (
    <div className="flex h-full flex-col">
      <TopBar title="Hola" onBack={onBack} />
      <div className="px-4 pt-2">
        <p className="text-xs uppercase tracking-[.2em] text-zinc-500">¿Qué quieres probar hoy?</p>
      </div>
      <div className="mt-3 space-y-3 px-4">
        {items.map((it) => (
          <button
            key={it.k}
            onClick={() => onSelect(`Quiero saber ${it.k.toLowerCase()}`)}
            className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur hover:bg-white/10"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
              <it.icon />
            </div>
            <div className="flex-1">
              <div className="font-medium" style={{ color: ACCENT }}>{it.k}</div>
              <div className="text-xs text-zinc-400">{it.d}</div>
            </div>
            <span className="text-zinc-500">›</span>
          </button>
        ))}
      </div>
      {/* input muted */}
      <div className="mt-auto px-4 pb-4 pt-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-400">
          <span className="opacity-70">¿Cuál es tu duda?</span>
          <div className="ml-auto grid h-9 w-9 place-items-center rounded-full" style={{ background: ACCENT }}>
            <ArrowIcon dark />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Pantalla 3: Chat ---
function ChatScreen({ messages, typing, value, setValue, onSubmit, endRef, onBack, listRef }) {
  return (
    <div className="flex h-full flex-col">
      <TopBar title="Nuevo chat" onBack={onBack} />

      <div ref={listRef} className="h-full overflow-y-auto px-3 py-3">
        {messages.map((m) => (
          <Bubble key={m.id} role={m.role} text={m.text} />
        ))}
        {typing && <TypingBubble />}
        <div ref={endRef} />
      </div>

      <form onSubmit={onSubmit} className="px-3 pb-4 pt-1">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2.5">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Escribe tu mensaje…"
            className="flex-1 bg-transparent px-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
          />
          <button type="submit" className="grid h-9 w-9 place-items-center rounded-full text-black" style={{ background: ACCENT }}>
            <ArrowIcon />
          </button>
        </div>
      </form>
    </div>
  );
}

function TopBar({ title, onBack }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <button onClick={onBack} className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5">
        <MenuIcon />
      </button>
      <div className="text-sm text-zinc-300">{title}</div>
    </div>
  );
}

function Bubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`mb-3 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-[0_10px_30px_rgba(0,237,149,.08)] border ${
          isUser ? "border-transparent" : "border-white/10 bg-white/5 backdrop-blur"
        }`}
        style={
          isUser
            ? { background: `linear-gradient(135deg, ${ACCENT} 0%, #0affc4 60%, ${ACCENT} 100%)`, color: "#03110D" }
            : {}
        }
      >
        {text}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="mb-3 flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
        <Dot /><Dot /><Dot />
      </div>
    </div>
  );
}

function Dot() { return <span className="inline-block h-2 w-2 animate-pulse rounded-full" style={{ background: ACCENT }} />; }

// ====== Utils ======
function simulateReply(input) {
  const q = input.toLowerCase();
  if (q.includes("precio") || q.includes("precios")) return "Planes desde 49€/mes. El Pro (99€/mes) añade integraciones y analítica.";
  if (q.includes("horario") || q.includes("disponibilidad") || q.includes("mañana") || q.includes("hoy")) return "Agenda disponible: 10:00, 12:30 y 17:00 CET. ¿Te reservo 15 min?";
  if (q.includes("envio") || q.includes("envíos") || q.includes("envio")) return "Envíos 24–48h a nivel nacional. Internacional bajo consulta.";
  if (q.includes("reserv")) return "Perfecto. Déjame tu email y recibes la invitación al instante.";
  if (q.includes("integra")) return "Se integra en Web, WordPress, Webflow y WhatsApp Business. También con Google Sheets.";
  if (q.includes("soporte") || q.includes("contacto")) return "Soporte por email y Slack. SLA 24h en días laborables.";
  return "Puedo ayudarte con precios, horarios, envíos, integraciones y soporte. ¿Qué te gustaría saber?";
}

function HudStrip() {
  return (
    <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-zinc-400 backdrop-blur">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#0A1110] p-3">Latencia media: <span style={{ color: ACCENT }}>~120ms</span></div>
        <div className="rounded-xl border border-white/10 bg-[#0A1110] p-3">Tasa de acierto FAQ: <span style={{ color: ACCENT }}>97%</span></div>
        <div className="rounded-xl border border-white/10 bg-[#0A1110] p-3">Leads/día: <span style={{ color: ACCENT }}>12</span></div>
        <div className="rounded-xl border border-white/10 bg-[#0A1110] p-3">Disponibilidad: <span style={{ color: ACCENT }}>Alta</span></div>
      </div>
    </div>
  );
}

// ====== Feature Card (tarjeta mejorada) ======
function FeatureCard({ Icon, title, desc }) {
  return (
    <div
      className="group relative h-full rounded-3xl p-[1px] transition-transform duration-300 hover:-translate-y-0.5 overflow-hidden"
      style={{
        background: `conic-gradient(from 180deg at 50% 50%, ${ACCENT}22, transparent 30%, transparent 70%, ${ACCENT}22)`,
      }}
    >
      <div
        className="h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-7 transition-all duration-300 flex flex-col"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(255,255,255,.02), transparent 30%)` }}
      >
        <div className="mb-4 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 relative">
          <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: `0 0 0 2px ${ACCENT}22 inset` }} />
          <Icon />
        </div>
        <h4 className="text-xl md:text-2xl font-semibold" style={{ color: ACCENT }}>{title}</h4>
        <p className="mt-2 text-[15px] leading-6 text-zinc-300/85">{desc}</p>
      </div>
    </div>
  );
}
// ====== Info Secciones (debajo del chatbot) ======
function InfoHowWorks() {
  return (
    <section className="mt-16 md:mt-24 text-center">
      <h3 className="text-3xl font-bold tracking-tight">¿Cómo funciona?</h3>
      <p className="mx-auto mt-4 max-w-3xl text-zinc-300">
        Este bot está desarrollado con <span className="font-semibold" style={{ color: ACCENT }}>FastAPI</span> (Python) y puede conectarse a cualquier web, app o sistema mediante una <span className="font-semibold" style={{ color: ACCENT }}>API RESTful</span>.
      </p>
      <p className="mx-auto mt-3 max-w-4xl text-zinc-400">
        Puedes integrarlo fácilmente en páginas con React, Vite, Tailwind u otros frameworks modernos. Todo el backend es escalable, documentado y preparado para personalizar funciones reales según el tipo de negocio.
      </p>

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard Icon={IconClock} title="Rápido de implementar" desc="Lista en minutos, no semanas" />
        <FeatureCard Icon={IconPlug} title="Totalmente personalizable" desc="Se adapta a cualquier negocio" />
        <FeatureCard Icon={IconLife} title="Atención al cliente 24/7" desc="Nunca deja a tus clientes esperando" />
      </div>
    </section>
  );
}

// --- Card informativa con blur calibrado ---
function InfoBox({ title, items }) {
  return (
    <div
      className="relative h-full overflow-hidden rounded-2xl p-[1px]"
      style={{
        background: `conic-gradient(from 180deg at 50% 50%, ${ACCENT}1f, transparent 30%, transparent 70%, ${ACCENT}1f)`,
      }}
    >
      <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 flex flex-col">
        {/* Glow interno controlado y recortado al borde */}
        <div
          className="pointer-events-none absolute -z-10 inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(80% 120% at 50% 100%, ${ACCENT}22 0%, transparent 60%)`,
            filter: "blur(18px)",
          }}
        />
        <div className="mb-3 flex items-center gap-2 text-sm" style={{ color: ACCENT }}>
          <span className="text-xl">✅</span>
          <span className="font-semibold">{title}</span>
        </div>
        <ul className="space-y-2 text-zinc-300">
          {items.map((t, i) => (
            <li key={i}>• {t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function InfoIdealInclude() {
  return (
    <section className="mt-14 md:mt-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          <InfoBox
            title="Ideal para:"
            items={[
              "Tiendas online que reciben muchas preguntas repetidas",
              "Emprendedores que quieren automatizar su atención al cliente sin complicaciones técnicas",
              "Freelancers, marcas personales o negocios locales que quieren un asistente propio sin depender de plantillas",
            ]}
          />
          <InfoBox
            title="Lo que incluye:"
            items={[
              "Respuestas automáticas personalizadas",
              "Panel de administración para negocios",
              "Integración web, WhatsApp, Telegram",
              "Análisis de conversaciones y métricas",
            ]}
          />
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-zinc-400 backdrop-blur">
          🚀 Desarrollado con <span style={{ color: ACCENT }}>FastAPI</span> + React + Tailwind · Código 100% propio
        </div>
      </div>
    </section>
  );
}

function InfoCTA() {
  return (
    <section className="mt-16 md:mt-24 text-center">
      <h3 className="text-2xl font-bold tracking-tight">¿Te interesa implementar esto en tu negocio?</h3>
      <p className="mx-auto mt-2 max-w-2xl text-zinc-400">Contáctame para más información sobre cómo personalizar este bot para tus necesidades específicas.</p>
      <div className="mt-5 flex items-center justify-center">
        <a href="mailto:vanedev.contacto@gmail.com" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white backdrop-blur hover:bg-white/10">
          <span className="grid h-6 w-6 place-items-center rounded-lg" style={{ background: ACCENT, color: '#03110D' }}>✉</span>
          vanedev.contacto@gmail.com
        </a>
      </div>
    </section>
  );
}

// ====== Icons (inline SVG para no añadir librerías) ======
function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
function ArrowIcon({ dark }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12h12M13 6l6 6-6 6" stroke={dark ? "#03110D" : "#03110D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconTag() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 13l-7 7-9-9V4h7l9 9z" stroke="white" strokeWidth="1.4" fill="none"/>
      <circle cx="7.5" cy="7.5" r="1.25" fill="white"/>
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.4"/>
      <path d="M12 7v6l4 2" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function IconTruck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 7h11v8H3zM14 10h5l2 3v2h-7V10z" stroke="white" strokeWidth="1.4"/>
      <circle cx="7" cy="17" r="1.5" fill="white"/>
      <circle cx="17" cy="17" r="1.5" fill="white"/>
    </svg>
  );
}
function IconPlug() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 6v6m10-6v6M6 12h12v2a6 6 0 01-6 6h0a6 6 0 01-6-6v-2z" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function IconLife() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.4"/>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" stroke="white" strokeWidth="1.4"/>
    </svg>
  );
}
