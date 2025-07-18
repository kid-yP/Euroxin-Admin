"use client"

import { useState } from "react"
import { MetricCard } from "@/components/dashboard/metric-card"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, CalendarCheck, CalendarClock, MoreHorizontal, CheckCircle, BrainCircuit } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { suggestFollowUpActions } from "@/ai/flows/suggest-follow-up-actions"
import { useToast } from "@/hooks/use-toast"


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
  const [visitNotes, setVisitNotes] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSuggestion = async () => {
    if (!visitNotes.trim()) {
      toast({
        variant: "destructive",
        title: "Visit notes cannot be empty.",
      })
      return
    }
    setIsLoading(true)
    setSuggestions([])
    try {
      const result = await suggestFollowUpActions({ visitNotes })
      if (result && result.followUpSuggestions) {
        setSuggestions(result.followUpSuggestions)
      } else {
        toast({
          variant: "destructive",
          title: "Could not get suggestions.",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "An error occurred.",
        description: "Failed to get AI-powered suggestions. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }


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

       <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <CardTitle>AI-Powered Insights</CardTitle>
          </div>
          <CardDescription>
            Analyze visit notes to get suggested follow-up actions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="visit-notes">Visit Notes</Label>
            <Textarea
              id="visit-notes"
              placeholder="Enter notes from a field visit..."
              value={visitNotes}
              onChange={(e) => setVisitNotes(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button onClick={handleSuggestion} disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Get Suggestions"}
          </Button>

          {suggestions.length > 0 && (
            <div className="space-y-2 pt-4">
              <h4 className="font-semibold">Suggested Follow-up Actions:</h4>
              <Card className="bg-secondary/50 p-4">
                <ul className="list-disc space-y-2 pl-5">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}
