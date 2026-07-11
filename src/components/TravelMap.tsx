"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { numericToAlpha3 } from "@/data/isoMapping";
import { countryData } from "@/data/seasons";
import { Plus, Minus, RotateCcw, Compass } from "lucide-react";

// Path to our local world map TopoJSON
const geoUrl = "/countries_visited/countries-110m.json";

interface TravelMapProps {
  visitedCountries: string[];
  onToggleCountry: (iso3: string) => void;
  hoveredCountry: string | null;
  onHoverCountry: (iso3: string | null) => void;
}

export default function TravelMap({
  visitedCountries,
  onToggleCountry,
  hoveredCountry,
  onHoverCountry,
}: TravelMapProps) {
  const [position, setPosition] = useState({ coordinates: [0, 0] as [number, number], zoom: 1 });
  const [tooltipContent, setTooltipContent] = useState<{ name: string; season: string; emoji: string } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  // Zoom handlers
  const handleZoomIn = () => {
    if (position.zoom >= 8) return;
    setPosition((prev) => ({ ...prev, zoom: Math.min(prev.zoom + 1, 8) }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((prev) => ({ ...prev, zoom: Math.max(prev.zoom - 1, 1) }));
  };

  const handleReset = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  };

  const handleMoveEnd = (newPosition: { coordinates: [number, number]; zoom: number }) => {
    setPosition(newPosition);
  };

  return (
    <div className="relative w-full h-[350px] md:h-[480px] rounded-3xl overflow-hidden glass-panel shadow-inner border border-[var(--card-border)] select-none">
      {/* Map Ocean Background Grid */}
      <div className="absolute inset-0 bg-radial-gradient from-sky-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Map Control Dashboard */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2.5 rounded-xl glass-card text-foreground hover:text-purple-500 flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
          title="Zoom In"
        >
          <Plus size={16} className="stroke-[2.5px]" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2.5 rounded-xl glass-card text-foreground hover:text-purple-500 flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
          title="Zoom Out"
        >
          <Minus size={16} className="stroke-[2.5px]" />
        </button>
        <button
          onClick={handleReset}
          className="p-2.5 rounded-xl glass-card text-foreground hover:text-purple-500 flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
          title="Reset View"
        >
          <RotateCcw size={16} className="stroke-[2.5px]" />
        </button>
      </div>

      {/* Map Compass Visual indicator */}
      <div className="absolute bottom-4 left-4 pointer-events-none opacity-20 dark:opacity-30 flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-foreground">
        <Compass size={18} className="animate-spin-slow" />
        <span>Travel Map</span>
      </div>

      {/* Interactive Map Canvas */}
      <ComposableMap
        projectionConfig={{ scale: 140 }}
        className="w-full h-full focus:outline-none"
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          filterZoomEvent={(evt) => {
            // Prevent standard scroll wheel zooming so users can scroll down the page normally
            // Zoom can still be controlled via the UI buttons or double-clicks/drags
            return evt.type !== "wheel";
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const numericId = geo.id;
                // Pad with zeros to resolve correctly
                const paddedId = numericId ? numericId.padStart(3, "0") : "";
                const iso3 = numericToAlpha3[paddedId] || numericToAlpha3[numericId] || null;
                
                const isVisited = iso3 ? visitedCountries.includes(iso3) : false;
                const isCurated = iso3 ? !!countryData[iso3] : false;
                const isHovered = iso3 && hoveredCountry === iso3;
                
                // Get curated metadata or defaults
                const curatedInfo = isCurated && iso3 ? countryData[iso3] : null;
                const name = curatedInfo?.name || geo.properties.name || "Unknown Country";
                const bestSeason = curatedInfo?.bestSeason || "Year-Round Exploration";
                const emoji = curatedInfo?.emoji || "🌍";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(event) => {
                      if (iso3) {
                        onHoverCountry(iso3);
                        setTooltipContent({ name, season: bestSeason, emoji });
                      }
                    }}
                    onMouseMove={(event) => {
                      // Get map container relative position
                      const bounds = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
                      if (bounds) {
                        setTooltipPosition({
                          x: event.clientX - bounds.left,
                          y: event.clientY - bounds.top - 12,
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      onHoverCountry(null);
                      setTooltipContent(null);
                    }}
                    onClick={() => {
                      if (iso3) {
                        onToggleCountry(iso3);
                        // Update tooltip if visited status toggles
                        setTooltipContent({ name, season: bestSeason, emoji });
                      }
                    }}
                    style={{
                      default: {
                        fill: isHovered
                          ? "var(--map-hover)"
                          : isVisited
                          ? "var(--map-visited)"
                          : isCurated
                          ? "var(--map-curated)"
                          : "var(--map-bg)",
                        stroke: "var(--map-stroke)",
                        strokeWidth: isHovered ? 1.2 : 0.5,
                        outline: "none",
                        transition: "fill 0.25s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.2s, stroke-width 0.2s",
                      },
                      hover: {
                        fill: "var(--map-hover)",
                        stroke: "var(--map-stroke)",
                        strokeWidth: 1.5,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "var(--map-visited)",
                        stroke: "var(--map-stroke)",
                        strokeWidth: 1.5,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Elegant Map Guide Legend */}
      <div className="absolute bottom-4 right-4 flex flex-col md:flex-row gap-3 bg-[var(--card-bg)] px-4 py-2 rounded-2xl border border-[var(--card-border)] backdrop-blur-md shadow-md text-xs font-medium">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-md bg-[var(--map-visited)] border border-emerald-400/20" />
          <span className="text-foreground/80">Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-md bg-[var(--map-curated)] border border-slate-400/20" />
          <span className="text-foreground/80">Curated Unvisited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-md bg-[var(--map-bg)] border border-slate-300/20" />
          <span className="text-foreground/80">Other Countries</span>
        </div>
      </div>

      {/* Floating Tooltip */}
      {tooltipContent && tooltipPosition && (
        <div
          className="absolute z-50 pointer-events-none bg-[rgba(15,23,42,0.92)] text-white px-3.5 py-2.5 rounded-xl border border-slate-700 shadow-xl max-w-xs backdrop-blur-sm animate-fade-in flex flex-col gap-1 transition-all duration-75"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="flex items-center gap-1.5 font-bold text-sm">
            <span className="text-base">{tooltipContent.emoji}</span>
            <span className="truncate">{tooltipContent.name}</span>
          </div>
          <p className="text-[10px] text-purple-300 font-mono tracking-wider uppercase font-semibold">
            ✨ Click to Toggle Visited
          </p>
          <p className="text-xs text-slate-300 italic border-t border-slate-800 pt-1 mt-0.5 font-medium">
            {tooltipContent.season}
          </p>
        </div>
      )}
    </div>
  );
}
