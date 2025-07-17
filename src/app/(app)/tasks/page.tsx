
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, PlusCircle } from "lucide-react"

const tasks = [
    {
      id: "1",
      title: "Follow-up with Dr. Smith",
      type: "Follow-up Call",
      date: "2024-05-22 10:00 AM",
      location: "Remote",
      status: "Completed",
    },
    {
      id: "2",
      title: "Deliver samples to City Clinic",
      type: "Sample Drop-off",
      date: "2024-05-23 02:30 PM",
      location: "City Clinic",
      status: "Scheduled",
    },
    {
      id: "3",
      title: "Prepare monthly report",
      type: "Admin",
      date: "2024-05-30",
      location: "Home Office",
      status: "Pending",
    },
     {
      id: "4",
      title: "Training session for Product X",
      type: "Training",
      date: "2024-06-05 09:00 AM",
      location: "Main Office",
      status: "Scheduled",
    },
]

type Task = typeof tasks[0]

export default function TasksPage() {
  const weekTasks = tasks.slice(0, 2)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Task Management</CardTitle>
            <CardDescription>
              View and manage your weekly and monthly tasks.
            </CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2" />
            Create Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="month">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
          <TabsContent value="week">
            <TaskTable tasks={weekTasks} />
          </TabsContent>
          <TabsContent value="month">
            <TaskTable tasks={tasks} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function TaskTable({ tasks }: { tasks: Task[] }) {
  const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "default"
      case "scheduled":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead className="hidden md:table-cell">Type</TableHead>
          <TableHead className="hidden lg:table-cell">Date/Time</TableHead>
          <TableHead className="hidden md:table-cell">Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell className="hidden md:table-cell">{task.type}</TableCell>
            <TableCell className="hidden lg:table-cell">{task.date}</TableCell>
            <TableCell className="hidden md:table-cell">{task.location}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
