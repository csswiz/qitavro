/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface NavLinkItem {
  name: string;
  href: string;
  external?: boolean;
}

export interface FluidHeroNavbarProps {
  /** Brand text to display during intro splash and in navbar. Defaults to "QITAVRO" */
  brandName?: string;
  /** Optional custom logo node to override the default text wordmark */
  brandLogo?: React.ReactNode;
  /** Optional custom logo URL for the intro emblem (e.g. '/logo.svg') */
  brandLogoUrl?: string;
  /** Color theme palette: 'burgundy' | 'default'. Defaults to 'burgundy' */
  theme?: 'burgundy' | 'default';
  /** Optional background video URL if video hero is preferred */
  videoSrc?: string;
  /** High-resolution hero background image URL */
  heroImage?: string;
  /** First line of hero headline. Defaults to "Wlcm To Qitavro" */
  headlineFirst?: string;
  /** Second line of hero headline. Defaults to "A World Between the Covers." */
  headlineSecond?: string;
  /** Optional kicker tag/subtitle above headline */
  headlineKicker?: string;
  /** Call to action button label in navbar */
  ctaText?: string;
  /** Call to action link */
  ctaHref?: string;
  /** Navigation links array */
  navLinks?: NavLinkItem[];
  /** Whether to play the fluid.glass intro splash animation. Defaults to true */
  showIntroAnimation?: boolean;
  /** Whether to render the floating responsive navbar. Defaults to true */
  showNavbar?: boolean;
  /** Primary accent color (hex, rgb, hsl). Defaults to #9B2C46 (Burgundy) */
  accentColor?: string;
  /** Optional custom class name for the outermost container */
  className?: string;
  /** Callback fired when the intro animation completes */
  onIntroComplete?: () => void;
  /** Callback fired when the hero entrance animation finishes */
  onHeroComplete?: () => void;
}

// ============================================================================
// Self-Contained Vector Icons & Emblems
// ============================================================================

/** Full symmetrical 5-pointed architectural star emblem */
export function StarLogo({
  className = '',
  style = {},
  fill = 'currentColor',
  size = 48,
}: {
  className?: string;
  style?: React.CSSProperties;
  fill?: string;
  size?: number | string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      width={size}
      height={size}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon points="12,1.75 15.22,8.27 22.42,9.32 17.21,14.4 18.44,21.57 12,18.18 5.56,21.57 6.79,14.4 1.58,9.32 8.78,8.27" />
    </svg>
  );
}

/** Geometric gable roofline triangle mark (▲ dot symbol in aroof wordmark) */
export function RoofMark({
  className = '',
  style = {},
  fill = 'currentColor',
  width = '0.12em',
  height = '0.08em',
}: {
  className?: string;
  style?: React.CSSProperties;
  fill?: string;
  width?: number | string;
  height?: number | string;
}) {
  return (
    <svg
      viewBox="0 0 140 60"
      width={width}
      height={height}
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'baseline',
        ...style,
      }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon points="70,4 136,56 4,56" fill={fill} />
    </svg>
  );
}

function SpeakerMutedIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function SpeakerActiveIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

// ============================================================================
// Brand Wordmark Renderer
// ============================================================================

export function BrandWordmark({
  brandName = 'QITAVRO',
  accentColor = '#9B2C46',
  isScrolled = false,
  theme = 'burgundy',
}: {
  brandName?: string;
  accentColor?: string;
  isScrolled?: boolean;
  theme?: 'burgundy' | 'default';
}) {
  const isAroof = brandName.toLowerCase() === 'aroof';
  const isBurgundy = theme === 'burgundy';

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 select-none group">
      {/* Official QITAVRO Emblem Logo */}
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[4px] p-0.5 bg-[#181015] border border-burgundy/40 shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
        <img
          src="/logo.svg"
          alt={`${brandName} Logo`}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Brand text */}
      <div className="flex flex-col">
        <div
          className={`flex items-baseline font-serif font-bold text-lg sm:text-xl tracking-[0.18em] transition-colors duration-300 ${
            isScrolled
              ? isBurgundy
                ? 'text-ivory-light group-hover:text-rose-light'
                : 'text-neutral-900'
              : 'text-white'
          }`}
          style={{
            fontFamily: isBurgundy
              ? "var(--font-serif, 'Cinzel', serif)"
              : "var(--font-aeonik-pro, system-ui, -apple-system, sans-serif)",
          }}
        >
          {isAroof ? (
            <>
              <span>a</span>
              <RoofMark
                fill={isScrolled ? accentColor : '#ffffff'}
                width="0.16em"
                height="0.1em"
                style={{
                  marginLeft: '0.08em',
                  marginRight: '0.04em',
                  verticalAlign: 'baseline',
                }}
              />
              <span>roof</span>
            </>
          ) : (
            <span>{brandName}</span>
          )}
        </div>
        {isBurgundy && (
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.24em] font-sans text-burgundy-rose font-medium mt-0.5 leading-none">
            Literary Bookstore
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Subcomponent 1: fluid.glass Intro Animation (Burgundy Palette + QITAVRO Logo)
// ============================================================================

interface IntroOverlayProps {
  brandName: string;
  brandLogo?: React.ReactNode;
  brandLogoUrl?: string;
  accentColor: string;
  theme?: 'burgundy' | 'default';
  onComplete: () => void;
}

function IntroOverlay({
  brandName,
  brandLogo,
  brandLogoUrl,
  accentColor,
  theme = 'burgundy',
  onComplete,
}: IntroOverlayProps) {
  const isBurgundy = theme === 'burgundy';
  const [stage, setStage] = useState(1);
  const [unmounted, setUnmounted] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const skipIntro = useCallback(() => {
    setStage(4);
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('intro-animation-complete'));
    }
    setTimeout(() => {
      setStage(5);
      setUnmounted(true);
    }, 350);
  }, []);

  useEffect(() => {
    // Ultra-snappy intro animation (1.8s total vs previous 3.4s)
    const t1 = setTimeout(() => setStage(2), 50);
    const t2 = setTimeout(() => setStage(3), 500);
    const t3 = setTimeout(() => {
      setStage(4);
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('intro-animation-complete'));
      }
    }, 1200);
    const t4 = setTimeout(() => {
      setStage(5);
      setUnmounted(true);
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (unmounted) return null;

  const isAnimating = stage >= 2;
  const isRevealed = stage >= 3;
  const isFading = stage >= 4;

  const isAroof = brandName.toLowerCase() === 'aroof';
  const letters = isAroof ? ['a', 'r', 'o', 'o', 'f'] : brandName.split('');

  return (
    <div
      onClick={skipIntro}
      title="Click anywhere to enter bookstore immediately"
      className={`fixed inset-0 z-[99999] cursor-pointer flex items-center justify-center overflow-hidden px-4 select-none transition-all duration-[800ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
        isBurgundy ? 'bg-[#0E050A] text-ivory-light' : 'bg-white text-neutral-900'
      } ${
        isFading ? 'opacity-0 scale-[1.02] invisible pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
      }`}
      aria-hidden={isFading}
    >
      {/* Ambient background glow if burgundy theme */}
      {isBurgundy && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,44,70,0.25),transparent_70%)] pointer-events-none" />
      )}

      <div
        className={`flex items-center justify-center relative h-12 sm:h-16 md:h-20 max-w-full transition-all duration-[1050ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform ${
          isRevealed ? 'translate-x-0' : 'translate-x-10 sm:translate-x-16 md:translate-x-20'
        } ${isFading ? '-translate-y-[20vh] sm:-translate-y-[28vh] opacity-0 duration-[1100ms]' : ''}`}
      >
        {/* Animated Full Star Emblem or QITAVRO Logo */}
        <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0">
          <div
            className={`w-full h-full flex items-center justify-center will-change-transform ${
              isAnimating ? 'fluid-star-intro' : 'scale-[0.12] opacity-0'
            }`}
          >
            {brandLogoUrl ? (
              <img
                src={brandLogoUrl}
                alt="Brand Logo"
                className="w-full h-full object-contain drop-shadow-[0_4px_16px_rgba(155,44,70,0.6)]"
              />
            ) : brandLogo ? (
              brandLogo
            ) : (
              <StarLogo fill={accentColor} size="100%" />
            )}
          </div>
        </div>

        {/* Wordmark characters revealed one-by-one */}
        <div className="flex items-center ml-2.5 sm:ml-4 h-12 sm:h-16 md:h-20 overflow-hidden">
          {letters.map((char, index) => (
            <span
              key={index}
              className="inline-block overflow-hidden h-10 sm:h-14 md:h-16 leading-[2.5rem] sm:leading-[3.5rem] md:leading-[4rem] align-middle"
            >
              <span
                className={`inline-block font-serif font-bold text-[clamp(1.75rem,5.5vw,3.25rem)] tracking-[0.16em] transition-transform duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                  isBurgundy ? 'text-[#F5EFEB]' : 'text-neutral-900'
                } ${
                  isRevealed ? 'translate-y-0' : 'translate-y-[135%]'
                }`}
                style={{
                  transitionDelay: `${120 + index * 60}ms`,
                  fontFamily: isBurgundy
                    ? "var(--font-serif, 'Cinzel', serif)"
                    : "var(--font-aeonik-pro, system-ui, -apple-system, sans-serif)",
                }}
              >
                {char === ' ' ? '\u00A0' : char}
                {isAroof && index === 0 && (
                  <RoofMark
                    fill="currentColor"
                    width="0.12em"
                    height="0.08em"
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'baseline',
                      marginLeft: '0.08em',
                      marginRight: '0.01em',
                    }}
                  />
                )}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Subcomponent 2: Floating Responsive Navbar
// ============================================================================

interface NavbarProps {
  brandName: string;
  brandLogo?: React.ReactNode;
  navLinks: NavLinkItem[];
  ctaText: string;
  ctaHref: string;
  visible: boolean;
  accentColor: string;
  theme?: 'burgundy' | 'default';
}

function FloatingNavbar({
  brandName,
  brandLogo,
  navLinks,
  ctaText,
  ctaHref,
  visible,
  accentColor,
  theme = 'burgundy',
}: NavbarProps) {
  const navigate = useNavigate();
  const isBurgundy = theme === 'burgundy';
  const [activeItem, setActiveItem] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLinkItem) => {
    setActiveItem(link.name);
    if (link.external) {
      // Allow native navigation for external targets (e.g., WhatsApp)
      return;
    }
    if (link.href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(link.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    e.preventDefault();
    navigate(link.href);
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ctaHref.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(ctaHref);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      e.preventDefault();
      navigate(ctaHref);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1002] px-4 sm:px-8 xl:px-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-6 pointer-events-none'
      } ${
        scrolled
          ? isBurgundy
            ? 'bg-[#12080E]/95 backdrop-blur-md border-b border-burgundy/40 shadow-[0_4px_24px_rgba(0,0,0,0.8)] py-2.5 sm:py-3.5 text-ivory-light'
            : 'bg-white/95 backdrop-blur-md border-b border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06)] py-2.5 sm:py-3.5 text-neutral-900'
          : 'bg-transparent border-b border-transparent py-3 sm:py-5 text-white'
      }`}
    >
      {/* Brand Logo */}
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex items-center gap-2 outline-none select-none"
        aria-label={`${brandName} Home`}
      >
        {brandLogo ? (
          brandLogo
        ) : (
          <BrandWordmark
            brandName={brandName}
            accentColor={accentColor}
            isScrolled={scrolled}
            theme={theme}
          />
        )}
      </a>

      {/* Desktop Nav Links */}
      <nav className="hidden lg:flex items-center gap-5 xl:gap-8 list-none m-0 p-0 ml-auto mr-5 xl:mr-8">
        {navLinks.map((link) => {
          const isActive = activeItem === link.name;
          return (
            <div key={link.name} className="relative">
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={`text-xs xl:text-sm tracking-wide font-medium transition-all duration-300 py-1 inline-block ${
                  scrolled
                    ? isBurgundy
                      ? isActive
                        ? 'text-rose-light font-semibold'
                        : 'text-ivory/80 hover:text-rose-light'
                      : isActive
                      ? 'text-neutral-900 font-semibold'
                      : 'text-neutral-600 hover:text-neutral-950'
                    : isActive
                    ? 'text-white font-semibold'
                    : 'text-white/80 hover:text-white'
                }`}
                style={{
                  fontFamily: isBurgundy
                    ? "var(--font-serif, 'Cinzel', serif)"
                    : "var(--font-aeonik-pro, system-ui, -apple-system, sans-serif)",
                }}
              >
                {link.name}
              </a>
            </div>
          );
        })}
      </nav>

      {/* CTA Button (Clean & accessible on both Desktop and Mobile UI) */}
      <div className="flex items-center">
        <a
          href={ctaHref}
          onClick={handleCtaClick}
          className={`px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow hover:scale-105 active:scale-95 ${
            isBurgundy
              ? 'bg-burgundy hover:bg-burgundy-light text-ivory-light border border-burgundy-rose/40 shadow-[0_4px_16px_rgba(155,44,70,0.4)]'
              : scrolled
              ? 'bg-neutral-900 text-white hover:bg-neutral-800'
              : 'bg-white/90 backdrop-blur-md text-neutral-900 hover:bg-white'
          }`}
        >
          {ctaText}
        </a>
      </div>
    </header>
  );
}

// ============================================================================
// Subcomponent 3: Full Screen Fluid Hero Banner (Fully Responsive)
// ============================================================================

interface HeroBannerProps {
  stage: 'idle' | 'animating' | 'done';
  videoSrc?: string;
  heroImage: string;
  headlineFirst: string;
  headlineSecond: string;
  headlineKicker?: string;
  theme?: 'burgundy' | 'default';
}

function HeroBannerSection({
  stage,
  videoSrc,
  heroImage,
  headlineFirst,
  headlineSecond,
  headlineKicker,
  theme = 'burgundy',
}: HeroBannerProps) {
  const isBurgundy = theme === 'burgundy';
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleAudio = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [stage]);

  const frameClass =
    stage === 'animating'
      ? 'fluid-hero-animating'
      : stage === 'done'
      ? 'translate-y-0 scale-100 opacity-100'
      : 'translate-y-[105vh] scale-[0.78] opacity-0';

  const shouldRenderVideo = Boolean(videoSrc && !videoError);

  return (
    <section className="relative w-full h-[100dvh] min-h-[500px] overflow-hidden bg-[#0E050A] flex items-center justify-center">
      <div
        className={`relative w-full h-full overflow-hidden origin-center will-change-transform ${frameClass}`}
      >
        {/* Background Visual Layer with Counter-Scale */}
        <div
          className={`absolute inset-0 w-full h-full overflow-hidden will-change-transform ${
            stage === 'animating' ? 'fluid-media-counter-scale' : 'scale-100'
          }`}
        >
          {shouldRenderVideo ? (
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              preload="auto"
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <img
              src={heroImage}
              alt="QITAVRO Classical Library Sanctuary"
              className="w-full h-full object-cover object-center select-none"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          )}

          {/* Luxury dark gradient tint overlay */}
          <div className="absolute inset-0 bg-black/45 pointer-events-none z-[2]" />
          {isBurgundy && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E050A] via-black/30 to-black/60 pointer-events-none z-[2]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgba(155,44,70,0.25),transparent)] pointer-events-none z-[2]" />
            </>
          )}
        </div>

        {/* Center Architectural Headline */}
        <div className="absolute inset-0 z-[3] flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 lg:px-12 pointer-events-none max-w-5xl lg:max-w-7xl mx-auto">
          {headlineKicker && (
            <div className="overflow-hidden mb-2 sm:mb-3">
              <span
                className={`inline-block text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold ${
                  isBurgundy ? 'text-rose-light' : 'text-white/80'
                } transition-transform duration-700 ease-out will-change-transform ${
                  stage !== 'idle' ? 'translate-y-0' : 'translate-y-full'
                }`}
                style={{ transitionDelay: '0.4s' }}
              >
                {headlineKicker}
              </span>
            </div>
          )}

          <div className="overflow-hidden block max-w-full">
            <h1
              className={`text-white font-serif font-bold text-[clamp(1.75rem,4.5vw,4.75rem)] lg:text-[clamp(2.4rem,3.8vw,4.5rem)] tracking-tight leading-[1.15] sm:leading-[1.08] m-0 max-w-[92vw] sm:max-w-4xl lg:max-w-none break-words lg:break-normal lg:whitespace-nowrap transition-transform duration-[1050ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                stage !== 'idle' ? 'translate-y-0' : 'translate-y-[120%]'
              }`}
              style={{
                transitionDelay: '0.55s',
                fontFamily: isBurgundy
                  ? "var(--font-serif, 'Cinzel', serif)"
                  : "var(--font-aeonik-pro, system-ui, -apple-system, sans-serif)",
              }}
            >
              {headlineFirst}
            </h1>
          </div>

          <div className="overflow-hidden block max-w-full mt-2 sm:mt-3">
            <p
              className={`text-ivory-light/95 font-serif italic text-[clamp(1.1rem,2.8vw,2.2rem)] lg:text-[clamp(1.3rem,2.2vw,2rem)] tracking-wide leading-[1.25] sm:leading-[1.18] m-0 max-w-[92vw] sm:max-w-4xl lg:max-w-none break-words transition-transform duration-[1050ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                stage !== 'idle' ? 'translate-y-0' : 'translate-y-[120%]'
              }`}
              style={{
                transitionDelay: '0.72s',
                fontFamily: isBurgundy
                  ? "var(--font-serif, 'Cinzel', serif)"
                  : "var(--font-aeonik-pro, system-ui, -apple-system, sans-serif)",
              }}
            >
              {headlineSecond}
            </p>
          </div>
        </div>

        {/* Audio Mute/Unmute Control (only rendered if video is active) */}
        {shouldRenderVideo && (
          <button
            type="button"
            onClick={toggleAudio}
            className={`absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/45 backdrop-blur-md border border-white/25 text-white flex items-center justify-center cursor-pointer outline-none transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-black/70 shadow-lg ${
              stage !== 'idle' ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none'
            }`}
            aria-label={isMuted ? 'Turn audio on' : 'Turn audio off'}
            title={isMuted ? 'Turn audio on' : 'Turn audio off'}
          >
            {isMuted ? <SpeakerMutedIcon /> : <SpeakerActiveIcon />}
          </button>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// Main Combined Component
// ============================================================================

export default function FluidHeroNavbar({
  brandName = 'QITAVRO',
  brandLogo,
  brandLogoUrl = '/logo.svg',
  theme = 'burgundy',
  videoSrc,
  heroImage = '/images/hero/hero-library-aisle.jpg',
  headlineFirst = 'Wlcm To Qitavro',
  headlineSecond = 'A World Between the Covers.',
  headlineKicker = 'The Literary Sanctuary',
  ctaText = 'Explore Store',
  ctaHref = '#explore-shelf',
  navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Catalogue', href: '/shop' },
    { name: 'Sell Book (₹99)', href: '/sell' },
    { name: 'About', href: '/about' },
    { name: 'WhatsApp Desk', href: 'https://wa.me/917838354944', external: true },
  ],
  showIntroAnimation = true,
  showNavbar = true,
  accentColor = '#9B2C46',
  className = '',
  onIntroComplete,
  onHeroComplete,
}: FluidHeroNavbarProps) {
  // Hero stages: 'idle' -> 'animating' -> 'done'
  const [stage, setStage] = useState<'idle' | 'animating' | 'done'>(
    showIntroAnimation ? 'idle' : 'done'
  );
  const [navbarVisible, setNavbarVisible] = useState(!showIntroAnimation);

  const startHeroAnimation = useCallback(() => {
    setStage('animating');

    setTimeout(() => {
      setStage('done');
      setNavbarVisible(true);
      if (onHeroComplete) onHeroComplete();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('hero-animation-complete'));
      }
    }, 1350);
  }, [onHeroComplete]);

  const handleIntroComplete = useCallback(() => {
    if (onIntroComplete) onIntroComplete();
    startHeroAnimation();
  }, [onIntroComplete, startHeroAnimation]);

  useEffect(() => {
    if (!showIntroAnimation) return;

    // Safety fallback timer if intro completes or is skipped
    const fallbackTimer = setTimeout(() => {
      startHeroAnimation();
    }, 2800);

    return () => clearTimeout(fallbackTimer);
  }, [showIntroAnimation, startHeroAnimation]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Self-contained CSS Animation Keyframes */}
      <style>{`
        @keyframes fluidHeroEntrance {
          0% {
            transform: translateY(105vh) scale(0.78);
            opacity: 0.4;
            border-radius: 14px;
          }
          38% {
            transform: translateY(0) scale(0.8);
            opacity: 1;
            border-radius: 8px;
          }
          50% {
            transform: translateY(0) scale(0.82);
            border-radius: 6px;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
            border-radius: 0px;
          }
        }

        @keyframes fluidMediaCounterScale {
          0% {
            transform: scale(1.18);
          }
          38% {
            transform: scale(1.12);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes starIntro {
          0% {
            transform: scale(0.12) rotate(-160deg);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          75% {
            transform: scale(1.04) rotate(3deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .fluid-hero-animating {
          animation: fluidHeroEntrance 1.35s cubic-bezier(0.65, 0, 0.35, 1) forwards !important;
        }

        .fluid-media-counter-scale {
          animation: fluidMediaCounterScale 1.35s cubic-bezier(0.65, 0, 0.35, 1) forwards !important;
        }

        .fluid-star-intro {
          animation: starIntro 1.25s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
          transform-origin: center center;
        }
      `}</style>

      {/* Intro Splash Animation (Burgundy Palette + QITAVRO Logo) */}
      {showIntroAnimation && (
        <IntroOverlay
          brandName={brandName}
          brandLogo={brandLogo}
          brandLogoUrl={brandLogoUrl}
          accentColor={accentColor}
          theme={theme}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Floating Dynamic Navbar */}
      {showNavbar && (
        <FloatingNavbar
          brandName={brandName}
          brandLogo={brandLogo}
          navLinks={navLinks}
          ctaText={ctaText}
          ctaHref={ctaHref}
          visible={navbarVisible}
          accentColor={accentColor}
          theme={theme}
        />
      )}

      {/* Hero Banner with Counter-Scale Effect and Pexels/Library Background */}
      <HeroBannerSection
        stage={stage}
        videoSrc={videoSrc}
        heroImage={heroImage}
        headlineFirst={headlineFirst}
        headlineSecond={headlineSecond}
        headlineKicker={headlineKicker}
        theme={theme}
      />
    </div>
  );
}
