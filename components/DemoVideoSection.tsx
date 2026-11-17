"use client";

import { useRef, useState, type CSSProperties } from "react";
import { Container } from "@/components/ui/Section";

/**
 * Demo video section for getzav.com.
 *
 * Files this expects in /public:
 *   /public/videos/zav-missed-call-demo-voiceover.av1.mp4  (AV1, preferred)
 *   /public/videos/zav-missed-call-demo-voiceover.mp4      (H.264 fallback)
 *   /public/videos/zav-demo-poster-800.avif, -1600.avif, -1280.jpg (fallback)
 *
 * Usage: <DemoVideoSection /> on the home page, directly under the hero.
 * The section has id="demo", so a hero button can link to "#demo".
 * preload="none": the video costs nothing until the visitor presses play.
 */

const SKY = "#0e9fe3";
const INK = "#11131a";

const sectionBg: CSSProperties = {
  backgroundColor: "#f3f4f1",
  backgroundImage: [
    "radial-gradient(900px 420px at 50% 0%, rgba(14,159,227,0.22), transparent 70%)",
    "linear-gradient(rgba(17,19,26,0.04) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(17,19,26,0.04) 1px, transparent 1px)",
  ].join(","),
  backgroundSize: "auto, 56px 56px, 56px 56px",
};

export default function DemoVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play());
  };

  return (
    <section id="demo" style={sectionBg} className="scroll-mt-20 py-16 sm:py-24">
      <Container className="text-center">
        <span
          className="inline-block rounded-full border px-4 py-1.5 font-mono text-xs uppercase sm:text-sm"
          style={{ color: SKY, borderColor: "rgba(14,159,227,0.45)", backgroundColor: "rgba(14,159,227,0.10)", letterSpacing: "0.28em" }}
        >
          See it in 46 seconds
        </span>

        <h2
          className="mt-6 font-display text-[clamp(34px,5.6vw,60px)] leading-[1.04] font-bold tracking-[-0.035em] text-balance"
          style={{ color: INK }}
        >
          See a missed call become <br className="hidden sm:block" />
          <span style={{ color: SKY }}>a booked job.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted sm:text-xl">
          The same call, played twice: once without ZAV, once with it.
        </p>

        <div
          className="relative mt-10 aspect-video overflow-hidden rounded-3xl bg-white ring-1 ring-ink/5 sm:mt-12"
          style={{ boxShadow: "0 40px 80px -30px rgba(7,89,133,0.45), 0 12px 30px rgba(17,19,26,0.08)" }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            preload="none"
            playsInline
            controls={playing}
            onEnded={() => setPlaying(false)}
          >
            {/* AV1 first: same picture (VMAF 97.5 vs the original), 3.0 MB instead of 5.4 MB.
                Browsers that can't play AV1 (e.g. older iPhones) skip it and get the H.264 original. */}
            <source src="/videos/zav-missed-call-demo-voiceover.av1.mp4" type='video/mp4; codecs="av01.0.08M.08, mp4a.40.2"' />
            <source src="/videos/zav-missed-call-demo-voiceover.mp4" type='video/mp4; codecs="avc1.640028, mp4a.40.2"' />
          </video>

          {/* The poster is an <img>, not the video's poster attribute, so it can be
              lazy-loaded and sized for the screen (13 KB on a phone instead of 199 KB). */}
          {!playing && (
            <picture>
              <source
                type="image/avif"
                srcSet="/videos/zav-demo-poster-800.avif 800w, /videos/zav-demo-poster-1600.avif 1600w"
                sizes="(min-width: 1152px) 1088px, calc(100vw - 40px)"
              />
              <img
                src="/videos/zav-demo-poster-1280.jpg"
                alt=""
                width={1920}
                height={1080}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>
          )}

          {!playing && (
            <button
              type="button"
              onClick={start}
              aria-label="Play the 46 second ZAV demo: a missed call, with and without ZAV"
              className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-4 sm:gap-5"
            >
              <span className="relative flex h-20 w-20 items-center justify-center sm:h-28 sm:w-28">
                {/* two soft rings that pulse outward */}
                <span className="absolute -inset-4 animate-ping rounded-full motion-reduce:animate-none sm:-inset-6" style={{ border: "2px solid rgba(14,159,227,0.45)", animationDuration: "2.2s" }} />
                <span className="absolute -inset-2 rounded-full sm:-inset-3" style={{ border: "2px solid rgba(14,159,227,0.55)" }} />
                <span
                  className="relative flex h-full w-full items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none"
                  style={{ background: "linear-gradient(160deg,#38bdf8 0%,#0e9fe3 55%,#0b7fb8 100%)", boxShadow: "0 0 0 8px rgba(255,255,255,0.85), 0 18px 36px rgba(7,89,133,0.45)" }}
                >
                  <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-white sm:h-11 sm:w-11" aria-hidden="true">
                    <path d="M7 4.5v15a1 1 0 0 0 1.5.9l12.5-7.5a1 1 0 0 0 0-1.8L8.5 3.6A1 1 0 0 0 7 4.5z" />
                  </svg>
                </span>
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-muted shadow-lg sm:px-5 sm:text-base">
                <span className="font-bold" style={{ color: INK }}>Watch</span> · 46 sec · sound on
              </span>
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}
