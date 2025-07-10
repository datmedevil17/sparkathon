import { SetupStep } from "@/types/store"

export const setupSteps: SetupStep[] = [
  {
    id: 0,
    icon: "👋",
    botMessage: "Hello! I'm your AI setup assistant. Ready to help you launch your dream store. Let's get started with a few quick questions. You can skip or edit later!",
    field: null,
    inputType: "continue",
    category: "Greeting"
  },
  {
    id: 1,
    icon: "📛",
    botMessage: "What would you like to name your store?",
    field: "storeName",
    inputType: "text",
    placeholder: "Enter your store name...",
    category: "Basic Business Info"
  },
  {
    id: 2,
    icon: "🏷️",
    botMessage: "What type of products will you be selling? You can select multiple categories.",
    field: "productTypes",
    inputType: "multiselect",
    category: "Basic Business Info"
  },
  {
    id: 3,
    icon: "📍",
    botMessage: "Where is your store located? Search and select your exact address.",
    field: "location",
    inputType: "location",
    placeholder: "Search for your store location...",
    category: "Location Intelligence"
  },
  {
    id: 4,
    icon: "🧑‍💼",
    botMessage: "Have you managed a store before?",
    field: "experience",
    inputType: "select",
    options: [
      "Yes, I'm experienced",
      "A little",
      "Totally new"
    ],
    category: "Experience & Goals"
  },
  {
    id: 5,
    icon: "🎯",
    botMessage: "What's your primary goal?",
    field: "goal",
    inputType: "select",
    options: [
      "Maximize profits",
      "Build local brand",
      "Test a new product line",
      "Expand existing business"
    ],
    category: "Experience & Goals"
  },
  {
    id: 6,
    icon: "🧱",
    botMessage: "How big is your store space?",
    field: "storeSize",
    inputType: "select",
    options: [
      "Small (kiosk-style)",
      "Medium (a few shelves and counters)",
      "Large (full retail layout)"
    ],
    category: "Store Layout Preferences"
  },
  {
    id: 7,
    icon: "🎨",
    botMessage: "Would you like help designing your shelf layout?",
    field: "layoutHelp",
    inputType: "select",
    options: [
      "Yes, use drag-and-drop builder",
      "No, I'll do it manually later"
    ],
    category: "Store Layout Preferences"
  },
  {
    id: 8,
    icon: "📦",
    botMessage: "Want help picking your first batch of stock?",
    field: "inventoryHelp",
    inputType: "select",
    options: [
      "Yes, use AI recommendations",
      "No, I'll choose manually"
    ],
    category: "Inventory Planning"
  },
  {
    id: 9,
    icon: "💰",
    botMessage: "What's your initial budget for stocking?",
    field: "budget",
    inputType: "text",
    placeholder: "e.g., ₹50,000 - ₹2,00,000",
    category: "Inventory Planning"
  },
  {
    id: 10,
    icon: "🔗",
    botMessage: "Would you like to connect to Walmart's backend for real-time ordering & delivery updates?",
    field: "supplyChain",
    inputType: "select",
    options: [
      "Yes",
      "No"
    ],
    category: "Supply Chain Integration"
  }
]