"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { countryData, CountryData } from "@/data/seasons";
import { allCountriesList } from "@/data/allCountries";
import {
  Search,
  CheckCircle,
  Circle,
  MapPin,
  Calendar,
  Layers,
  Globe2,
  Trash2,
  Sparkles,
  Sun,
  Moon,
  ChevronRight,
  Share2,
  ArrowUpDown,
  BookOpen,
  Check,
  Compass
} from "lucide-react";

// Dynamically import TravelMap with SSR disabled to prevent hydration mismatch
const TravelMap = dynamic(() => import("@/components/TravelMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] md:h-[480px] rounded-3xl flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 border border-[var(--card-border)] text-muted-foreground animate-pulse">
      <Compass className="w-10 h-10 text-purple-500 animate-spin mb-4" />
      <p className="font-medium tracking-wide text-xs text-foreground/50">Assembling Map Coordinate Atlas...</p>
    </div>
  ),
});

export default function Home() {
  // State variables
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState<"All" | "Visited" | "Unvisited">("All");
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>("CAN"); // Starts with Canada (first item on user's travel list!) pre-selected!
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    
    // Theme setup
    const savedTheme = localStorage.getItem("travel-tracker-theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = savedTheme ? savedTheme === "dark" : systemPrefersDark;
    setIsDarkMode(initialDark);
    if (initialDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Visited countries setup
    const savedVisits = localStorage.getItem("visited-country-codes");
    if (savedVisits) {
      try {
        setVisitedCountries(JSON.parse(savedVisits));
      } catch (e) {
        console.error("Failed to parse visited-country-codes", e);
      }
    } else {
      // Default initial states to make map look interesting (e.g. visited JPN, FRA, ITA)
      const defaultVisits = [
        "CAN", "MEX", "PRI", "BHS", "GBR", "CYM", "BMU", "FLK", "FRA", "IRL", 
        "DNK", "DEU", "FIN", "RUS", "EST", "SWE", "ESP", "TUN", "ITA", "VAT", 
        "MCO", "PRT", "BEL", "CZE", "AUT", "NZL", "KOR", "JPN", "CHE", "GRC", 
        "TUR", "ARE", "BHR", "QAT", "ARG", "CHL", "URY", "ISL", "NOR", "ROU", 
        "SRB", "HUN", "BGR"
      ];
      setVisitedCountries(defaultVisits);
      localStorage.setItem("visited-country-codes", JSON.stringify(defaultVisits));
    }
  }, []);

  // Save visits to localStorage
  const saveVisits = (newVisits: string[]) => {
    setVisitedCountries(newVisits);
    localStorage.setItem("visited-country-codes", JSON.stringify(newVisits));
  };

  // Toggle visited status of a country
  const handleToggleCountry = (iso3: string) => {
    const isCurated = !!countryData[iso3];
    const countryName = isCurated ? countryData[iso3].name : iso3;

    if (visitedCountries.includes(iso3)) {
      const updated = visitedCountries.filter((code) => code !== iso3);
      saveVisits(updated);
      showToast(`Removed ${countryName} from visited checklist.`);
    } else {
      const updated = [...visitedCountries, iso3];
      saveVisits(updated);
      showToast(`Marked ${countryName} as visited! 🎉`);
    }
  };

  // Preset buttons
  const handleResetAll = () => {
    saveVisits([]);
    showToast("Reset all country tracker records.");
  };

  const handleMarkPopular = () => {
    const popular = ["JPN", "FRA", "ITA", "USA", "CAN", "AUS", "ESP", "BRA"];
    saveVisits(popular);
    showToast("Populated tracker with 8 popular destinations!");
  };

  // Toast notification manager
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3500);
  };

  // Toggle dark mode
  const toggleTheme = () => {
    const newDark = !isDarkMode;
    setIsDarkMode(newDark);
    localStorage.setItem("travel-tracker-theme", newDark ? "dark" : "light");
    if (newDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // List of all continents available in our data
  const continents = useMemo(() => {
    const list = new Set<string>();
    allCountriesList.forEach((c) => list.add(c.continent));
    return ["All", ...Array.from(list).sort()];
  }, []);

  // Compute sorted list of countries
  // - Unvisited countries first, then visited countries.
  // - Applies search query and continent filters.
  const processedCountries = useMemo(() => {
    const search = searchQuery.toLowerCase().trim();
    
    // Merge basic country lists with curated detailed data
    const all = allCountriesList.map((basic) => {
      const curated = countryData[basic.iso3];
      return {
        name: basic.name,
        iso3: basic.iso3,
        emoji: basic.emoji,
        continent: basic.continent,
        bestSeason: curated?.bestSeason || "Year-Round Exploration",
        description: curated?.description || `Explore the beautiful culture and landscapes of ${basic.name}.`,
        highlights: curated?.highlights || ["Local Landmarks", "Cultural Food", "Scenic Spots"],
        isCurated: !!curated
      };
    });
    
    // Apply filters
    const filtered = all.filter((country) => {
      const matchesSearch =
        country.name.toLowerCase().includes(search) ||
        country.iso3.toLowerCase().includes(search) ||
        country.bestSeason.toLowerCase().includes(search) ||
        country.description.toLowerCase().includes(search);
        
      const matchesContinent =
        selectedContinent === "All" || country.continent === selectedContinent;
        
      const isVisited = visitedCountries.includes(country.iso3);
      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Visited" && isVisited) ||
        (selectedStatus === "Unvisited" && !isVisited);

      return matchesSearch && matchesContinent && matchesStatus;
    });

    // Sort: Unvisited countries at the top, visited countries at the bottom.
    // Within each group, sort alphabetically.
    return filtered.sort((a, b) => {
      const aVisited = visitedCountries.includes(a.iso3);
      const bVisited = visitedCountries.includes(b.iso3);

      if (aVisited !== bVisited) {
        return aVisited ? 1 : -1; // unvisited (-1) comes before visited (1)
      }
      
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedContinent, selectedStatus, visitedCountries]);

  // Statistics
  const stats = useMemo(() => {
    const totalAll = allCountriesList.length;
    const visitedAll = visitedCountries.length;
    const progressPercent = totalAll > 0 ? Math.round((visitedAll / totalAll) * 100) : 0;
    
    // Progress by continent
    const continentProgress = continents
      .filter((c) => c !== "All")
      .map((cont) => {
        const countriesInCont = allCountriesList.filter((c) => c.continent === cont);
        const visitedInCont = countriesInCont.filter((c) => visitedCountries.includes(c.iso3)).length;
        const pct = countriesInCont.length > 0 ? Math.round((visitedInCont / countriesInCont.length) * 100) : 0;
        return { name: cont, total: countriesInCont.length, visited: visitedInCont, percent: pct };
      });

    return {
      total: totalAll,
      visited: visitedAll,
      unvisited: totalAll - visitedAll,
      percent: progressPercent,
      continentProgress,
    };
  }, [visitedCountries, continents]);

  // Handle sharing checklist
  const handleShare = () => {
    const shareText = `I have visited ${stats.visited}/${stats.total} countries! Track your travels and get seasons inspiration at Travel Tracker! 🌸🗺️`;
    if (navigator.share) {
      navigator.share({
        title: "Travel Tracker & Inspiration",
        text: shareText,
        url: window.location.origin,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${shareText} - ${window.location.href}`);
      showToast("Checklist stats copied to clipboard! 📋");
    }
  };

  // Get active country detail model
  const activeCountry = useMemo(() => {
    if (!selectedCountryCode) return null;
    
    if (countryData[selectedCountryCode]) {
      return countryData[selectedCountryCode];
    }
    
    const basic = allCountriesList.find((c) => c.iso3 === selectedCountryCode);
    if (basic) {
      return {
        name: basic.name,
        iso3: basic.iso3,
        numeric: "",
        bestSeason: "Year-Round Exploration",
        emoji: basic.emoji,
        continent: basic.continent,
        description: `Explore the amazing cities, vibrant culture, and natural heritage of ${basic.name}.`,
        highlights: ["Local Landmarks", "Cultural Food", "Scenic Spots"]
      };
    }
    
    return null;
  }, [selectedCountryCode]);

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <Compass className="w-12 h-12 text-purple-500 animate-spin" />
          <p className="font-mono text-xs tracking-wider text-purple-300">Synchronizing Travel Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col max-w-[1400px] w-full mx-auto px-4 py-6 md:py-10 gap-8 animate-fade-in">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl border border-purple-500/30 flex items-center gap-3 shadow-2xl animate-bounce-in max-w-sm">
          <Sparkles size={18} className="text-purple-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER BAR */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--card-border)] pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-gradient-to-tr from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg shadow-indigo-500/20 hover-scale">
            <Compass className="w-8 h-8 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-purple-500 uppercase font-mono">Wanderlust Dashboard</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">V2.0 PRO</span>
            </div>
            <h1 className="text-2xl md:text-3.5xl font-black bg-gradient-to-r from-foreground via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-tight mt-0.5">
              Travel Tracker & Inspiration
            </h1>
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={handleMarkPopular}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold glass-card border border-[var(--card-border)] hover:text-purple-500 flex items-center gap-2 hover:bg-slate-500/5 cursor-pointer"
            title="Pre-populate 8 countries to try the UI"
          >
            <Sparkles size={14} className="text-purple-500" />
            <span>Load Demo</span>
          </button>

          <button
            onClick={handleResetAll}
            className="p-2.5 rounded-xl glass-card hover:text-rose-500 flex items-center justify-center transition-all cursor-pointer"
            title="Reset All Records"
          >
            <Trash2 size={16} />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl glass-card hover:text-purple-500 flex items-center justify-center transition-all cursor-pointer"
            title={isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-all shadow-md hover:shadow-indigo-500/10 active:scale-95 cursor-pointer"
          >
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </div>
      </header>

      {/* DASHBOARD STATISTICS CARDS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Visited Progress Card */}
        <div className="col-span-2 md:col-span-1 p-5 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between h-[130px] border border-[var(--card-border)]">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono">Globe Explored</span>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-3.5xl font-black">{stats.visited}</span>
              <span className="text-slate-400 font-medium">/ {stats.total} countries</span>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1 font-semibold">
              <span>EXPLORATION RATIO</span>
              <span>{stats.percent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-300/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${stats.percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Key Inspiration Next Season Goal Card */}
        <div className="col-span-2 md:col-span-1 p-5 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between h-[130px] border border-[var(--card-border)]">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase font-mono">Curated Unvisited</span>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-3.5xl font-black text-purple-500">{stats.unvisited}</span>
              <span className="text-slate-400 font-medium">unvisited countries</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 font-medium line-clamp-2">
            Actively displaying customized, optimal seasons for these destinations.
          </p>
        </div>

        {/* Dynamic Continent Progress Chart Grid */}
        <div className="col-span-2 p-5 rounded-3xl glass-panel border border-[var(--card-border)] flex flex-col justify-between h-auto lg:h-[130px]">
          <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase font-mono mb-2 block">Continent Coverage</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-3">
            {stats.continentProgress.map((item) => (
              <div key={item.name} className="flex flex-col gap-0.5">
                <div className="flex justify-between items-center text-[10px] font-medium font-mono text-slate-400">
                  <span className="truncate">{item.name}</span>
                  <span className="text-foreground/70">{item.visited}/{item.total}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-300/20 overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE DISPLAY SECTION: MAP & SIDEBAR */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: VISUALIZATIONS (8/12 width) */}
        <section className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-purple-500" />
              <h2 className="font-bold text-lg">Interactive World Explorer</h2>
            </div>
            <p className="text-xs text-slate-400 font-mono hidden sm:block">
              {visitedCountries.length} active checkpoints synced
            </p>
          </div>

          {/* Interactive Simple Maps Component */}
          <TravelMap
            visitedCountries={visitedCountries}
            onToggleCountry={handleToggleCountry}
            hoveredCountry={hoveredCountry}
            onHoverCountry={setHoveredCountry}
          />

          {/* Dynamic Highlight Card (Details Drawer) */}
          {activeCountry ? (
            <div className="p-6 rounded-3xl glass-panel border border-[var(--card-border)] relative overflow-hidden transition-all duration-300 flex flex-col md:flex-row gap-6">
              
              {/* Card visual banner decor */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial-gradient from-purple-500/10 to-transparent pointer-events-none rounded-full blur-2xl" />

              <div className="md:w-2/5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl hover-scale select-none">{activeCountry.emoji}</span>
                  <div>
                    <h3 className="text-xl font-black">{activeCountry.name}</h3>
                    <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase font-mono">
                      {activeCountry.continent} • {activeCountry.iso3}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2 bg-purple-500/5 border border-purple-500/10 rounded-2xl p-3 text-purple-600 dark:text-purple-300">
                  <Calendar size={16} className="shrink-0 text-purple-500" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-wider opacity-60">Optimal Season to Go</span>
                    <span className="text-xs font-semibold">{activeCountry.bestSeason}</span>
                  </div>
                </div>

                {/* Mark Visited Toggle Button inside Details */}
                <button
                  onClick={() => handleToggleCountry(activeCountry.iso3)}
                  className={`mt-2 w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    visitedCountries.includes(activeCountry.iso3)
                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white"
                  }`}
                >
                  {visitedCountries.includes(activeCountry.iso3) ? (
                    <>
                      <CheckCircle size={15} />
                      <span>Mark as Unvisited</span>
                    </>
                  ) : (
                    <>
                      <Circle size={15} />
                      <span>Mark as Visited</span>
                    </>
                  )}
                </button>
              </div>

              {/* Curated Travel Highlights */}
              <div className="md:w-3/5 border-t md:border-t-0 md:border-l border-slate-300/10 md:pl-6 pt-6 md:pt-0 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono">Travel Inspiration</span>
                  <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                    {activeCountry.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono">Curated Highlights</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCountry.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-300/10 border border-slate-300/10 flex items-center gap-1 text-foreground/80"
                      >
                        <MapPin size={10} className="text-purple-500 shrink-0" />
                        <span>{highlight}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-3xl glass-panel border border-[var(--card-border)] flex flex-col items-center justify-center text-center gap-3">
              <Compass className="w-8 h-8 text-indigo-400 animate-pulse" />
              <p className="text-sm font-semibold text-foreground/70">No Destination Selected</p>
              <p className="text-xs text-slate-400 max-w-sm">
                Click on any country on the world map or browse the sidebar list to see climate insights, highlight recommendations, and checklist toggles!
              </p>
            </div>
          )}
        </section>

        {/* RIGHT COLUMN: INSPIRATION LIST / SIDEBAR (4/12 width) */}
        <section className="lg:col-span-5 xl:col-span-4 flex flex-col gap-5 h-full">
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <h2 className="font-bold text-lg">Inspiration Sidebar</h2>
            </div>
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 shrink-0 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country, season, region..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 hover:text-foreground font-bold"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Navigation Tabs (All, Unvisited, Visited) */}
            <div className="grid grid-cols-3 p-1 bg-slate-300/10 rounded-xl text-xs font-semibold border border-[var(--card-border)]">
              {(["All", "Unvisited", "Visited"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedStatus(tab)}
                  className={`py-2 rounded-lg text-center transition-all cursor-pointer ${
                    selectedStatus === tab
                      ? "bg-[var(--card-bg)] text-purple-500 shadow-sm"
                      : "text-slate-400 hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Continent Filter Select */}
            <div className="flex items-center gap-2 bg-[var(--card-bg)] px-3.5 py-2 rounded-xl border border-[var(--card-border)]">
              <Layers size={14} className="text-slate-400" />
              <select
                value={selectedContinent}
                onChange={(e) => setSelectedContinent(e.target.value)}
                className="flex-1 bg-transparent text-xs font-semibold focus:outline-none select-none cursor-pointer"
              >
                {continents.map((cont) => (
                  <option key={cont} value={cont} className="bg-slate-900 text-white font-medium">
                    {cont === "All" ? "All Continents" : cont}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dynamic Scrollable List of Countries */}
          <div className="flex-1 overflow-y-auto max-h-[420px] md:max-h-[520px] rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-3 flex flex-col gap-2.5">
            {processedCountries.length > 0 ? (
              processedCountries.map((country) => {
                const isVisited = visitedCountries.includes(country.iso3);
                const isSelected = selectedCountryCode === country.iso3;
                const isHovered = hoveredCountry === country.iso3;

                return (
                  <div
                    key={country.iso3}
                    onMouseEnter={() => setHoveredCountry(country.iso3)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => setSelectedCountryCode(country.iso3)}
                    className={`p-3 rounded-2xl transition-all border text-left cursor-pointer flex items-center justify-between gap-3 group relative ${
                      isSelected
                        ? "bg-purple-500/5 border-purple-500 shadow-sm"
                        : isHovered
                        ? "bg-slate-500/5 border-purple-500/30"
                        : isVisited
                        ? "bg-slate-500/5 border-[var(--card-border)] opacity-75"
                        : "bg-transparent border-transparent hover:bg-slate-500/5"
                    }`}
                  >
                    {/* Hover state glowing line indicator */}
                    {isSelected && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-purple-500 rounded-r-full" />
                    )}

                    <div className="flex items-center gap-3 overflow-hidden">
                      {/* Checkbox Icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Avoid selecting the card for detail view when checking
                          handleToggleCountry(country.iso3);
                        }}
                        className={`text-slate-400 hover:text-purple-500 transition-all cursor-pointer`}
                      >
                        {isVisited ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-500/10 shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 shrink-0 hover:scale-105" />
                        )}
                      </button>

                      {/* Info */}
                      <div className="overflow-hidden flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-lg select-none">{country.emoji}</span>
                          <h4
                            className={`text-sm font-bold truncate ${
                              isVisited ? "line-through text-slate-400" : "text-foreground"
                            }`}
                          >
                            {country.name}
                          </h4>
                          <span className="text-[9px] font-bold text-slate-400 font-mono">
                            {country.iso3}
                          </span>
                        </div>

                        {/* Best season badge */}
                        {!isVisited ? (
                          <p className="text-[11px] text-purple-500 dark:text-purple-300 font-medium truncate flex items-center gap-1">
                            <Calendar size={10} className="shrink-0" />
                            <span>{country.bestSeason}</span>
                          </p>
                        ) : (
                          <p className="text-[10px] text-slate-400 font-medium font-mono">
                            Checked off checklist ✔
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Expand indicator arrow */}
                    <ChevronRight
                      size={14}
                      className={`text-slate-400 group-hover:translate-x-0.5 transition-all shrink-0 ${
                        isSelected ? "text-purple-500 translate-x-0.5" : ""
                      }`}
                    />
                  </div>
                );
              })
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center px-4 gap-2">
                <Compass className="w-8 h-8 text-slate-400 animate-pulse" />
                <p className="text-sm font-semibold text-foreground/70">No Results Found</p>
                <p className="text-xs text-slate-400 max-w-xs">
                  No curated countries match your current filter parameters. Try refining your search keywords or continent selection.
                </p>
              </div>
            )}
          </div>

          {/* Quick Informational Guide */}
          <div className="p-4 rounded-2xl border border-[var(--card-border)] bg-slate-300/5 text-xs text-slate-400 flex gap-3">
            <BookOpen size={16} className="text-purple-500 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1 font-medium leading-relaxed">
              <span className="font-bold text-foreground/80">Pro Tips</span>
              <p>1. Toggle any country by clicking on it directly on the world map.</p>
              <p>2. Tap on any unvisited country in the list to reveal travel highlights and the best months to plan your trip.</p>
            </div>
          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[var(--card-border)] pt-6 mt-6 text-center text-xs text-slate-400 font-medium flex flex-col sm:flex-row justify-between items-center gap-3">
        <p>© 2026 Travel Tracker & Inspiration. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-purple-500 transition-all">Sitemap</a>
          <a href="#" className="hover:text-purple-500 transition-all">Privacy Policy</a>
          <a href="#" className="hover:text-purple-500 transition-all">Developer Documentation</a>
        </div>
      </footer>

    </div>
  );
}
