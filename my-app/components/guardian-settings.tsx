"use client"

import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function GuardianSettings() {
  const { toast } = useToast()

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Guardian model sensitivity settings have been updated.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Guardian Model Settings</CardTitle>
        <CardDescription>Adjust sensitivity for content moderation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="profanity">Profanity Detection</Label>
            <span className="text-sm text-muted-foreground">Medium</span>
          </div>
          <Slider id="profanity" defaultValue={[50]} max={100} step={1} />
          <p className="text-xs text-muted-foreground">Controls how strictly the system flags profanity in emails</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="sentiment">Negative Sentiment</Label>
            <span className="text-sm text-muted-foreground">High</span>
          </div>
          <Slider id="sentiment" defaultValue={[75]} max={100} step={1} />
          <p className="text-xs text-muted-foreground">Determines threshold for flagging negative customer sentiment</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="urgency">Urgency Detection</Label>
            <span className="text-sm text-muted-foreground">Low</span>
          </div>
          <Slider id="urgency" defaultValue={[25]} max={100} step={1} />
          <p className="text-xs text-muted-foreground">Sets sensitivity for detecting urgent requests</p>
        </div>

        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </CardContent>
    </Card>
  )
}

