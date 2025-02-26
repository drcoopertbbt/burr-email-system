import { StatsCards } from "@/components/stats-cards"
import { EmailTable } from "@/components/email-table"
import { EmailFilters } from "@/components/email-filters"

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <StatsCards />

      <div className="space-y-4">
        <EmailFilters />
        <EmailTable />
      </div>
    </div>
  )
}

