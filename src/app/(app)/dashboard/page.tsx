import { MetricCard } from "@/components/dashboard/metric-card"
import { FollowUpSuggestions } from "@/components/dashboard/follow-up-suggestions"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CalendarCheck, CalendarClock } from "lucide-react"

const visitData = [
  { name: "PharmaPlus Downtown", time: "10:00 AM", status: "Completed" },
  { name: "Central Clinic", time: "01:30 PM", status: "Pending" },
  { name: "MediCare West", time: "04:00 PM", status: "Pending" },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Visits Today" value="3" icon={Calendar} />
        <MetricCard title="Visits This Week" value="12" icon={CalendarCheck} />
        <MetricCard title="Visits This Month" value="45" icon={CalendarClock} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <FollowUpSuggestions />

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Visit Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Today&apos;s Visits</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3">
                    {visitData.map((visit, i) => (
                      <li key={i} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{visit.name}</p>
                          <p className="text-sm text-muted-foreground">{visit.time}</p>
                        </div>
                        <Badge variant={visit.status === "Completed" ? "default" : "secondary"}>
                          {visit.status}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>This Week&apos;s Plan</AccordionTrigger>
                <AccordionContent>
                  List of visits planned for this week.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>This Month&apos;s Plan</AccordionTrigger>
                <AccordionContent>
                  Overview of all visits for the current month.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
