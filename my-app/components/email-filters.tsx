"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"

export function EmailFilters() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search emails..." className="pl-8" />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="ingested">Ingested</SelectItem>
            <SelectItem value="cleared">Cleared</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="routed">Routed</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
          </SelectContent>
        </Select>
        <DatePickerWithRange />
        <Button>Filter</Button>
      </div>
    </div>
  )
}

