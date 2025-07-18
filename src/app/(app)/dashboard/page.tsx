"use client"

import { useState } from "react"
import { MetricCard } from "@/components/dashboard/metric-card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, CalendarCheck, CalendarClock, MoreHorizontal, PlusCircle, CheckCircle, Award } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"


const initialVisitData = [
  { name: "PharmaPlus Downtown", time: "10:00 AM", status: "Completed" },
  { name: "Central Clinic", time: "01:30 PM", status: "Pending" },
  { name: "MediCare West", time: "04:00 PM", status: "Pending" },
]

const visitsByRegionData = [
  { region: "North", visits: 18 },
  { region: "South", visits: 12 },
  { region: "East", visits: 25 },
  { region: "West", visits: 8 },
  { region: "Central", visits: 15 },
]


export default function DashboardPage() {
  const [visitData, setVisitData] = useState(initialVisitData)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Visits Today" value={visitData.length.toString()} icon={Calendar} />
        <MetricCard title="Visits This Week" value="12" icon={CalendarCheck} />
        <MetricCard title="Visits This Month" value="45" icon={CalendarClock} />
        <MetricCard title="Completion Rate" value="85%" icon={CheckCircle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Visits by Region</CardTitle>
                <CardDescription>A breakdown of field visits across different regions.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={visitsByRegionData}>
                  <XAxis dataKey="region" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`}/>
                  <Tooltip cursor={{fill: 'hsl(var(--secondary))'}} contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                  <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Visit Plans</CardTitle>
                <CardDescription>Today's scheduled visits.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ul className="space-y-3">
                    {visitData.map((visit, i) => (
                      <li key={i} className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                           <div>
                            <p className="font-medium">{visit.name}</p>
                            <p className="text-sm text-muted-foreground">{visit.time}</p>
                          </div>
                          <Badge variant={visit.status === "Completed" ? "default" : "secondary"}>
                            {visit.status}
                          </Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </li>
                    ))}
                  </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
