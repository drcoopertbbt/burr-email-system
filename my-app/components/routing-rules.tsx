"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RoutingRules() {
  const { toast } = useToast()

  const handleSaveRules = () => {
    toast({
      title: "Routing Rules Saved",
      description: "Your routing configuration has been updated.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Routing Rules</CardTitle>
        <CardDescription>Configure how emails are routed to different departments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tech-keywords">Tech Support Keywords</Label>
            <Textarea
              id="tech-keywords"
              placeholder="Enter keywords separated by commas"
              defaultValue="login, password, error, bug, crash, technical, account access"
            />
            <p className="text-xs text-muted-foreground">
              Emails containing these keywords will be routed to Tech Support
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer-keywords">Customer Support Keywords</Label>
            <Textarea
              id="customer-keywords"
              placeholder="Enter keywords separated by commas"
              defaultValue="billing, subscription, payment, refund, cancel, upgrade, downgrade"
            />
            <p className="text-xs text-muted-foreground">
              Emails containing these keywords will be routed to Customer Support
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website-keywords">Website Team Keywords</Label>
            <Textarea
              id="website-keywords"
              placeholder="Enter keywords separated by commas"
              defaultValue="website, page, broken link, design, layout, mobile, responsive"
            />
            <p className="text-xs text-muted-foreground">
              Emails containing these keywords will be routed to the Website Team
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="default-route">Default Route</Label>
            <Select defaultValue="customer-support">
              <SelectTrigger id="default-route">
                <SelectValue placeholder="Select default department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech-support">Tech Support</SelectItem>
                <SelectItem value="customer-support">Customer Support</SelectItem>
                <SelectItem value="website">Website Team</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Department to route emails when no keywords match</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confidence-threshold">AI Confidence Threshold (%)</Label>
            <Input id="confidence-threshold" type="number" min="0" max="100" defaultValue="75" />
            <p className="text-xs text-muted-foreground">
              Minimum confidence level for AI to auto-route without human review
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveRules}>Save Routing Rules</Button>
      </CardFooter>
    </Card>
  )
}

