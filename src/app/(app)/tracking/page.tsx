
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const reps = [
  {
    name: "Alice Johnson",
    initials: "AJ",
    position: { top: "20%", left: "30%" },
    status: "Active",
  },
  {
    name: "Bob Williams",
    initials: "BW",
    position: { top: "50%", left: "60%" },
    status: "Idle",
  },
  {
    name: "Charlie Brown",
    initials: "CB",
    position: { top: "75%", left: "40%" },
    status: "Offline",
  },
]

const activities = [
    {
      rep: "Alice Johnson",
      action: "Checked in at City General Hospital",
      time: "10:05 AM",
    },
    {
      rep: "Bob Williams",
      action: "Completed task: 'Deliver samples to Downtown Pharmacy'",
      time: "10:02 AM",
    },
     {
      rep: "Alice Johnson",
      action: "Completed task: 'Follow-up with Dr. Smith'",
      time: "9:45 AM",
    },
     {
      rep: "Bob Williams",
      action: "Checked in at Downtown Pharmacy",
      time: "9:15 AM",
    },
    {
        rep: "Charlie Brown",
        action: "Went offline",
        time: "9:00 AM",
    }
]

export default function TrackingPage() {
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Active": return "bg-green-500"
      case "Idle": return "bg-yellow-500"
      case "Offline": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Live Rep Map</CardTitle>
          <CardDescription>
            Real-time locations of field representatives.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="relative bg-secondary/50 h-[600px] w-full rounded-lg overflow-hidden border">
              {/* This is a placeholder for a real map component */}
              <div className="absolute inset-0 bg-[url('https://www.gstatic.com/earth/social/00_generic_facebook-001.jpg')] bg-cover opacity-30"></div>
              {reps.map((rep) => (
                <Tooltip key={rep.name}>
                  <TooltipTrigger asChild>
                    <div
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ top: rep.position.top, left: rep.position.left }}
                    >
                      <Avatar className="h-12 w-12 border-2 border-background shadow-lg">
                        <AvatarFallback>{rep.initials}</AvatarFallback>
                      </Avatar>
                       <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(rep.status)}`} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">{rep.name}</p>
                    <p>Status: {rep.status}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
          <CardDescription>
            A live feed of rep activities and check-ins.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div key={index} className="flex gap-3">
                <Avatar className="h-9 w-9">
                    <AvatarFallback>{activity.rep.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">{activity.rep}</span> {activity.action.toLowerCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
