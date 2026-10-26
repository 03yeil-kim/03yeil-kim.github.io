import { useEffect, useState } from "react";

type ArtworkVariant = "contour" | "orbit" | "ripple" | "bloom";

type Artwork = {
  key: string;
  number: string;
  title: string;
  kicker: string;
  description: string;
  detail: string;
  year: string;
  variant: ArtworkVariant;
};

const artworks: Artwork[] = [
  {
    key: "1",
    number: "01",
    title: "Contour",
    kicker: "A study in stillness",
    description:
      "A single gesture holds the room. Contour follows the quiet architecture of a face before it becomes a portrait.",
    detail: "INK / DIGITAL LINE",
    year: "2026",
    variant: "contour",
  },
  {
    key: "2",
    number: "02",
    title: "Orbit",
    kicker: "Gravity, held lightly",
    description:
      "Two forms keep a measured distance, circling the invisible point where attention begins.",
    detail: "VECTOR / MOTION STUDY",
    year: "2026",
    variant: "orbit",
  },
  {
    key: "3",
    number: "03",
    title: "Ripple",
    kicker: "What remains after",
    description:
      "The surface remembers every touch. Ripple is a slow translation of sound into a line that keeps moving.",
    detail: "GENERATIVE / LINE SCORE",
    year: "2025",
    variant: "ripple",
  },
  {
    key: "4",
    number: "04",
    title: "Bloom",
    kicker: "An opening, repeated",
    description:
      "Four strokes lean toward one another, making a shape that feels less like an object and more like a beginning.",
    detail: "INK / OBSERVATION",
    year: "2025",
    variant: "bloom",
  },
];

function OneLineArt({ variant }: { variant: ArtworkVariant }) {
  if (variant === "contour") {
    return (
      <svg className="line-art line-art--contour" viewBox="0 0 560 480" role="img" aria-label="Contour one-line artwork">
        <path className="art-stroke art-stroke--main" pathLength="1" d="M286 83c-48 10-86 42-105 85-18 42-10 89 15 113 20 19 45 25 64 34 25 12 31 33 16 54-19 27-50 42-91 39-39-3-76-24-91-54-15-29-4-58 26-72 31-14 74-8 101 18 28 27 36 68 66 96 29 27 78 39 123 24 44-15 73-51 75-94 2-37-19-67-50-76-31-9-67 3-84 31-15 24-13 57 7 74" />
        <path className="art-stroke art-stroke--secondary" pathLength="1" d="M221 166c23-19 52-21 73-8 21 13 30 40 20 63-8 20-29 32-51 30-22-2-41-17-48-38-7-18-3-35 6-47Z" />
        <path className="art-stroke art-stroke--fine" pathLength="1" d="M324 228c18-8 35-7 48 2m-149 7c-17 7-30 19-35 35m72 70c16 11 32 14 51 10" />
        <circle className="art-dot" cx="313" cy="198" r="4" />
      </svg>
    );
  }

  if (variant === "orbit") {
    return (
      <svg className="line-art line-art--orbit" viewBox="0 0 560 480" role="img" aria-label="Orbit one-line artwork">
        <ellipse className="art-stroke art-stroke--main" pathLength="1" cx="280" cy="240" rx="191" ry="105" />
        <ellipse className="art-stroke art-stroke--secondary" pathLength="1" cx="280" cy="240" rx="105" ry="191" transform="rotate(32 280 240)" />
        <path className="art-stroke art-stroke--main" pathLength="1" d="M107 222c44-57 101-87 173-87 72 0 130 30 174 88-43 58-101 87-174 87-72 0-130-29-173-88Z" />
        <circle className="art-stroke art-stroke--fine" pathLength="1" cx="280" cy="240" r="49" />
        <circle className="art-dot art-dot--large" cx="405" cy="158" r="7" />
        <circle className="art-dot" cx="154" cy="329" r="4" />
      </svg>
    );
  }

  if (variant === "ripple") {
    return (
      <svg className="line-art line-art--ripple" viewBox="0 0 560 480" role="img" aria-label="Ripple one-line artwork">
        <path className="art-stroke art-stroke--main" pathLength="1" d="M78 201c61-47 126-47 187 0s126 47 187 0 126-47 187 0" />
        <path className="art-stroke art-stroke--secondary" pathLength="1" d="M78 241c61-47 126-47 187 0s126 47 187 0 126-47 187 0" />
        <path className="art-stroke art-stroke--main" pathLength="1" d="M78 281c61-47 126-47 187 0s126 47 187 0 126-47 187 0" />
        <path className="art-stroke art-stroke--fine" pathLength="1" d="M78 321c61-47 126-47 187 0s126 47 187 0 126-47 187 0" />
        <path className="art-stroke art-stroke--fine" pathLength="1" d="M171 153c10 22 19 39 29 51m166-51c-10 22-19 39-29 51" />
        <circle className="art-dot art-dot--large" cx="280" cy="239" r="7" />
      </svg>
    );
  }

  return (
    <svg className="line-art line-art--bloom" viewBox="0 0 560 480" role="img" aria-label="Bloom one-line artwork">
      <path className="art-stroke art-stroke--main" pathLength="1" d="M280 394c-4-87-3-165 0-234 4-80 43-119 94-118 49 1 67 45 40 76-23 27-65 35-103 42 50-4 107 5 121 42 13 36-25 67-66 65-39-2-76-27-87-67 8 52 9 113 1 194Z" />
      <path className="art-stroke art-stroke--secondary" pathLength="1" d="M280 394c4-87 3-165 0-234-4-80-43-119-94-118-49 1-67 45-40 76 23 27 65 35 103 42-50-4-107 5-121 42-13 36 25 67 66 65 39-2 76-27 87-67" />
      <path className="art-stroke art-stroke--fine" pathLength="1" d="M280 160c-24 23-37 48-40 76m40-76c24 23 37 48 40 76M280 229c-25 17-42 37-51 59m51-59c25 17 42 37 51 59" />
      <circle className="art-dot" cx="280" cy="102" r="4" />
    </svg>
  );
}

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const activeArtwork = artworks[activeIndex];

  const selectArtwork = (index: number) => {
    setActiveIndex(index);
    setPressedKey(artworks[index].key);
    window.setTimeout(() => setPressedKey(null), 260);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      const index = Number(event.key) - 1;
      if (index >= 0 && index < artworks.length) {
        selectArtwork(index);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="press-play-shell">
      <header className="topbar">
        <button className="wordmark" type="button" onClick={() => selectArtwork(0)} aria-label="Return to first work">
          <span>PRESS</span> PLAY<span className="wordmark-period">.</span>
        </button>
        <div className="topbar-center" aria-hidden="true">
          <span className="topbar-rule" />
          <span>AN INTERACTIVE ART INDEX</span>
          <span className="topbar-rule" />
        </div>
        <div className="topbar-right">
          <button className={`about-toggle ${isAboutOpen ? "is-open" : ""}`} type="button" onClick={() => setIsAboutOpen((open) => !open)}>
            {isAboutOpen ? "CLOSE" : "ABOUT"}
          </button>
          <span className="edition">SEOUL — 2026</span>
        </div>
      </header>

      {isAboutOpen && (
        <aside className="about-panel" aria-label="About Press Play">
          <p className="eyebrow">THE IDEA</p>
          <p>Press Play is a small archive of moving lines. Choose a key, give it a moment, and let the work play.</p>
          <p className="about-note">Use the keys 1—4 or click below.</p>
        </aside>
      )}

      <main className="gallery-main">
        <div className="gallery-index" aria-hidden="true">
          <span className="vertical-label">SELECTED WORK / 04</span>
          <span className="index-line" />
          <span className="index-count">{activeArtwork.number}</span>
        </div>

        <section className="work-copy" aria-live="polite">
          <div className="copy-topline">
            <span className="eyebrow">WORK {activeArtwork.number} / 04</span>
            <span className="copy-status"><span className="status-dot" /> PLAYING</span>
          </div>
          <div className="title-wrap" key={activeArtwork.number}>
            <p className="work-kicker">{activeArtwork.kicker}</p>
            <h1>{activeArtwork.title}</h1>
          </div>
          <div className="copy-bottom">
            <p className="work-description">{activeArtwork.description}</p>
            <div className="work-meta">
              <span>{activeArtwork.detail}</span>
              <span>{activeArtwork.year}</span>
            </div>
          </div>
        </section>

        <section className="art-stage" aria-label={`${activeArtwork.title} artwork`}>
          <div className="stage-corner stage-corner--tl">ONE-LINE / MOTION</div>
          <div className="stage-corner stage-corner--br">PRESS TO PLAY</div>
          <div className="art-frame" key={activeArtwork.variant}>
            <OneLineArt variant={activeArtwork.variant} />
          </div>
          <div className="stage-mark" aria-hidden="true">PP<span>01—04</span></div>
        </section>
      </main>

      <footer className="key-dock">
        <div className="dock-intro">
          <p className="eyebrow">CHOOSE A PIECE</p>
          <p className="dock-instruction">Press a key<br className="desktop-break" /> to play.</p>
        </div>
        <div className="piano-keys" role="group" aria-label="Choose a piece">
          {artworks.map((artwork, index) => {
            const isActive = index === activeIndex;
            const isPressed = pressedKey === artwork.key;
            return (
              <button
                className={`piano-key ${isActive ? "is-active" : ""} ${isPressed ? "is-pressed" : ""}`}
                key={artwork.key}
                type="button"
                onClick={() => selectArtwork(index)}
                aria-pressed={isActive}
                aria-label={`Play ${artwork.title}, key ${artwork.key}`}
              >
                <span className="key-cap" />
                <span className="key-number">KEY {artwork.key}</span>
                <span className="key-name">{artwork.title}</span>
                <span className="key-arrow">↗</span>
              </button>
            );
          })}
        </div>
        <div className="dock-side-note" aria-hidden="true">
          <span>01</span><span className="dock-side-line" /><span>04</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
