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
];

export const findProductById = (id: string) =>
  products.find((item) => item.id === id);
