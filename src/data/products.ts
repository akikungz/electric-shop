import type { Category, Product } from "@/types/domain";

export const categoryLabels: Record<Category, string> = {
  tv: "TV",
  "home-theater": "Home Theater",
  "household-appliances": "Household Appliances",
  "it-accessories": "IT Accessories",
};

export const products: Product[] = [
  {
    id: "tv-001",
    name: 'AeroView 55" 4K Smart TV',
    category: "tv",
    price: 15990,
    stockQty: 12,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=80",
    description:
      "Slim-bezel 55-inch 4K panel with HDR10 support and built-in streaming apps.",
  },
  {
    id: "tv-002",
    name: 'NovaPanel 65" QLED TV',
    category: "tv",
    price: 27990,
    stockQty: 8,
    image:
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1200&q=80",
    description:
      "Vivid QLED colors, 120Hz refresh rate, and cinematic contrast tuning.",
  },
  {
    id: "tv-003",
    name: 'CrystalLite 43" 4K Google TV',
    category: "tv",
    price: 11990,
    stockQty: 14,
    image:
      "https://images.unsplash.com/photo-1571415060716-baff5f717c37?auto=format&fit=crop&w=1200&q=80",
    description:
      "Compact 43-inch 4K display with voice control and Chromecast built-in.",
  },
  {
    id: "tv-004",
    name: 'QuantumEdge 75" Mini LED TV',
    category: "tv",
    price: 49990,
    stockQty: 5,
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80",
    description:
      "Mini LED backlight zones with ultra-high brightness and smooth motion.",
  },
  {
    id: "tv-005",
    name: 'CineView 50" UHD TV',
    category: "tv",
    price: 13990,
    stockQty: 11,
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=80",
    description:
      "Balanced UHD performance with adaptive picture and low-latency game mode.",
  },
  {
    id: "tv-006",
    name: 'VisionPro 85" 8K Smart TV',
    category: "tv",
    price: 89990,
    stockQty: 3,
    image:
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1200&q=80",
    description:
      "Premium 8K upscaling engine with flagship HDR and immersive theater sound.",
  },
  {
    id: "ht-001",
    name: "PulseSound 5.1 Theater Kit",
    category: "home-theater",
    price: 10990,
    stockQty: 20,
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Wireless rear speakers and deep bass subwoofer for living room cinema.",
  },
  {
    id: "ht-002",
    name: "EchoBar Dolby Atmos Soundbar",
    category: "home-theater",
    price: 8990,
    stockQty: 18,
    image:
      "https://images.unsplash.com/photo-1545454675-f2f35d0d1f52?auto=format&fit=crop&w=1200&q=80",
    description:
      "Dolby Atmos virtual surround with HDMI eARC and voice enhancement.",
  },
  {
    id: "ht-003",
    name: "ThunderBass 2.1 Sound System",
    category: "home-theater",
    price: 5990,
    stockQty: 22,
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1200&q=80",
    description:
      "Compact subwoofer set with deep bass tuning for movie nights and music.",
  },
  {
    id: "ht-004",
    name: "CinemaCore AV Receiver 7.1",
    category: "home-theater",
    price: 15900,
    stockQty: 7,
    image:
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=1200&q=80",
    description:
      "7.1-channel receiver with HDMI switching and wireless multiroom streaming.",
  },
  {
    id: "ht-005",
    name: "AeroSurround Rear Speaker Pair",
    category: "home-theater",
    price: 4290,
    stockQty: 17,
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Wireless rear speakers designed to expand immersive surround sound setups.",
  },
  {
    id: "ht-006",
    name: "StageBeam 4K Projector",
    category: "home-theater",
    price: 23900,
    stockQty: 9,
    image:
      "https://images.unsplash.com/photo-1571415060716-baff5f717c37?auto=format&fit=crop&w=1200&q=80",
    description:
      "Native 4K projector with auto-keystone and high-contrast home cinema mode.",
  },
  {
    id: "ha-001",
    name: "FrostFlow Inverter Refrigerator",
    category: "household-appliances",
    price: 18900,
    stockQty: 6,
    image:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=1200&q=80",
    description:
      "Energy-efficient inverter compressor with smart cooling zones.",
  },
  {
    id: "ha-002",
    name: "CleanWave Air Purifier",
    category: "household-appliances",
    price: 6990,
    stockQty: 15,
    image:
      "https://images.unsplash.com/photo-1599239968067-5413f5e6f344?auto=format&fit=crop&w=1200&q=80",
    description:
      "HEPA + carbon filtration with AQI indicator and quiet sleep mode.",
  },
  {
    id: "ha-003",
    name: "SteamFresh Front-Load Washer",
    category: "household-appliances",
    price: 16990,
    stockQty: 9,
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80",
    description:
      "Energy-saving washer with steam sanitize cycle and low-vibration drum.",
  },
  {
    id: "ha-004",
    name: "HeatDry Smart Dryer",
    category: "household-appliances",
    price: 14990,
    stockQty: 8,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
    description:
      "Sensor-based drying modes with wrinkle guard and app-ready controls.",
  },
  {
    id: "ha-005",
    name: "BreezeFlow Standing Fan",
    category: "household-appliances",
    price: 1490,
    stockQty: 35,
    image:
      "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Quiet oscillating fan with timer, remote control, and natural wind mode.",
  },
  {
    id: "ha-006",
    name: "ChefMaster Microwave Grill",
    category: "household-appliances",
    price: 4290,
    stockQty: 19,
    image:
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Microwave with grill combo, auto menus, and defrost optimization.",
  },
  {
    id: "ha-007",
    name: "PureSip Counter Water Filter",
    category: "household-appliances",
    price: 3290,
    stockQty: 24,
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Multi-stage filtration for clean drinking water with easy cartridge changes.",
  },
  {
    id: "ha-008",
    name: "RoboClean Smart Vacuum",
    category: "household-appliances",
    price: 8990,
    stockQty: 13,
    image:
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1200&q=80",
    description:
      "Robot vacuum with lidar mapping, scheduled cleaning, and auto recharge.",
  },
  {
    id: "it-001",
    name: "VoltDock 11-in-1 USB-C Hub",
    category: "it-accessories",
    price: 2490,
    stockQty: 40,
    image:
      "https://images.unsplash.com/photo-1587134160474-cd9ce6bcf68b?auto=format&fit=crop&w=1200&q=80",
    description:
      "HDMI 4K output, SD card reader, fast charging passthrough and LAN.",
  },
  {
    id: "it-002",
    name: "RapidCharge GaN 100W Adapter",
    category: "it-accessories",
    price: 1790,
    stockQty: 55,
    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=1200&q=80",
    description:
      "Compact multi-port fast charger for laptop, tablet and smartphone.",
  },
  {
    id: "it-003",
    name: "SilentType Mechanical Keyboard",
    category: "it-accessories",
    price: 2590,
    stockQty: 27,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=80",
    description:
      "Hot-swappable keyboard with tactile switches and full RGB lighting.",
  },
  {
    id: "it-004",
    name: "GlidePro Wireless Mouse",
    category: "it-accessories",
    price: 1190,
    stockQty: 48,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80",
    description:
      "Ergonomic wireless mouse with precision sensor and silent click design.",
  },
  {
    id: "it-005",
    name: "CloudStore 2TB External SSD",
    category: "it-accessories",
    price: 5290,
    stockQty: 16,
    image:
      "https://images.unsplash.com/photo-1591799265444-d66432b91588?auto=format&fit=crop&w=1200&q=80",
    description:
      "High-speed portable SSD with USB-C connectivity and metal enclosure.",
  },
  {
    id: "it-006",
    name: "FocusCam 2K Webcam",
    category: "it-accessories",
    price: 1890,
    stockQty: 31,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80",
    description:
      "2K webcam with dual microphones, privacy shutter, and auto light balance.",
  },
  {
    id: "it-007",
    name: "WaveLink Wi-Fi 6 Router",
    category: "it-accessories",
    price: 3490,
    stockQty: 21,
    image:
      "https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&w=1200&q=80",
    description:
      "Dual-band router with Wi-Fi 6 performance and advanced parental controls.",
  },
  {
    id: "it-008",
    name: "PrimeView 27-inch 144Hz Monitor",
    category: "it-accessories",
    price: 7490,
    stockQty: 12,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80",
    description:
      "Smooth 144Hz IPS monitor with adaptive sync and low blue light mode.",
  },
];

export const findProductById = (id: string) =>
  products.find((item) => item.id === id);
