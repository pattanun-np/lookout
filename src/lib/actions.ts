import { unstable_noStore as noStore } from "next/cache";

export interface Prompt {
  id: number;
  prompt: string;
  visibility: string;
  top: Array<{ name: string; logo?: string }>;
  tags: string[];
  geo: string;
  created: string;
  status: string;
}

// Simulate API delay for realistic loading experience
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPrompts(): Promise<Prompt[]> {
  noStore(); // Prevent caching for dynamic data

  // Simulate network delay
  await delay(800);

  return [
    {
      id: 1,
      prompt: "Most efficient electric cars 2024",
      visibility: "42%",
      top: [
        { name: "Tesla", logo: "tesla.com" },
        { name: "BMW" },
        { name: "Audi" },
      ],
      tags: ["Add Tags"],
      geo: "Global",
      created: "2 days ago",
      status: "active",
    },
    {
      id: 2,
      prompt: "Beste Elektroautos für Familien",
      visibility: "38%",
      top: [
        { name: "Tesla", logo: "tesla.com" },
        { name: "Volkswagen", logo: "volkswagen.com" },
        { name: "Mercedes" },
      ],
      tags: ["Safety Features", "Competitive", "Pricing"],
      geo: "DE",
      created: "4 days ago",
      status: "active",
    },
    {
      id: 3,
      prompt: "EV safety features comparison",
      visibility: "35%",
      top: [
        { name: "Tesla", logo: "tesla.com" },
        { name: "Volvo", logo: "volvo.com" },
        { name: "BMW" },
      ],
      tags: ["Pricing", "Features", "Reviews", "Technical"],
      geo: "Global",
      created: "3 days ago",
      status: "active",
    },
    {
      id: 4,
      prompt: "Top electric vehicle brands",
      visibility: "33%",
      top: [
        { name: "BYD" },
        { name: "Tesla", logo: "tesla.com" },
        { name: "Nio" },
      ],
      tags: ["EV Range"],
      geo: "JP",
      created: "9 days ago",
      status: "active",
    },
    {
      id: 5,
      prompt: "Wie funktioniert Autopilot?",
      visibility: "31%",
      top: [{ name: "Tesla", logo: "tesla.com" }, { name: "Waymo" }],
      tags: ["Pricing", "Market Share", "Performance"],
      geo: "DE",
      created: "10 days ago",
      status: "active",
    },
    {
      id: 6,
      prompt: "Best charging network reviews",
      visibility: "30%",
      top: [
        { name: "Tesla", logo: "tesla.com" },
        { name: "ChargePoint" },
        { name: "Electrify America" },
      ],
      tags: ["Technical", "Reviews", "EV Range"],
      geo: "USA",
      created: "13 days ago",
      status: "active",
    },
    {
      id: 7,
      prompt: "Electric vs hybrid technology",
      visibility: "30%",
      top: [
        { name: "Toyota", logo: "toyota.com" },
        { name: "Honda", logo: "honda.com" },
        { name: "Hyundai" },
      ],
      tags: ["Pricing", "Competitive"],
      geo: "Global",
      created: "15 days ago",
      status: "active",
    },
    {
      id: 8,
      prompt: "EV incentives and tax benefits",
      visibility: "28%",
      top: [
        { name: "Tesla", logo: "tesla.com" },
        { name: "Ford", logo: "ford.com" },
      ],
      tags: ["Technical", "EV Range", "Performance"],
      geo: "EU",
      created: "16 days ago",
      status: "active",
    },
    {
      id: 9,
      prompt: "Top electric vehicle brands",
      visibility: "27%",
      top: [
        { name: "BYD" },
        { name: "Tesla", logo: "tesla.com" },
        { name: "Geely" },
      ],
      tags: ["Safety Features", "Reviews", "Technical"],
      geo: "CN",
      created: "Yesterday",
      status: "active",
    },
    {
      id: 10,
      prompt: "Most reliable car manufacturers",
      visibility: "26%",
      top: [{ name: "Toyota", logo: "toyota.com" }, { name: "Lexus" }],
      tags: ["Add Tags"],
      geo: "Global",
      created: "19 days ago",
      status: "active",
    },
    {
      id: 11,
      prompt: "Battery longevity in EVs",
      visibility: "25%",
      top: [
        { name: "Tesla", logo: "tesla.com" },
        { name: "CATL" },
        { name: "Panasonic" },
      ],
      tags: ["Features", "Reviews", "Performance"],
      geo: "Global",
      created: "20 days ago",
      status: "active",
    },
    {
      id: 12,
      prompt: "Luxury car maintenance costs",
      visibility: "24%",
      top: [{ name: "BMW" }, { name: "Mercedes" }, { name: "Audi" }],
      tags: ["Pricing"],
      geo: "DE",
      created: "22 days ago",
      status: "active",
    },
    {
      id: 13,
      prompt: "Most advanced driver assistance systems",
      visibility: "23%",
      top: [{ name: "Tesla", logo: "tesla.com" }, { name: "Waymo" }],
      tags: ["Safety Features", "Technical"],
      geo: "USA",
      created: "Today",
      status: "active",
    },
  ];
}
