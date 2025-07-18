
"use client"

import { useState, useEffect } from "react"
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
import { Calendar, CalendarCheck, CalendarClock, MoreHorizontal, CheckCircle, UserCheck } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore"
import { startOfWeek, startOfMonth, endOfDay } from "date-fns"

interface Visit {
  id: string
  name: string
  time: string
  status: "Completed" | "Pending"
  timestamp: any
}

interface RegionData {
    region: string;
    visits: number;
}

const initialVisitData = [
  { id: '1', name: "PharmaPlus Downtown", time: "10:00 AM", status: "Completed", timestamp: new Date() },
  { id: '2', name: "Central Clinic", time: "01:30 PM", status: "Pending", timestamp: new Date() },
  { id: '3', name: "MediCare West", time: "04:00 PM", status: "Pending", timestamp: new Date() },
]

const initialVisitsByRegionData = [
  { region: "North", visits: 18 },
  { region: "South", visits: 12 },
  { region: "East", visits: 25 },
  { region: "West", visits: 8 },
  { region: "Central", visits: 15 },
]

export default function DashboardPage() {
  const [visits, setVisits] = useState<Visit[]>(initialVisitData)
  const [visitsByRegion, setVisitsByRegion] = useState<RegionData[]>(initialVisitsByRegionData)
  const [loading, setLoading] = useState(true)

  const [visitsToday, setVisitsToday] = useState(0)
  const [visitsThisWeek, setVisitsThisWeek] = useState(0)
  const [visitsThisMonth, setVisitsThisMonth] = useState(0)
  const [completionRate, setCompletionRate] = useState(0)


  useEffect(() => {
    const visitsQuery = query(collection(db, "visits"))
    const unsubscribe = onSnapshot(visitsQuery, (querySnapshot) => {
      const visitsData: Visit[] = []
      let completedCount = 0;
      const today = new Date()
      const startOfThisWeek = startOfWeek(today)
      const startOfThisMonth = startOfMonth(today)
      
      let todayCount = 0;
      let weekCount = 0;
      let monthCount = 0;

      querySnapshot.forEach((doc) => {
        const visit = { id: doc.id, ...doc.data() } as Visit
        visitsData.push(visit)
        
        if (visit.status === "Completed") {
            completedCount++;
        }

        const visitDate = visit.timestamp.toDate()
        if (visitDate >= startOfThisMonth) {
            monthCount++;
        }
        if (visitDate >= startOfThisWeek) {
            weekCount++;
        }
        if (visitDate.toDateString() === today.toDateString()) {
            todayCount++;
        }
      })
      
      setVisits(visitsData)
      setVisitsToday(todayCount)
      setVisitsThisWeek(weekCount)
      setVisitsThisMonth(monthCount)

      if (visitsData.length > 0) {
        setCompletionRate(Math.round((completedCount / visitsData.length) * 100))
      } else {
        setCompletionRate(0)
      }

      setLoading(false)
    }, (error) => {
        console.error("Error fetching visits:", error)
        setVisits(initialVisitData) // fallback to initial data on error
        setLoading(false)
    });

    const fetchRegions = async () => {
        try {
            const regionsCollection = collection(db, "regions");
            const regionSnapshot = await getDocs(regionsCollection);
            const regionData = regionSnapshot.docs.map(doc => ({ region: doc.id, ...doc.data() } as RegionData));
            setVisitsByRegion(regionData);
        } catch (error) {
            console.error("Error fetching regions:", error)
            setVisitsByRegion(initialVisitsByRegionData) // fallback
        }
    }
    
    fetchRegions()

    return () => unsubscribe()
  }, [])

  if (loading) {
      return <div>Loading Dashboard...</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Visits Today" value={visitsToday.toString()} icon={Calendar} />
        <MetricCard title="Visits This Week" value={visitsThisWeek.toString()} icon={CalendarCheck} />
        <MetricCard title="Visits This Month" value={visitsThisMonth.toString()} icon={CalendarClock} />
        <MetricCard title="Completion Rate" value={`${completionRate}%`} icon={CheckCircle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Visits by Region</CardTitle>
                <CardDescription>A breakdown of field visits across different regions.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={visitsByRegion}>
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
                    {visits.filter(v => v.timestamp.toDate().toDateString() === new Date().toDateString()).map((visit, i) => (
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
