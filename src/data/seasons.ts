export interface CountryData {
  name: string;
  iso3: string;
  numeric: string;
  bestSeason: string;
  emoji: string;
  highlights: string[];
  continent: string;
  description: string;
}

export const countryData: Record<string, CountryData> = {
  JPN: {
    name: "Japan",
    iso3: "JPN",
    numeric: "392",
    bestSeason: "March to May (Spring) & Sept to Nov (Autumn)",
    emoji: "🌸",
    continent: "Asia",
    description: "Cherry blossoms, historic temples, and delicious street food.",
    highlights: ["Kyoto Temples", "Mount Fuji", "Tokyo Neon Lights", "Cherry Blossom Season"]
  },
  USA: {
    name: "United States",
    iso3: "USA",
    numeric: "840",
    bestSeason: "September to November (Autumn) & Spring",
    emoji: "🗽",
    continent: "North America",
    description: "Diverse natural wonders, bustling metropolises, and road trips.",
    highlights: ["Grand Canyon", "New York City", "Yellowstone National Park", "Route 66"]
  },
  CAN: {
    name: "Canada",
    iso3: "CAN",
    numeric: "124",
    bestSeason: "June to August (Summer) & Sept to Oct (Fall Colors)",
    emoji: "🍁",
    continent: "North America",
    description: "Stunning mountain ranges, pristine lakes, and friendly cities.",
    highlights: ["Banff National Park", "Niagara Falls", "Vancouver Island", "Montreal Culture"]
  },
  FRA: {
    name: "France",
    iso3: "FRA",
    numeric: "250",
    bestSeason: "April to May (Spring) & September to October (Autumn)",
    emoji: "🗼",
    continent: "Europe",
    description: "Charming cafes, world-class art, and romantic countryside.",
    highlights: ["Eiffel Tower", "Louvre Museum", "French Riviera", "Loire Valley Châteaux"]
  },
  ITA: {
    name: "Italy",
    iso3: "ITA",
    numeric: "380",
    bestSeason: "April to June (Spring) & September to October (Autumn)",
    emoji: "🍕",
    continent: "Europe",
    description: "Ancient Roman ruins, renaissance art, and culinary perfection.",
    highlights: ["Colosseum in Rome", "Amalfi Coast", "Venice Canals", "Florence Art Galleries"]
  },
  ESP: {
    name: "Spain",
    iso3: "ESP",
    numeric: "724",
    bestSeason: "April to May (Spring) & September to October (Autumn)",
    emoji: "💃",
    continent: "Europe",
    description: "Sunny beaches, vibrant festivals, and gorgeous architecture.",
    highlights: ["Sagrada Família", "Alhambra Palace", "Ibiza Beaches", "Tap-dancing Flamenco"]
  },
  GBR: {
    name: "United Kingdom",
    iso3: "GBR",
    numeric: "826",
    bestSeason: "May to September (Spring/Summer)",
    emoji: "🏰",
    continent: "Europe",
    description: "Royal heritage, rolling green hills, and historic pubs.",
    highlights: ["Tower of London", "Stonehenge", "Scottish Highlands", "Bath Roman Baths"]
  },
  DEU: {
    name: "Germany",
    iso3: "DEU",
    numeric: "276",
    bestSeason: "May to September (Summer) & December (Christmas Markets)",
    emoji: "🍺",
    continent: "Europe",
    description: "Fairytale castles, rich history, and festive Christmas markets.",
    highlights: ["Neuschwanstein Castle", "Brandenburg Gate", "Black Forest", "Bavarian Alps"]
  },
  AUS: {
    name: "Australia",
    iso3: "AUS",
    numeric: "036",
    bestSeason: "September to November (Spring) & March to May (Autumn)",
    emoji: "🦘",
    continent: "Oceania",
    description: "Stunning coral reefs, outback safaris, and beach culture.",
    highlights: ["Great Barrier Reef", "Sydney Opera House", "Uluru (Ayers Rock)", "Great Ocean Road"]
  },
  NZL: {
    name: "New Zealand",
    iso3: "NZL",
    numeric: "554",
    bestSeason: "December to February (Summer) & March to May (Autumn)",
    emoji: "🥝",
    continent: "Oceania",
    description: "Epic cinematic landscapes, extreme sports, and Maori heritage.",
    highlights: ["Milford Sound", "Hobbiton Movie Set", "Queenstown Adventure", "Rotorua Geothermal"]
  },
  BRA: {
    name: "Brazil",
    iso3: "BRA",
    numeric: "076",
    bestSeason: "September to October (Spring) & December to March (Carnival)",
    emoji: "🌴",
    continent: "South America",
    description: "Tropical beaches, lively samba rhythms, and Amazon rainforests.",
    highlights: ["Christ the Redeemer", "Copacabana Beach", "Amazon Rainforest", "Iguazu Falls"]
  },
  ARG: {
    name: "Argentina",
    iso3: "ARG",
    numeric: "032",
    bestSeason: "October to December (Spring) & April to June (Autumn)",
    emoji: "🥩",
    continent: "South America",
    description: "Sensual tango, spectacular glaciers, and delicious steaks.",
    highlights: ["Perito Moreno Glacier", "Buenos Aires Tango", "Mendoza Vineyards", "Patagonia Trails"]
  },
  PER: {
    name: "Peru",
    iso3: "PER",
    numeric: "604",
    bestSeason: "May to September (Dry Season/Winter)",
    emoji: "🦙",
    continent: "South America",
    description: "Incan archaeological mysteries, high peaks, and culinary arts.",
    highlights: ["Machu Picchu", "Sacred Valley", "Cusco Old Town", "Huacachina Oasis"]
  },
  MEX: {
    name: "Mexico",
    iso3: "MEX",
    numeric: "484",
    bestSeason: "December to April (Dry Season)",
    emoji: "🌮",
    continent: "North America",
    description: "Vibrant indigenous cultures, Mayan ruins, and beach resorts.",
    highlights: ["Chichen Itza", "Oaxaca Cuisine", "Tulum Beaches", "Dia de los Muertos"]
  },
  ZAF: {
    name: "South Africa",
    iso3: "ZAF",
    numeric: "710",
    bestSeason: "May to September (Safari) & Nov to March (Cape Beaches)",
    emoji: "🦁",
    continent: "Africa",
    description: "Wild animal safaris, dramatic coastline, and rich history.",
    highlights: ["Kruger National Park", "Table Mountain", "Cape Winelands", "Garden Route"]
  },
  EGY: {
    name: "Egypt",
    iso3: "EGY",
    numeric: "818",
    bestSeason: "October to April (Cooler Months)",
    emoji: "☥",
    continent: "Africa",
    description: "Ancient pyramids, dusty deserts, and majestic Nile cruises.",
    highlights: ["Pyramids of Giza", "Valley of the Kings", "Nile River Cruise", "Red Sea Diving"]
  },
  MAR: {
    name: "Morocco",
    iso3: "MAR",
    numeric: "504",
    bestSeason: "March to May (Spring) & September to November (Autumn)",
    emoji: "🕌",
    continent: "Africa",
    description: "Exotic spice souks, Sahara sand dunes, and beautiful riads.",
    highlights: ["Marrakesh Medina", "Sahara Desert Dunes", "Chefchaouen Blue City", "Atlas Mountains"]
  },
  IND: {
    name: "India",
    iso3: "IND",
    numeric: "356",
    bestSeason: "October to March (Winter/Dry Season)",
    emoji: "🍛",
    continent: "Asia",
    description: "Spiritual landmarks, colorful chaos, and incredible curries.",
    highlights: ["Taj Mahal", "Rajasthan Palaces", "Kerala Backwaters", "Varanasi Ganges"]
  },
  CHN: {
    name: "China",
    iso3: "CHN",
    numeric: "156",
    bestSeason: "April to May (Spring) & September to October (Autumn)",
    emoji: "🐼",
    continent: "Asia",
    description: "Ancient imperial landmarks, mega-cities, and diverse scenery.",
    highlights: ["Great Wall of China", "Terracotta Army", "Li River in Guilin", "Shanghai Skyline"]
  },
  THA: {
    name: "Thailand",
    iso3: "THA",
    numeric: "764",
    bestSeason: "November to February (Cool & Dry Season)",
    emoji: "🐘",
    continent: "Asia",
    description: "Glittering golden temples, night markets, and tropical islands.",
    highlights: ["Bangkok Temples", "Chiang Mai Old City", "Phi Phi Islands", "Street Food Markets"]
  },
  VNM: {
    name: "Vietnam",
    iso3: "VNM",
    numeric: "704",
    bestSeason: "November to April (Dry Season)",
    emoji: "🍜",
    continent: "Asia",
    description: "Emerald-green waters, historic trading ports, and fresh cuisine.",
    highlights: ["Ha Long Bay", "Hoi An Ancient Town", "Phong Nha Caves", "Saigon Cafe Culture"]
  },
  TUR: {
    name: "Turkey",
    iso3: "TUR",
    numeric: "792",
    bestSeason: "April to May (Spring) & September to October (Autumn)",
    emoji: "🎈",
    continent: "Europe/Asia",
    description: "East-meets-west culture, fairy chimneys, and Roman ruins.",
    highlights: ["Hagia Sophia", "Cappadocia Hot Air Balloon", "Ephesus Ruins", "Pamukkale Terraces"]
  },
  GRC: {
    name: "Greece",
    iso3: "GRC",
    numeric: "300",
    bestSeason: "April to June (Spring) & September to October (Autumn)",
    emoji: "🏛️",
    continent: "Europe",
    description: "Whitewashed coastal villages, ancient history, and olive groves.",
    highlights: ["Acropolis in Athens", "Santorini Sunset", "Mykonos Windmills", "Delphi Ruins"]
  },
  CHE: {
    name: "Switzerland",
    iso3: "CHE",
    numeric: "756",
    bestSeason: "June to August (Summer Hiking) & Dec to March (Skiing)",
    emoji: "🧀",
    continent: "Europe",
    description: "Alpine peaks, clockwork transit, and gourmet chocolates.",
    highlights: ["Matterhorn Peak", "Lake Geneva", "Jungfraujoch Jungfrau", "Lucerne Old Bridge"]
  },
  ISL: {
    name: "Iceland",
    iso3: "ISL",
    numeric: "352",
    bestSeason: "June to August (Midnight Sun) & Oct to March (Northern Lights)",
    emoji: "🌋",
    continent: "Europe",
    description: "Geothermal geysers, active volcanoes, and dramatic waterfalls.",
    highlights: ["Blue Lagoon Spa", "Golden Circle Geysers", "Skógafoss Waterfall", "Northern Lights Tour"]
  },
  NOR: {
    name: "Norway",
    iso3: "NOR",
    numeric: "578",
    bestSeason: "June to August (Summer Fjord Hikes) & Nov to Feb (Winter)",
    emoji: "🇳🇴",
    continent: "Europe",
    description: "Deep, majestic fjords, coastal fishing towns, and rugged peaks.",
    highlights: ["Geirangerfjord", "Lofoten Islands", "Tromsø Northern Lights", "Preikestolen Hike"]
  },
  SGP: {
    name: "Singapore",
    iso3: "SGP",
    numeric: "702",
    bestSeason: "February to April (Driest Months)",
    emoji: "🦁",
    continent: "Asia",
    description: "Futuristic supertrees, clean green streets, and culinary hawkers.",
    highlights: ["Gardens by the Bay", "Marina Bay Sands", "Sentosa Island", "Chinatown Hawkers"]
  },
  KOR: {
    name: "South Korea",
    iso3: "KOR",
    numeric: "410",
    bestSeason: "March to May (Spring) & September to November (Autumn)",
    emoji: "🥢",
    continent: "Asia",
    description: "Vibrant K-pop culture, imperial palaces, and tech hubs.",
    highlights: ["Gyeongbokgung Palace", "Jeju Island Beaches", "Seoul Namsan Tower", "Myeongdong Shopping"]
  },
  IDN: {
    name: "Indonesia",
    iso3: "IDN",
    numeric: "360",
    bestSeason: "May to October (Dry Season)",
    emoji: "🇮🇩",
    continent: "Asia",
    description: "Spiritual retreats, black sand beaches, and active volcanoes.",
    highlights: ["Ubud Rice Terraces", "Borobudur Temple", "Komodo Island Dragons", "Uluwatu Cliffs"]
  },
  NLD: {
    name: "Netherlands",
    iso3: "NLD",
    numeric: "528",
    bestSeason: "April to May (Tulip Fields) & June to August (Summer)",
    emoji: "🌷",
    continent: "Europe",
    description: "Windmills, endless fields of tulips, and historic canal grids.",
    highlights: ["Amsterdam Canals", "Keukenhof Gardens", "Kinderdijk Windmills", "Van Gogh Museum"]
  },
  PRT: {
    name: "Portugal",
    iso3: "PRT",
    numeric: "620",
    bestSeason: "April to June (Spring) & September to October (Autumn)",
    emoji: "🇵🇹",
    continent: "Europe",
    description: "Azulejo tiles, world-famous pastries, and stunning coastlines.",
    highlights: ["Sintra Palaces", "Algarve Caves", "Lisbon Tram 28", "Porto Douro Valley"]
  },
  CRI: {
    name: "Costa Rica",
    iso3: "CRI",
    numeric: "188",
    bestSeason: "December to April (Dry Season / 'Pura Vida')",
    emoji: "🦥",
    continent: "North America",
    description: "Lush cloud forests, active volcanoes, and rich biodiversity.",
    highlights: ["Arenal Volcano", "Manuel Antonio Parks", "Monteverde Cloud Forest", "Tortuguero Nesting"]
  },
  COL: {
    name: "Colombia",
    iso3: "COL",
    numeric: "170",
    bestSeason: "December to February & July to August (Dry Seasons)",
    emoji: "☕",
    continent: "South America",
    description: "Delicious coffee plantations, colorful colonial cities, and salsa.",
    highlights: ["Cartagena Old Town", "Cocora Valley Palms", "Medellín Cable Cars", "Coffee Zone Farms"]
  },
  CHL: {
    name: "Chile",
    iso3: "CHL",
    numeric: "152",
    bestSeason: "October to April (Patagonia Summer / Warm North)",
    emoji: "🏔️",
    continent: "South America",
    description: "Super elongated geography, from desert sand dunes to polar ice.",
    highlights: ["Torres del Paine", "Atacama Desert", "Easter Island Statues", "Santiago Vineyards"]
  },
  SWE: {
    name: "Sweden",
    iso3: "SWE",
    numeric: "752",
    bestSeason: "June to August (Midsummer) & Dec to March (Winter Snow)",
    emoji: "🇸🇪",
    continent: "Europe",
    description: "Archipelagos, design innovation, medieval towns, and fika.",
    highlights: ["Stockholm Old Town", "Vasa Museum", "Icehotel in Jukkasjärvi", "Gothenburg Coast"]
  },
  HRV: {
    name: "Croatia",
    iso3: "HRV",
    numeric: "191",
    bestSeason: "May to June (Spring) & September (Pleasant Warm Sea)",
    emoji: "🇭🇷",
    continent: "Europe",
    description: "Vibrant medieval walled cities, sapphire waters, and waterfalls.",
    highlights: ["Dubrovnik Old Walls", "Plitvice Lakes", "Hvar Island Beaches", "Split Diocletian Palace"]
  },
  KEN: {
    name: "Kenya",
    iso3: "KEN",
    numeric: "404",
    bestSeason: "July to October (Great Wildebeest Migration)",
    emoji: "🇰🇪",
    continent: "Africa",
    description: "Fabulous safari savannas, Maasai culture, and tropical beaches.",
    highlights: ["Maasai Mara Reserve", "Mount Kenya Trek", "Amboseli Elephant Views", "Diani Beach coast"]
  },
  IRL: {
    name: "Ireland",
    iso3: "IRL",
    numeric: "372",
    bestSeason: "May to September (Lush and Sunny Intervals)",
    emoji: "☘️",
    continent: "Europe",
    description: "Lively folk pubs, green landscapes, and legendary cliffs.",
    highlights: ["Cliffs of Moher", "Temple Bar in Dublin", "Ring of Kerry Drive", "Giant's Causeway"]
  }
};

// Help map numeric ID (from TopoJSON) to CountryData
export const numericToCountryMap: Record<string, CountryData> = {};
for (const key in countryData) {
  const country = countryData[key];
  numericToCountryMap[country.numeric] = country;
}
