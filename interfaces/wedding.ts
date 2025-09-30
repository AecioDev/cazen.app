// Interfaces principais do CaZen

export interface BudgetItem {
  id: string
  name: string
  category: string
  estimatedCost: number
  actualCost?: number
  paid: boolean
}

export interface Vendor {
  id: string
  name: string
  category: string
  contact: string
  email?: string
  phone?: string
  cost: number
  paid: boolean
}

export interface Guest {
  id: string
  name: string
  confirmed: boolean
  plusOne: boolean
}

export interface Task {
  id: string
  title: string
  completed: boolean
  dueDate?: Date
}

export interface Wedding {
  id: string
  date: Date
  budget: number
  budgetItems: BudgetItem[]
  vendors: Vendor[]
  guests: Guest[]
  tasks: Task[]
}
