"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { EmailViewDialog } from "@/components/email-view-dialog"
import { useToast } from "@/components/ui/use-toast"

// Mock data for flagged emails
const flaggedEmails = [
  {
    id: "1",
    subject: "Extremely frustrated with your service",
    sender: "angry@example.com",
    received: "2023-05-15T09:24:00",
    status: "Flagged",
    priority: "High",
    reason: "Negative Sentiment",
  },
  {
    id: "2",
    subject: "Cancellation request - URGENT",
    sender: "cancel@example.com",
    received: "2023-05-15T10:30:00",
    status: "Flagged",
    priority: "Medium",
    reason: "Cancellation Intent",
  },
  {
    id: "3",
    subject: "This is ridiculous service",
    sender: "upset@example.com",
    received: "2023-05-15T11:15:00",
    status: "Flagged",
    priority: "High",
    reason: "Profanity",
  },
  {
    id: "4",
    subject: "Need help IMMEDIATELY or I'm leaving",
    sender: "urgent@example.com",
    received: "2023-05-15T12:45:00",
    status: "Flagged",
    priority: "High",
    reason: "Urgency + Churn Risk",
  },
]

export function ReviewQueue() {
  const [selectedEmail, setSelectedEmail] = useState<typeof flaggedEmails[0] | null>(null)
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const { toast } = useToast()
  
  const handleSelectAll = () => {
    if (selectedEmails.length === flaggedEmails.length) {
      setSelectedEmails([])
    } else {
      setSelectedEmails(flaggedEmails.map(email => email.id))
    }
  }
  
  const handleSelectEmail = (id: string) => {
    if (selectedEmails.includes(id)) {\
      setSelectedEmails(selectedEmails.filter(emailId =>  => 
    if (selectedEmails.includes(id)) {
      setSelectedEmails(selectedEmails.filter(emailId => emailId !== id))
    } else {
      setSelectedEmails([...selectedEmails, id])
    }
  
  const handleApproveSelected = () => {
    toast({
      title: "Emails Approved",
      description: `${selectedEmails.length} emails have been approved and routed.`,
    })
    setSelectedEmails([])
  }
  
  const handleRejectSelected = () => {
    toast({
      title: "Emails Rejected",
      description: `${selectedEmails.length} emails have been rejected.`,
    })
    setSelectedEmails([])
  }
  
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Flagged Emails</h2>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              onClick={handleRejectSelected}
              disabled={selectedEmails.length === 0}
            >
              Reject Selected
            </Button>
            <Button 
              onClick={handleApproveSelected}
              disabled={selectedEmails.length === 0}
            >
              Approve Selected
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedEmails.length === flaggedEmails.length && flaggedEmails.length > 0} 
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Received</TableHead>
                <TableHead>Flag Reason</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flaggedEmails.map((email) => (
                <TableRow key={email.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedEmails.includes(email.id)} 
                      onCheckedChange={() => handleSelectEmail(email.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{email.subject}</TableCell>
                  <TableCell>{email.sender}</TableCell>
                  <TableCell>{new Date(email.received).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{email.reason}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={email.priority === "High" ? "destructive" : "default"}>
                      {email.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedEmail(email)}
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <EmailViewDialog 
        email={selectedEmail} 
        open={!!selectedEmail} 
        onOpenChange={() => setSelectedEmail(null)} 
      />
    </>
  )
}

