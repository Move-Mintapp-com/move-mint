import * as React from "react";
import { cn } from "./utils";

// SVG displacement maps (inline base64 data URLs for standard mode)
const DISPLACEMENT_MAP = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCADwAPADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlbaWmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9k=";

interface GlassFilterProps {
  id: string;
  displacementScale: number;
  aberrationIntensity: number;
}

const GlassFilter: React.FC<GlassFilterProps> = ({
  id,
  displacementScale,
  aberrationIntensity,
}) => (
  <svg
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      pointerEvents: "none"
    }}
    aria-hidden="true"
  >
    <defs>
      {/* Radial gradient for edge masking */}
      <radialGradient id={`${id}-edge-mask`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="black" stopOpacity="0" />
        <stop offset={`${Math.max(30, 80 - aberrationIntensity * 2)}%`} stopColor="black" stopOpacity="0" />
        <stop offset="100%" stopColor="white" stopOpacity="1" />
      </radialGradient>

      <filter id={id} x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
        {/* Load displacement map */}
        <feImage
          href={DISPLACEMENT_MAP}
          result="DISPLACEMENT_MAP"
          preserveAspectRatio="xMidYMid slice"
        />

        {/* Create edge mask */}
        <feColorMatrix
          in="DISPLACEMENT_MAP"
          type="matrix"
          values="0.3 0.3 0.3 0 0
                  0.3 0.3 0.3 0 0
                  0.3 0.3 0.3 0 0
                  0 0 0 1 0"
          result="EDGE_INTENSITY"
        />
        <feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">
          <feFuncA type="discrete" tableValues={`0 ${aberrationIntensity * 0.05} 1`} />
        </feComponentTransfer>

        {/* Original undisplaced center */}
        <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL" />

        {/* Red channel displacement */}
        <feDisplacementMap
          in="SourceGraphic"
          in2="DISPLACEMENT_MAP"
          scale={displacementScale * -1}
          xChannelSelector="R"
          yChannelSelector="B"
          result="RED_DISPLACED"
        />
        <feColorMatrix
          in="RED_DISPLACED"
          type="matrix"
          values="1 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 1 0"
          result="RED_CHANNEL"
        />

        {/* Green channel displacement */}
        <feDisplacementMap
          in="SourceGraphic"
          in2="DISPLACEMENT_MAP"
          scale={displacementScale * (-1 - aberrationIntensity * 0.05)}
          xChannelSelector="R"
          yChannelSelector="B"
          result="GREEN_DISPLACED"
        />
        <feColorMatrix
          in="GREEN_DISPLACED"
          type="matrix"
          values="0 0 0 0 0
                  0 1 0 0 0
                  0 0 0 0 0
                  0 0 0 1 0"
          result="GREEN_CHANNEL"
        />

        {/* Blue channel displacement */}
        <feDisplacementMap
          in="SourceGraphic"
          in2="DISPLACEMENT_MAP"
          scale={displacementScale * (-1 - aberrationIntensity * 0.1)}
          xChannelSelector="R"
          yChannelSelector="B"
          result="BLUE_DISPLACED"
        />
        <feColorMatrix
          in="BLUE_DISPLACED"
          type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 1 0 0
                  0 0 0 1 0"
          result="BLUE_CHANNEL"
        />

        {/* Combine channels with screen blend */}
        <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED" />
        <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED" />

        {/* Add blur to soften aberration */}
        <feGaussianBlur
          in="RGB_COMBINED"
          stdDeviation={Math.max(0.1, 0.5 - aberrationIntensity * 0.1)}
          result="ABERRATED_BLURRED"
        />

        {/* Apply edge mask to aberration */}
        <feComposite in="ABERRATED_BLURRED" in2="EDGE_MASK" operator="in" result="EDGE_ABERRATION" />

        {/* Create inverted mask for center */}
        <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feComposite in="CENTER_ORIGINAL" in2="INVERTED_MASK" operator="in" result="CENTER_CLEAN" />

        {/* Combine edge aberration with clean center */}
        <feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over" />
      </filter>
    </defs>
  </svg>
);

interface GlassCardProps extends React.ComponentProps<"div"> {
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  elasticity?: number;
  backgroundOpacity?: number;
}

function GlassCard({
  className,
  children,
  // ===== INTENSITY CONTROLS =====
  // Displacement: Edge warping intensity (0-150). Higher = more distortion
  displacementScale = 150,
  // Blur: Backdrop blur strength (0-1). Multiply by 32 for pixel value
  blurAmount = 1,
  // Saturation: Color vibrancy (100-250%). Higher = more vivid colors
  saturation = 250,
  // Aberration: RGB separation at edges (0-10). Higher = more chromatic effect
  aberrationIntensity = 10,
  // Elasticity: Mouse-follow strength (0-1). Higher = more movement
  elasticity = 1,
  // Background Opacity: Container transparency (0-1). 0 = fully transparent, 1 = opaque
  backgroundOpacity = 0,
  // ==============================
  ...props
}: GlassCardProps) {
  const [mouseOffset, setMouseOffset] = React.useState({ x: 0, y: 0 });
  const [isLightMode, setIsLightMode] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const filterId = React.useId();

  // Detect theme mode
  React.useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.documentElement.classList.contains('light'));
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  // Mouse tracking for reactive borders
  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setMouseOffset({
      x: ((e.clientX - centerX) / rect.width) * 100,
      y: ((e.clientY - centerY) / rect.height) * 100,
    });
  }, []);

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Detect Firefox for fallback
  const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox');

  return (
    <div
      ref={cardRef}
      data-slot="glass-card"
      className={cn(
        "relative overflow-hidden rounded-[1.25em]",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* SVG Filter */}
      {!isFirefox && (
        <GlassFilter
          id={filterId}
          displacementScale={isLightMode ? displacementScale * 0.5 : displacementScale}
          aberrationIntensity={aberrationIntensity}
        />
      )}

      {/* Light mode - flowing mint liquid layers */}
      {isLightMode && (
        <>
          {/* LIGHT MODE LIQUID INTENSITY CONTROLS */}

          {/* Base liquid layer - Center mint tint */}
          <div
            className="absolute inset-0 transition-all duration-1000 ease-out pointer-events-none"
            style={{
              // 💧 LIQUID CENTER: 0.12 = center opacity, 0.08 = mid, 0.05 = outer (0-0.3 range)
              // 🔄 FLOW SPEED: 0.15 = mouse follow sensitivity (0.1-0.5 range)
              background: `radial-gradient(ellipse at ${50 + mouseOffset.x * 0.15}% ${50 + mouseOffset.y * 0.05}%, rgba(255, 255, 255, 0.12) 0%, rgba(77, 222, 174, 0.12) 40%, rgba(255, 255, 255, 0.12) 50%, transparent 100%)`,
              borderRadius: "inherit",
            }}
          />

          {/* Secondary flowing layer - Accent spot */}
          <div
            className="absolute inset-0 transition-all duration-1000 ease-out pointer-events-none"
            style={{
              // 💧 ACCENT SPOT: 0.1 = spot intensity (0-0.2 range)
              // 🔄 FLOW SPEED: 0.2 = mouse follow sensitivity (0.1-0.5 range)
              background: `radial-gradient(circle at ${30 + mouseOffset.x * 0.2}% ${70 + mouseOffset.y * 0.2}%, rgba(0, 255, 170, 0.12) 0%, transparent 70%)`,
              borderRadius: "inherit",
            }}
          />

          {/* Edge liquid accumulation - Liquid pooling at edges */}
          <div
            className="absolute inset-0 transition-all duration-1000 ease-out pointer-events-none"
            style={{
              // 💧 EDGE LIQUID: 0.15 = top edge, 0.12 = bottom edge intensity (0-0.3 range)
              // 🔄 ROTATION: 0.5 = rotation sensitivity (0.3-1.0 range)
              background: `linear-gradient(${135 + mouseOffset.x * 0.5}deg, rgba(115, 222, 186, 0.12) 0%, transparent 30%, transparent 90%, rgba(5, 150, 104, 0.12) 100%)`,
              borderRadius: "inherit",
            }}
          />
        </>
      )}

      {/* Backdrop blur layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: isLightMode
            ? `rgba(248, 248, 248, ${backgroundOpacity})`
            : `rgba(0, 0, 0, ${backgroundOpacity})`,
          filter: isFirefox ? undefined : `url(#${filterId})`,
          backdropFilter: `blur(${isLightMode ? 24 : 4 + blurAmount * 32}px) saturate(${isLightMode ? 200 : saturation}%)`,
          WebkitBackdropFilter: `blur(${isLightMode ? 24 : 4 + blurAmount * 32}px) saturate(${isLightMode ? 200 : saturation}%)`,
        }}
      />

      {/* Border layer 1 - flowing liquid edges */}
      <span
        className="absolute inset-0 pointer-events-none transition-all duration-100 ease-out"
        style={{
          mixBlendMode: "screen",
          opacity: isLightMode ? 0.8 : 0.2,
          padding: "2px",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          borderRadius: "inherit",
          boxShadow: isLightMode
            ? `0 0 0 2px rgba(16, 185, 129, 0.95) inset,
               0 4px 12px rgba(16, 185, 129, ${0.7 + Math.abs(mouseOffset.x) * 0.02}) inset,
               0 6px 20px rgba(5, 150, 105, ${0.6 + Math.abs(mouseOffset.y) * 0.02})`
            : "0 0 0 0.5px rgba(255, 255, 255, 0.5) inset, 0 1px 3px rgba(255, 255, 255, 0.25) inset, 0 1px 4px rgba(0, 0, 0, 0.35)",
          background: isLightMode
            ? `linear-gradient(
                ${135 + mouseOffset.x * 1.5}deg,
                rgba(16, 185, 129, ${0.6 + Math.abs(mouseOffset.y) * 0.02}) 0%,
                rgba(16, 185, 129, ${0.85 + Math.abs(mouseOffset.x) * 0.04}) ${Math.max(5, 30 + mouseOffset.y * 0.4)}%,
                rgba(5, 150, 105, ${0.95 + Math.abs(mouseOffset.x) * 0.05}) ${Math.min(95, 70 + mouseOffset.y * 0.4)}%,
                rgba(16, 185, 129, ${0.6 + Math.abs(mouseOffset.y) * 0.02}) 100%
              )`
            : `linear-gradient(
                ${135 + mouseOffset.x * 1.2}deg,
                rgba(255, 255, 255, 0.0) 0%,
                rgba(255, 255, 255, ${0.12 + Math.abs(mouseOffset.x) * 0.008}) ${Math.max(10, 33 + mouseOffset.y * 0.3)}%,
                rgba(255, 255, 255, ${0.4 + Math.abs(mouseOffset.x) * 0.012}) ${Math.min(90, 66 + mouseOffset.y * 0.4)}%,
                rgba(255, 255, 255, 0.0) 100%
              )`,
        }}
      />

      {/* Border layer 2 - secondary liquid wave */}
      <span
        className="absolute inset-0 pointer-events-none transition-all duration-400 ease-out"
        style={{
          mixBlendMode: "overlay",
          padding: "2px",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          borderRadius: "inherit",
          boxShadow: isLightMode
            ? `0 0 0 2px rgba(16, 185, 129, ${0.95 + Math.abs(mouseOffset.x) * 0.02}) inset`
            : "0 0 0 0.5px rgba(255, 255, 255, 0.5) inset",
          background: isLightMode
            ? `linear-gradient(
                ${135 + mouseOffset.x * 1.8}deg,
                rgba(16, 185, 129, ${0.65 + Math.abs(mouseOffset.y) * 0.025}) 0%,
                rgba(16, 185, 129, ${0.9 + Math.abs(mouseOffset.x) * 0.04}) ${Math.max(5, 35 + mouseOffset.y * 0.5)}%,
                rgba(5, 150, 105, ${1.0}) ${Math.min(95, 65 + mouseOffset.y * 0.5)}%,
                rgba(16, 185, 129, ${0.65 + Math.abs(mouseOffset.y) * 0.025}) 100%
              )`
            : `linear-gradient(
                ${135 + mouseOffset.x * 1.2}deg,
                rgba(255, 255, 255, 0.0) 0%,
                rgba(255, 255, 255, ${0.32 + Math.abs(mouseOffset.x) * 0.008}) ${Math.max(10, 33 + mouseOffset.y * 0.3)}%,
                rgba(255, 255, 255, ${0.6 + Math.abs(mouseOffset.x) * 0.012}) ${Math.min(90, 66 + mouseOffset.y * 0.4)}%,
                rgba(255, 255, 255, 0.0) 100%
              )`,
        }}
      />


      {/* Content container */}
      <div className="relative z-10 flex flex-col gap-6 text-card-foreground p-6">
        {children}
      </div>
    </div>
  );
}

// Sub-components matching original Card API
function GlassCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5",
        className,
      )}
      {...props}
    />
  );
}

function GlassCardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      className={cn("leading-none", className)}
      {...props}
    />
  );
}

function GlassCardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

function GlassCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={className}
      {...props}
    />
  );
}

function GlassCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

export {
  GlassCard,
  GlassCardHeader,
  GlassCardFooter,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
};
