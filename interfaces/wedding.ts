// interfaces/wedding.ts

export interface BudgetItem {
  id: string;
  name: string;
  category: string;
  estimatedCost: number;
  actualCost?: number;
  paid: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  contactName?: string | null;
  phone?: string | null;
  email?: string | null;
  cost: number;
  paid: boolean;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Guest {
  id: string;
  name: string;
  confirmed: boolean;
  plusOne: boolean;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wedding {
  id: string;
  date: Date;
  budget: number;
  budgetItems: BudgetItem[];
  vendors: Vendor[];
  guests: Guest[];
  tasks: Task[];
}
