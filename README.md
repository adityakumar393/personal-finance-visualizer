# Personal Finance Visualizer

A lightweight, **single-user** web app for tracking personal expenses and income.  
Built with **Next.js (App Router)**, **React**, **Tailwind + shadcn/ui**, **MongoDB**, and **Recharts**.

| Stage | Status | Highlights |
|-------|--------|------------|
| **1 – Basic Tracking** | Complete | CRUD transactions, monthly expense bar chart, responsive layout |
| 2 – Categories & Dashboard | Category select, pie chart, KPI cards |
| 3 – Budgeting & Insights | Monthly budgets, budget-vs-actual chart, basic insights |

---

![Screenshot](personal-finance-visualizer\image.png)


---

## Tech Stack

- **Next.js 15** (App Router, RSC, Server Actions)
- **React 18**
- **Tailwind CSS** + **shadcn/ui**
- **MongoDB Atlas** – primary data store
- **SWR** – client-side data fetching cache
- **Zod** – schema validation
- **Recharts** – charts

---

##  Quick Start

### Prerequisites

| Tool | Version |
|------|---------|
| Node | ≥ 20 |
| npm  | ≥ 10 (or use **pnpm**/**yarn**) |
| MongoDB Atlas account | free tier is fine |

### 1. Clone & install

```bash
git clone 

cd personal-finance-visualizer
npm install           # or pnpm i / yarn
