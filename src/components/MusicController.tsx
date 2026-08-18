import { Music, Pause, Volume2, VolumeX } from "lucide-react";

type Props = {
  isPlaying: boolean;
  isMuted: boolean;
  onToggle: () => void;
  onToggleMute: () => void;
  dark?: boolean;
};

export function MusicController({ isPlaying, isMuted, onToggle, onToggleMute, dark = false }: Props) {
  const shell = dark ? "surface-glass-dark text-cream" : "surface-glass text-ink";
  return (
    <div
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 flex items-center gap-1 rounded-full p-1.5 transition-colors duration-700 sm:bottom-6 sm:right-6 ${shell}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        aria-pressed={isPlaying}
        className="flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" aria-hidden />
        ) : (
          <Music className="h-4 w-4 animate-glow-pulse" aria-hidden />
        )}
      </button>
      <button
        type="button"
        onClick={onToggleMute}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
        aria-pressed={isMuted}
        className="flex h-11 w-11 items-center justify-center rounded-full opacity-70 transition-all duration-300 hover:scale-105 hover:opacity-100 active:scale-95"
      >
        {isMuted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
      </button>
    </div>
  );
}
