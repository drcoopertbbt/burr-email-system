import { ReviewQueue } from "@/components/review-queue"
import { GuardianSettings } from "@/components/guardian-settings"

export default function ReviewPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Review Queue</h1>
      </div>

      <GuardianSettings />
      <ReviewQueue />
    </div>
  )
}

