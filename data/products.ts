export interface Product {
  id: string
  name: string
  category: string
  stock: number
  sold: number
  revenue: string
  trend: "up" | "down"
  margin: string
  image: string
  stockStatus: "in-stock" | "low-stock" | "out-of-stock"
  supplier?: string
  sku?: string
  price?: number
  description?: string
}

export const topProducts: Product[] = [
  {
    id: "WM-001",
    name: "Great Value Whole Milk",
    category: "Dairy",
    stock: 245,
    sold: 1250,
    revenue: "$3,125",
    trend: "up",
    margin: "22%",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop&crop=center",
    stockStatus: "in-stock",
    supplier: "Great Value",
    sku: "GV-MILK-001",
    price: 2.5,
    description: "Fresh whole milk, 1 gallon"
  },
  {
    id: "WM-002",
    name: "Bananas (per lb)",
    category: "Produce",
    stock: 89,
    sold: 2100,
    revenue: "$1,260",
    trend: "up",
    margin: "34%",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100&h=100&fit=crop&crop=center",
    stockStatus: "low-stock",
    supplier: "Local Farms",
    sku: "PROD-BAN-002",
    price: 0.6,
    description: "Fresh bananas, sold per pound"
  },
  {
    id: "WM-003",
    name: "Wonder Bread",
    category: "Bakery",
    stock: 156,
    sold: 890,
    revenue: "$2,670",
    trend: "down",
    margin: "18%",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop&crop=center",
    stockStatus: "in-stock",
    supplier: "Wonder Bread Co",
    sku: "WB-BREAD-003",
    price: 3.0,
    description: "Classic white bread loaf"
  },
  {
    id: "WM-004",
    name: "Tide Laundry Detergent",
    category: "Household",
    stock: 67,
    sold: 340,
    revenue: "$4,080",
    trend: "up",
    margin: "28%",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center",
    stockStatus: "low-stock",
    supplier: "P&G",
    sku: "PG-TIDE-004",
    price: 12.0,
    description: "Tide liquid laundry detergent, 64 loads"
  },
  {
    id: "WM-005",
    name: "Coca-Cola 12-pack",
    category: "Beverages",
    stock: 234,
    sold: 1890,
    revenue: "$11,340",
    trend: "up",
    margin: "45%",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=100&h=100&fit=crop&crop=center",
    stockStatus: "in-stock",
    supplier: "Coca-Cola Co",
    sku: "CC-COLA-005",
    price: 6.0,
    description: "Coca-Cola classic, 12-pack cans"
  },
  {
    id: "WM-006",
    name: "iPhone 15 Pro",
    category: "Electronics",
    stock: 45,
    sold: 89,
    revenue: "$89,100",
    trend: "down",
    margin: "15%",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&h=100&fit=crop&crop=center",
    stockStatus: "in-stock",
    supplier: "Apple Inc",
    sku: "APL-IP15P-006",
    price: 1000,
    description: "iPhone 15 Pro, 128GB, Natural Titanium"
  },
  {
    id: "WM-007",
    name: "Organic Chicken Breast",
    category: "Meat",
    stock: 78,
    sold: 567,
    revenue: "$3,402",
    trend: "up",
    margin: "25%",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=100&h=100&fit=crop&crop=center",
    stockStatus: "in-stock",
    supplier: "Organic Farms",
    sku: "OF-CHICK-007",
    price: 6.0,
    description: "Fresh organic chicken breast, per lb"
  },
  {
    id: "WM-008",
    name: "Advil Pain Reliever",
    category: "Pharmacy",
    stock: 123,
    sold: 445,
    revenue: "$3,560",
    trend: "down",
    margin: "35%",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop&crop=center",
    stockStatus: "in-stock",
    supplier: "Pfizer",
    sku: "PFZ-ADV-008",
    price: 8.0,
    description: "Advil pain reliever, 200mg, 50 tablets"
  },
  {
    id: "WM-009",
    name: "Frozen Pizza Margherita",
    category: "Frozen Foods",
    stock: 67,
    sold: 234,
    revenue: "$1,404",
    trend: "down",
    margin: "20%",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop&crop=center",
    stockStatus: "low-stock",
    supplier: "DiGiorno",
    sku: "DG-PIZZA-009",
    price: 6.0,
    description: "DiGiorno frozen margherita pizza"
  },
  {
    id: "WM-010",
    name: "Energizer AA Batteries",
    category: "Electronics",
    stock: 189,
    sold: 678,
    revenue: "$4,068",
    trend: "up",
    margin: "40%",
    image: "https://images.unsplash.com/photo-1609592094093-82bbff3d235a?w=100&h=100&fit=crop&crop=center",
    stockStatus: "in-stock",
    supplier: "Energizer",
    sku: "ENR-AA-010",
    price: 6.0,
    description: "Energizer AA batteries, 8-pack"
  }
]

export const lowStockItems = [
  { name: "Coca-Cola 12-pack", stock: 12, reorderLevel: 50, category: "Beverages", urgency: "high" as const },
  { name: "iPhone Charger Cable", stock: 8, reorderLevel: 25, category: "Electronics", urgency: "critical" as const },
  { name: "Advil Pain Reliever", stock: 15, reorderLevel: 40, category: "Pharmacy", urgency: "medium" as const },
  { name: "Frozen Pizza", stock: 18, reorderLevel: 35, category: "Frozen Foods", urgency: "medium" as const },
]