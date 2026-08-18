import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { LoadingScreen } from "@/components/LoadingScreen";
import { OpeningScreen } from "@/components/OpeningScreen";
import { ChapterJustYou } from "@/components/ChapterJustYou";
import { LittleThings } from "@/components/LittleThings";
import { Moments } from "@/components/Moments";
import { TheWait } from "@/components/TheWait";
import { Celebration } from "@/components/Celebration";
import { MessageSection } from "@/components/MessageSection";
import { HiddenSurprise } from "@/components/HiddenSurprise";
import { FinalSection } from "@/components/FinalSection";
import { FinalCountdown } from "@/components/FinalCountdown";
import { MusicController } from "@/components/MusicController";
import { birthdayConfig } from "@/lib/birthday-config";
import { useCountdown } from "@/lib/use-countdown";
import { useMusic } from "@/lib/use-music";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Iquira Bhatti — A Surprise from Balach" },
      {
        name: "description",
        content:
          "A cinematic birthday surprise made for Iquira Bhatti — a live countdown to 20 August 2026 and a personal message from Balach Baloch.",
      },
      { property: "og:title", content: "Happy Birthday, Iquira Bhatti ❤️" },
      {
        property: "og:description",
        content: "A little something special: countdown, memories and a message, made just for Iquira.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayExperience,
});

type Phase = "loading" | "opening" | "journey";

function BirthdayExperience() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [leavingOpening, setLeavingOpening] = useState(false);
  const [celebrated, setCelebrated] = useState(false);

  const remaining = useCountdown(birthdayConfig.targetTimestamp);
  const music = useMusic();
  const { setMood, start } = music;

  const isBirthday = remaining.isOver;
  const inFinale = !isBirthday && remaining.total > 0 && remaining.total <= 10_000;
  const finaleSeconds = Math.max(1, Math.ceil(remaining.total / 1000));

  // Was the page opened already after midnight?
  const [openedAfterMidnight] = useState(() => Date.now() >= birthdayConfig.targetTimestamp);

  // Automatic switch to celebration mode with no refresh
  useEffect(() => {
    if (isBirthday && !celebrated) {
      setCelebrated(true);
      if (phase === "journey") {
        window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
      }
    }
  }, [isBirthday, celebrated, phase]);

  // Music mood follows the story
  useEffect(() => {
    if (isBirthday) setMood("celebration");
    else if (remaining.total <= 60_000) setMood("intense");
    else setMood("calm");
  }, [isBirthday, remaining.total, setMood]);

  // Autoplay attempt (usually blocked — the CTA is the fallback)
  useEffect(() => {
    if (phase !== "opening") return;
    void start();
  }, [phase, start]);

  const handleOpen = useCallback(() => {
    void start();
    setLeavingOpening(true);
    window.setTimeout(() => {
      setPhase("journey");
      window.scrollTo({ top: 0 });
    }, 1000);
  }, [start]);

  const dark = phase !== "journey" || inFinale;

  return (
    <main className="relative w-full overflow-x-hidden">
      <h1 className="sr-only">
        Happy Birthday {birthdayConfig.name} — a surprise from {birthdayConfig.sender}
      </h1>

      {phase === "loading" && <LoadingScreen onDone={() => setPhase("opening")} />}

      {phase === "opening" && (
        <OpeningScreen remaining={remaining} onOpen={handleOpen} leaving={leavingOpening} />
      )}

      {phase === "journey" && (
        <>
          <ChapterJustYou />
          <LittleThings />
          <Moments />
          {isBirthday ? (
            <Celebration instant={openedAfterMidnight} />
          ) : (
            <TheWait remaining={remaining} />
          )}
          <MessageSection />
          <HiddenSurprise />
          <FinalSection />
        </>
      )}

      {inFinale && phase !== "loading" && <FinalCountdown seconds={finaleSeconds} />}

      {phase !== "loading" && (
        <MusicController
          isPlaying={music.isPlaying}
          isMuted={music.isMuted}
          onToggle={music.toggle}
          onToggleMute={music.toggleMute}
          dark={dark}
        />
      )}
    </main>
  );
}
