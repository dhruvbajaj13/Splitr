"use client";
  import { useState, useEffect, useRef, useCallback } from "react";

  /**
   * ScrollToTop (Enhanced)
   * - Shows a floating button after the user scrolls past a threshold
   * - Smoothly scrolls to the top on click
   * - Eye-catching visuals:
   *   • Subtle floating (bobbing) motion
   *   • Pulsing glow backdrop
   *   • Circular progress ring based on scroll position (now with glow + cap dot)
   * - Respects reduced motion preferences
   *
   * Props:
   * - threshold?: number (pixels to scroll before showing the button, default 300)
   */
  export default function ScrollToTop({ threshold = 300 }) {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [focused, setFocused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [progress, setProgress] = useState(0); // 0..1 scroll progress
    const rafIdRef = useRef(null);

    // Respect user's reduced motion preference
    useEffect(() => {
      if (typeof window === "undefined" || !window.matchMedia) return;
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const update = () => setReducedMotion(!!mq.matches);
      update();
      if (mq.addEventListener) mq.addEventListener("change", update);
      else mq.addListener(update);
      return () => {
        if (mq.removeEventListener) mq.removeEventListener("change", update);
        else mq.removeListener(update);
      };
    }, []);

    // Throttled (rAF) + passive scroll listener for smoother performance
    useEffect(() => {
      const onScroll = () => {
        if (rafIdRef.current != null) return;
        rafIdRef.current = window.requestAnimationFrame(() => {
          const scrollTop =
            window.scrollY || document.documentElement.scrollTop || 0;
          const maxScroll =
            (document.documentElement.scrollHeight || 0) -
            (window.innerHeight || 0);
          const nextProgress =
            maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;

          const shouldShow = scrollTop > threshold;
          setVisible((prev) => (prev !== shouldShow ? shouldShow : prev));

          // Update progress only if changed by a small epsilon to reduce re-renders
          setProgress((prev) =>
            Math.abs(prev - nextProgress) > 0.003 ? nextProgress : prev
          );

          rafIdRef.current = null;
        });
      };

      // Initialize on mount
      onScroll();

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (rafIdRef.current != null) {
          window.cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      };
    }, [threshold]);

    const scrollToTop = useCallback(() => {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }, [reducedMotion]);

    // Animation durations adapt to reduced motion
    const transitionDuration = reducedMotion ? "0ms" : "250ms";

    // Wrapper handles the fade/translate and pointer-events
    const wrapperStyle = {
      position: "fixed",
      bottom: "calc(env(safe-area-inset-bottom, 0px) + 32px)",
      right: "calc(env(safe-area-inset-right, 0px) + 32px)",
      zIndex: 9999,
      transition: `opacity ${transitionDuration} ease, transform ${transitionDuration} ease`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(8px)",
      pointerEvents: visible ? "auto" : "none",
    };

    // Button visual styling
    const baseShadow =
      "0 12px 24px rgba(17,24,39,0.28), 0 4px 10px rgba(17,24,39,0.18)";
    const focusRing = "0 0 0 4px rgba(99,102,241,0.45)";
    const hoverScale = hovered ? 1.07 : 1;
    const activeScale = pressed ? 0.98 : 1;

    const buttonStyle = {
      height: "52px",
      width: "52px",
      borderRadius: "9999px",
      border: "1px solid rgba(255,255,255,0.22)",
      background: hovered
        ? "linear-gradient(135deg, #6d28d9 0%, #2563eb 50%, #06b6d4 100%)"
        : "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #0ea5e9 100%)",
      color: "#fff",
      boxShadow: focused ? focusRing : baseShadow,
      outline: "none",
      cursor: "pointer",
      display: "grid",
      placeItems: "center",
      transform: `scale(${(hoverScale * activeScale).toFixed(3)})`,
      transition: reducedMotion
        ? "none"
        : "transform 180ms ease, box-shadow 160ms ease, background 240ms ease",
      WebkitTapHighlightColor: "transparent",
      // Optional subtle glassiness:
      backdropFilter: "blur(6px)",
      // Ensure smooth edges on some displays:
      willChange: "transform",
    };

    // Icon styling
    const iconStyle = {
      display: "block",
      width: "22px",
      height: "22px",
      filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.25))",
    };

    // Circular progress ring metrics
    const RING_SIZE = 64;
    const RING_STROKE = 4;
    const R = 28; // radius for ring visuals
    const CENTER = 32;
    const TAU = Math.PI * 2;
    const CIRC = 2 * Math.PI * R;
    const dashArray = CIRC.toFixed(3);
    const dashOffset = ((1 - progress) * CIRC).toFixed(3);

    // Moving "cap" dot position (start at top, move clockwise with progress)
    const capAngle = -Math.PI / 2 + progress * TAU;
    const capX = CENTER + R * Math.cos(capAngle);
    const capY = CENTER + R * Math.sin(capAngle);

    return (
      <div style={wrapperStyle} aria-hidden={!visible}>
        {/* Local styles for animations and layout */}
        <style>
          {`
            .stt-container {
              position: relative;
              width: ${RING_SIZE}px;
              height: ${RING_SIZE}px;
            }

            .stt-ring, .stt-glow {
              position: absolute;
              inset: 0;
              pointer-events: none;
            }

            .stt-ring {
              width: ${RING_SIZE}px;
              height: ${RING_SIZE}px;
              transform: rotate(-90deg);
            }

            .stt-glow {
              /* Eye-catching aurora glow behind button */
              background:
                radial-gradient(60% 60% at 50% 50%, rgba(99,102,241,0.45) 0%, rgba(99,102,241,0) 60%),
                radial-gradient(45% 45% at 70% 30%, rgba(14,165,233,0.50) 0%, rgba(14,165,233,0) 60%),
                radial-gradient(50% 50% at 30% 70%, rgba(124,58,237,0.50) 0%, rgba(124,58,237,0) 60%);
              filter: blur(12px);
              opacity: 0.9;
              border-radius: 9999px;
              will-change: transform, opacity;
              animation: pulseGlow 3s ease-in-out infinite;
            }

            .stt-float {
              will-change: transform;
              animation: floatY 3.4s ease-in-out infinite;
            }

            /* Reduce motion support: disable animations */
            .stt-reduced .stt-float,
            .stt-reduced .stt-glow {
              animation: none !important;
            }

            @keyframes floatY {
              0%   { transform: translateY(0px); }
              50%  { transform: translateY(-4px); }
              100% { transform: translateY(0px); }
            }

            @keyframes pulseGlow {
              0%   { transform: scale(0.98); opacity: 0.7; }
              50%  { transform: scale(1.05); opacity: 1; }
              100% { transform: scale(0.98); opacity: 0.7; }
            }
          `}
        </style>

        <div className={`stt-container ${reducedMotion ? "stt-reduced" : ""}`}>
          {/* Pulsing aurora glow backdrop */}
          <div className="stt-glow" aria-hidden="true" />

          {/* Circular scroll progress ring */}
          <svg className="stt-ring" viewBox="0 0 64 64" aria-hidden="true">
            <defs>
              <linearGradient id="sttRingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <radialGradient id="sttCapGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="60%" stopColor="#60a5fa" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.85" />
              </radialGradient>
            </defs>

            {/* Track */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={R}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={RING_STROKE}
            />

            {/* Progress halo (soft glow behind the main progress) */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={R}
              fill="none"
              stroke="url(#sttRingGradient)"
              strokeWidth={RING_STROKE + 6}
              strokeLinecap="round"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              opacity="0.35"
              style={{
                transition: reducedMotion ? "none" : "stroke-dashoffset 160ms linear",
                filter: "blur(1.2px)",
              }}
            />

            {/* Progress */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={R}
              fill="none"
              stroke="url(#sttRingGradient)"
              strokeWidth={RING_STROKE}
              strokeLinecap="round"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              style={{ transition: reducedMotion ? "none" : "stroke-dashoffset 160ms linear" }}
            />

            {/* Moving cap dot at the leading edge */}
            <g>
              {/* Outer glow for the cap */}
              <circle
                cx={capX}
                cy={capY}
                r={5.5}
                fill="url(#sttCapGradient)"
                opacity="0.35"
                style={{ filter: "blur(3px)" }}
              />
              {/* Inner bright cap */}
              <circle
                cx={capX}
                cy={capY}
                r={3.6}
                fill="url(#sttCapGradient)"
              />
            </g>
          </svg>

          {/* Floating wrapper so we don't conflict with button's scale transform */}
          <div className="stt-float">
            <button
              type="button"
              onClick={scrollToTop}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => {
                setHovered(false);
                setPressed(false);
              }}
              onMouseDown={() => setPressed(true)}
              onMouseUp={() => setPressed(false)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-label="Scroll to top"
              title="Scroll to top"
              style={buttonStyle}
            >
              {/* Inline SVG for crisp, scalable icon */}
              <svg
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                focusable="false"
                style={iconStyle}
              >
                <path
                  d="M12 5l-6 6m6-6l6 6M12 5v14"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.95"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }