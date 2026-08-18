import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Self-contained, dependency-free ambient score built with the Web Audio API.
 * Urdu-inspired instrumental feel: a soft drone, plucked santoor-like phrases
 * over a Bhairavi-flavoured scale, and a gentle tanpura pulse.
 */
export type MusicMood = "calm" | "intense" | "celebration";

const SCALES: Record<MusicMood, number[]> = {
  // Bhairavi-ish (minor) — calm, emotional
  calm: [0, 1, 3, 5, 7, 8, 10, 12],
  intense: [0, 1, 3, 5, 7, 8, 10, 12, 15],
  // Brighter, celebratory
  celebration: [0, 2, 4, 5, 7, 9, 11, 12, 14, 16],
};

const ROOT: Record<MusicMood, number> = { calm: 220, intense: 220, celebration: 261.63 };

export function useMusic() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const droneOscRef = useRef<OscillatorNode[]>([]);
  const timerRef = useRef<number | null>(null);
  const moodRef = useRef<MusicMood>("calm");
  const stepRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const targetVolume = useCallback(() => {
    if (isMuted) return 0;
    return moodRef.current === "celebration" ? 0.3 : moodRef.current === "intense" ? 0.26 : 0.2;
  }, [isMuted]);

  const pluck = useCallback((ctx: AudioContext, dest: GainNode, freq: number, at: number, vel: number) => {
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2600, at);
    filter.frequency.exponentialRampToValueAtTime(700, at + 1.6);
    osc.type = "triangle";
    osc2.type = "sine";
    osc.frequency.value = freq;
    osc2.frequency.value = freq * 2.006;
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(vel, at + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 2.4);
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(filter);
    filter.connect(dest);
    osc.start(at);
    osc2.start(at);
    osc.stop(at + 2.6);
    osc2.stop(at + 2.6);
  }, []);

  const schedule = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const mood = moodRef.current;
    const scale = SCALES[mood];
    const root = ROOT[mood];
    const step = stepRef.current++;
    const now = ctx.currentTime + 0.05;

    const density = mood === "celebration" ? 3 : mood === "intense" ? 2 : 1;
    for (let i = 0; i < density; i++) {
      const idx = scale[Math.floor(Math.random() * scale.length)] ?? 0;
      const octave = mood === "calm" ? (Math.random() < 0.3 ? 0.5 : 1) : Math.random() < 0.4 ? 2 : 1;
      const freq = root * octave * Math.pow(2, idx / 12);
      const vel = (mood === "calm" ? 0.1 : 0.13) * (0.7 + Math.random() * 0.5);
      pluck(ctx, master, freq, now + i * (mood === "celebration" ? 0.28 : 0.5), vel);
    }
    if (step % 4 === 0) {
      pluck(ctx, master, root / 2, now, 0.09);
    }
  }, [pluck]);

  const ensureEngine = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const Ctor: typeof AudioContext | undefined =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    const ctx = new Ctor();
    const master = ctx.createGain();
    master.gain.value = 0;
    const reverbish = ctx.createBiquadFilter();
    reverbish.type = "lowpass";
    reverbish.frequency.value = 4200;
    master.connect(reverbish);
    reverbish.connect(ctx.destination);

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.055;
    droneGain.connect(master);
    const oscs = [110, 165, 220.6].map((f) => {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      o.connect(droneGain);
      o.start();
      return o;
    });

    ctxRef.current = ctx;
    masterRef.current = master;
    droneGainRef.current = droneGain;
    droneOscRef.current = oscs;
    setIsReady(true);
    return ctx;
  }, []);

  const start = useCallback(async () => {
    const ctx = ensureEngine();
    if (!ctx || !masterRef.current) return false;
    try {
      await ctx.resume();
    } catch {
      return false;
    }
    if (ctx.state !== "running") return false;
    masterRef.current.gain.cancelScheduledValues(ctx.currentTime);
    masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, ctx.currentTime);
    masterRef.current.gain.linearRampToValueAtTime(targetVolume(), ctx.currentTime + 3);
    if (timerRef.current === null) {
      schedule();
      timerRef.current = window.setInterval(schedule, 2000);
    }
    setIsPlaying(true);
    return true;
  }, [ensureEngine, schedule, targetVolume]);

  const pause = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else void start();
  }, [isPlaying, pause, start]);

  const toggleMute = useCallback(() => setIsMuted((m) => !m), []);

  const setMood = useCallback((mood: MusicMood) => {
    if (moodRef.current === mood) return;
    moodRef.current = mood;
    const ctx = ctxRef.current;
    const drone = droneGainRef.current;
    if (ctx && drone) {
      drone.gain.linearRampToValueAtTime(mood === "celebration" ? 0.03 : 0.06, ctx.currentTime + 2);
      const base = mood === "celebration" ? [130.8, 196, 261.6] : [110, 165, 220.6];
      droneOscRef.current.forEach((o, i) => {
        o.frequency.linearRampToValueAtTime(base[i] ?? o.frequency.value, ctx.currentTime + 2.5);
      });
    }
  }, []);

  // Keep volume in sync with mood/mute while playing
  useEffect(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master || !isPlaying) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(Math.max(0.0001, targetVolume()), ctx.currentTime + 1.2);
  });

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      ctxRef.current?.close().catch(() => undefined);
    };
  }, []);

  return { isPlaying, isMuted, isReady, start, pause, toggle, toggleMute, setMood };
}
