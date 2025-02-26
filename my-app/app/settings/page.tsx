import { ApiSettings } from "@/components/api-settings"
import { RoutingRules } from "@/components/routing-rules"

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ApiSettings />
        <RoutingRules />
      </div>
    </div>
  )
}

