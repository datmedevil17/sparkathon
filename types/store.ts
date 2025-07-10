export interface StoreSetupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface ChatMessage {
  id: number
  type: "bot" | "user"
  message: string
  timestamp: Date
}

export interface StoreData {
  storeName: string
  productTypes: string[]
  location: string
  locationDetails?: any
  experience: string
  goal: string
  storeSize: string
  layoutHelp: string
  inventoryHelp: string
  budget: string
  supplyChain: string
}

export interface SetupStep {
  id: number
  icon: string
  botMessage: string
  field: string | null
  inputType: "continue" | "text" | "multiselect" | "location" | "select" | "textarea"
  placeholder?: string
  category: string
  options?: string[]
}

export interface ProductCategory {
  id: string
  label: string
}