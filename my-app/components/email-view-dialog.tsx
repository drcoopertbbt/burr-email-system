"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

type EmailViewDialogProps = {
  email: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock customer data
const customerData = {
  name: "John Smith",
  email: "john@example.com",
  accountType: "Premium",
  signupDate: "2022-01-15",
  previousTickets: 3,
  lastInteraction: "2023-04-10",
}

// Mock email content with flagged words
const emailContent = `
Hello Support Team,

I've been trying to access my account for the past 2 days but keep getting an error message saying "Invalid credentials". This is extremely frustrating as I've triple-checked my password.

I need this fixed ASAP as I have important work to do. If this isn't resolved by tomorrow, I'll have to cancel my subscription and look for alternatives.

Please help me resolve this issue quickly.

Thanks,
John
`

const flaggedWords = ["extremely frustrating", "ASAP", "cancel my subscription"]

export function EmailViewDialog({ email, open, onOpenChange }: EmailViewDialogProps) {
  const [selectedRoute, setSelectedRoute] = useState("tech-support")
  const [aiResponse, setAiResponse] = useState(
    "I understand your frustration with the login issues. I'd be happy to help resolve this. Our technical team will look into this right away. Could you please confirm if you've tried resetting your password through the 'Forgot Password' option? In the meantime, I'll escalate this to our priority queue to ensure it gets addressed promptly.",
  )
  const { toast } = useToast()

  if (!email) return null

  const highlightFlaggedWords = (text: string) => {
    let highlightedText = text

    flaggedWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi")
      highlightedText = highlightedText.replace(
        regex,
        (match) => `<span class="bg-yellow-100 text-yellow-800 px-1 rounded">${match}</span>`,
      )
    })

    return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
  }

  const handleRouteEmail = () => {
    toast({
      title: "Email Routed",
      description: `Email has been routed to ${selectedRoute === "tech-support" ? "Tech Support" : selectedRoute === "customer-support" ? "Customer Support" : "Website Team"}.`,
    })
    onOpenChange(false)
  }

  const handleSendResponse = () => {
    toast({
      title: "Response Sent",
      description: "Your response has been sent to the customer.",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{email.subject}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="email">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">Email Content</TabsTrigger>
            <TabsTrigger value="customer">Customer Info</TabsTrigger>
            <TabsTrigger value="response">AI Response</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">From: {email.sender}</p>
                <p className="text-sm text-muted-foreground">Received: {new Date(email.received).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">{email.status}</Badge>
                <Badge variant="outline">{email.priority} Priority</Badge>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Email Content</CardTitle>
                <CardDescription>
                  {flaggedWords.length > 0 && (
                    <Badge variant="destructive">{flaggedWords.length} flagged expressions</Badge>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line">{highlightFlaggedWords(emailContent)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Routing</CardTitle>
                <CardDescription>AI suggests: Tech Support (95% confidence)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="route">Route to</Label>
                    <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                      <SelectTrigger id="route">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech-support">Tech Support</SelectItem>
                        <SelectItem value="customer-support">Customer Support</SelectItem>
                        <SelectItem value="website">Website Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleRouteEmail}>Confirm Routing</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customer">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>Retrieved from RDBMS Tool</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-muted-foreground">{customerData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{customerData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Account Type</p>
                    <p className="text-sm text-muted-foreground">{customerData.accountType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Signup Date</p>
                    <p className="text-sm text-muted-foreground">{customerData.signupDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Previous Tickets</p>
                    <p className="text-sm text-muted-foreground">{customerData.previousTickets}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Interaction</p>
                    <p className="text-sm text-muted-foreground">{customerData.lastInteraction}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="response">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Response</CardTitle>
                <CardDescription>You can edit this response before sending</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={aiResponse}
                  onChange={(e) => setAiResponse(e.target.value)}
                  rows={10}
                  className="resize-none"
                />
              </CardContent>
            </Card>
            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendResponse}>Approve & Send</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

