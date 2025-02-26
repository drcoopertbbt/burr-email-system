"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EmailViewDialog } from "@/components/email-view-dialog"

// Mock data
const emails = [
  {
    id: "1",
    subject: "Website not working properly",
    sender: "john@example.com",
    received: "2023-05-15T09:24:00",
    status: "Ingested",
    priority: "High",
  },
  {
    id: "2",
    subject: "Question about my subscription",
    sender: "sarah@example.com",
    received: "2023-05-15T10:30:00",
    status: "Cleared",
    priority: "Medium",
  },
  {
    id: "3",
    subject: "Technical issue with login",
    sender: "mike@example.com",
    received: "2023-05-15T11:15:00",
    status: "Ready",
    priority: "High",
  },
  {
    id: "4",
    subject: "Feedback on new features",
    sender: "lisa@example.com",
    received: "2023-05-15T12:45:00",
    status: "Routed",
    priority: "Low",
  },
  {
    id: "5",
    subject: "Inappropriate language detected",
    sender: "anonymous@example.com",
    received: "2023-05-15T13:20:00",
    status: "Flagged",
    priority: "High",
  },
]

export function EmailTable() {
  const [selectedEmail, setSelectedEmail] = useState<(typeof emails)[0] | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ingested":
        return "secondary"
      case "Cleared":
        return "default"
      case "Ready":
        return "blue"
      case "Routed":
        return "green"
      case "Flagged":
        return "destructive"
      default:
        return "default"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "yellow"
      case "Low":
        return "green"
      default:
        return "default"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emails.map((email) => (
              <TableRow key={email.id}>
                <TableCell className="font-medium">{email.subject}</TableCell>
                <TableCell>{email.sender}</TableCell>
                <TableCell>{formatDate(email.received)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(email.status) as any}>{email.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPriorityColor(email.priority) as any}>{email.priority}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedEmail(email)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EmailViewDialog email={selectedEmail} open={!!selectedEmail} onOpenChange={() => setSelectedEmail(null)} />
    </>
  )
}

