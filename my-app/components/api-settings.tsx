"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export function ApiSettings() {
  const [apiKeys, setApiKeys] = useState({
    guardianApi: "sk-guardian-••••••••••••••••••••••",
    rdbmsApi: "rdbms-api-••••••••••••••••••••••",
    emailApi: "email-api-••••••••••••••••••••••",
  })

  const [integrations, setIntegrations] = useState({
    guardianEnabled: true,
    rdbmsEnabled: true,
    emailEnabled: true,
  })

  const { toast } = useToast()

  const handleSaveSettings = () => {
    toast({
      title: "API Settings Saved",
      description: "Your API configuration has been updated.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Configuration</CardTitle>
        <CardDescription>Manage API keys and service integrations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="guardian-api">Guardian API Key</Label>
              <Switch
                checked={integrations.guardianEnabled}
                onCheckedChange={(checked) => setIntegrations({ ...integrations, guardianEnabled: checked })}
              />
            </div>
            <Input
              id="guardian-api"
              value={apiKeys.guardianApi}
              onChange={(e) => setApiKeys({ ...apiKeys, guardianApi: e.target.value })}
              disabled={!integrations.guardianEnabled}
            />
            <p className="text-xs text-muted-foreground">Used for content moderation and sentiment analysis</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="rdbms-api">RDBMS Tool API Key</Label>
              <Switch
                checked={integrations.rdbmsEnabled}
                onCheckedChange={(checked) => setIntegrations({ ...integrations, rdbmsEnabled: checked })}
              />
            </div>
            <Input
              id="rdbms-api"
              value={apiKeys.rdbmsApi}
              onChange={(e) => setApiKeys({ ...apiKeys, rdbmsApi: e.target.value })}
              disabled={!integrations.rdbmsEnabled}
            />
            <p className="text-xs text-muted-foreground">Used to fetch customer data from your database</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-api">Email Service API Key</Label>
              <Switch
                checked={integrations.emailEnabled}
                onCheckedChange={(checked) => setIntegrations({ ...integrations, emailEnabled: checked })}
              />
            </div>
            <Input
              id="email-api"
              value={apiKeys.emailApi}
              onChange={(e) => setApiKeys({ ...apiKeys, emailApi: e.target.value })}
              disabled={!integrations.emailEnabled}
            />
            <p className="text-xs text-muted-foreground">Used to send automated responses to customers</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings}>Save API Settings</Button>
      </CardFooter>
    </Card>
  )
}

