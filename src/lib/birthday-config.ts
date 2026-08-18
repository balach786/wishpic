import p1 from "@/assets/iquira-1.jpg.asset.json";
import p2 from "@/assets/iquira-2.jpg.asset.json";
import p3 from "@/assets/iquira-3.jpg.asset.json";
import p4 from "@/assets/iquira-4.jpg.asset.json";
import p5 from "@/assets/iquira-5.jpg.asset.json";

export type Photo = { src: string; alt: string };

export const photos: Photo[] = [
  { src: p1.url, alt: "Iquira Bhatti sitting at a candlelit birthday table" },
  { src: p2.url, alt: "Iquira Bhatti in soft daylight beside a pink birthday cake" },
  { src: p3.url, alt: "Iquira Bhatti resting beside a candlelit cake" },
  { src: p4.url, alt: "Iquira Bhatti smiling softly in warm candlelight" },
  { src: p5.url, alt: "Iquira Bhatti in a warm golden candlelit portrait" },
];

export const birthdayConfig = {
  name: "Iquira Bhatti",
  firstName: "Iquira",
  sender: "Balach Baloch",
  timezoneLabel: "Asia/Karachi",
  /** 20 August 2026, 00:00:00 Asia/Karachi (UTC+5) */
  targetTimestamp: Date.UTC(2026, 7, 19, 19, 0, 0),
  dateLabel: "20 August 2026",
  photos,
  littleThings: [
    {
      title: "Your Smile",
      body: "It arrives quietly and changes the whole temperature of a room. Nothing dramatic — it just makes everything a little kinder.",
    },
    {
      title: "Your Energy",
      body: "Some people bring noise. You bring warmth. Ordinary evenings feel lighter simply because you're part of them.",
    },
    {
      title: "Your Kindness",
      body: "The small, unannounced kind — the sort that doesn't ask to be noticed and stays with people anyway.",
    },
    {
      title: "Your Presence",
      body: "There's a calm that comes with you being around. Time slows down in the nicest possible way.",
    },
    {
      title: "The Little Things",
      body: "The tiny details nobody writes down. Those are usually the ones worth keeping.",
    },
  ],
  moments: [
    "Some smiles stay with you.",
    "Some moments deserve to be remembered.",
    "And some people simply make ordinary days feel better.",
  ],
  message: [
    "Happy Birthday, Iquira.",
    "I wanted today to feel a little different — not a message that scrolls away, but something you could open, sit with, and keep.",
    "You have this quiet way of making things better without trying. A day that felt heavy becomes lighter. A normal conversation becomes the good part of someone's evening. That's rare, and I don't think you always realise it.",
    "So today isn't about candles or cake or counting a number. It's about the fact that the world is a softer place because you're in it.",
    "I hope this year is gentle with you. I hope it gives you more of what makes you laugh, more calm, more small perfect moments — and people who see you clearly.",
    "Whatever you're wishing for tonight, I hope it finds you.",
  ],
} as const;
