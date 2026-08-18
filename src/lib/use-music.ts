import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Music hook backed by the YouTube IFrame Player API.
 * The player renders in a hidden off-screen div and streams the
 * requested song. Play / pause / mute are forwarded to the YT player.
 *
 * Song: https://youtu.be/uCj_QmpaHus
 */

export type MusicMood = "calm" | "intense" | "celebration";

// Augment window to hold our ready callback
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

const YT_VIDEO_ID = "uCj_QmpaHus";

export function useMusic() {
  const playerRef = useRef<YT.Player | null>(null);
  const containerIdRef = useRef(`yt-player-${Math.random().toString(36).slice(2)}`);
  const pendingPlayRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Load the YouTube IFrame API script once
  useEffect(() => {
    if (document.getElementById("yt-iframe-api")) return;
    const tag = document.createElement("script");
    tag.id = "yt-iframe-api";
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }, []);

  // Create the hidden container and initialise the player
  useEffect(() => {
    const containerId = containerIdRef.current;

    // Create off-screen container
    const container = document.createElement("div");
    container.id = containerId;
    container.style.cssText =
      "position:fixed;width:1px;height:1px;top:-9999px;left:-9999px;opacity:0;pointer-events:none;";
    document.body.appendChild(container);

    const initPlayer = () => {
      playerRef.current = new window.YT.Player(containerId, {
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: YT_VIDEO_ID, // required for loop
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event: YT.PlayerEvent) => {
            event.target.setVolume(70);
            setIsReady(true);
            if (pendingPlayRef.current) {
              event.target.playVideo();
              pendingPlayRef.current = false;
            }
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          },
          onError: () => {
            // Silently swallow errors (e.g. ad-block, network)
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        initPlayer();
      };
    }

    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
      document.getElementById(containerId)?.remove();
    };
  }, []);

  const start = useCallback(async (): Promise<boolean> => {
    const player = playerRef.current;
    if (!player) {
      // Player not ready yet — flag so we play as soon as it is
      pendingPlayRef.current = true;
      return false;
    }
    try {
      player.playVideo();
      return true;
    } catch {
      return false;
    }
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo();
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else void start();
  }, [isPlaying, pause, start]);

  const toggleMute = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  }, [isMuted]);

  // setMood is kept for API compatibility — mood changes are a no-op
  // since we're playing a fixed song.
  const setMood = useCallback((_mood: MusicMood) => {
    // no-op: the song handles its own mood
  }, []);

  return { isPlaying, isMuted, isReady, start, pause, toggle, toggleMute, setMood };
}
