import type { Invoice } from "../types"

export const invoices: Invoice[] = [
  {
    id: "inv1",
    number: "INV-2025-004",
    title: "Sprint 4 Development",
    amount: 12400,
    status: "pending",
    issueDate: "2025-06-01",
    dueDate: "2025-06-15",
    items: [
      { description: "Sprint 4 - Frontend Development (80 hrs)", amount: 6400 },
      { description: "Sprint 4 - Backend Development (60 hrs)", amount: 4800 },
      { description: "Sprint 4 - Design (20 hrs)", amount: 1200 },
    ],
  },
  {
    id: "inv2",
    number: "INV-2025-003",
    title: "Sprint 3 Development",
    amount: 9800,
    status: "paid",
    issueDate: "2025-05-01",
    dueDate: "2025-05-15",
    paidDate: "2025-05-12",
    items: [
      { description: "Sprint 3 - Full Stack Development", amount: 9800 },
    ],
    paymentHistory: [
      { date: "2025-05-12", amount: 9800, method: "Bank Transfer" },
    ],
  },
  {
    id: "inv3",
    number: "INV-2025-002",
    title: "Sprint 2 Development",
    amount: 8500,
    status: "paid",
    issueDate: "2025-04-01",
    dueDate: "2025-04-15",
    paidDate: "2025-04-10",
    items: [
      { description: "Sprint 2 - Platform Setup", amount: 8500 },
    ],
    paymentHistory: [
      { date: "2025-04-10", amount: 8500, method: "Credit Card" },
    ],
  },
  {
    id: "inv4",
    number: "INV-2025-001",
    title: "Project Kickoff & Discovery",
    amount: 5000,
    status: "overdue",
    issueDate: "2025-03-01",
    dueDate: "2025-03-15",
    items: [
      { description: "Discovery Phase - Requirements & Planning", amount: 3000 },
      { description: "Architecture Design", amount: 2000 },
    ],
  },
]

export function getInvoicesByStatus(status: Invoice["status"]): Invoice[] {
  return invoices.filter((i) => i.status === status)
}

export const transactionHistory = [
  { id: "tx1", date: "2025-05-12", description: "Payment for INV-2025-003", amount: -9800, type: "payment" as const },
  { id: "tx2", date: "2025-04-10", description: "Payment for INV-2025-002", amount: -8500, type: "payment" as const },
  { id: "tx3", date: "2025-06-01", description: "Invoice INV-2025-004 issued", amount: 12400, type: "invoice" as const },
  { id: "tx4", date: "2025-05-01", description: "Invoice INV-2025-003 issued", amount: 9800, type: "invoice" as const },
]
