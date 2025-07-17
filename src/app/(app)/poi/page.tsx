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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, PlusCircle } from "lucide-react"

const pointsOfInterest = [
  {
    name: "PharmaPlus Downtown",
    type: "Pharmacy",
    address: "123 Main St, Anytown",
    rep: "Field Rep",
    status: "Active",
  },
  {
    name: "Central Clinic",
    type: "Clinic",
    address: "456 Oak Ave, Anytown",
    rep: "Field Rep",
    status: "Active",
  },
  {
    name: "MediCare West",
    type: "Hospital",
    address: "789 Pine Ln, Anytown",
    rep: "Field Rep",
    status: "Active",
  },
  {
    name: "Northside Hospital",
    type: "Hospital",
    address: "101 Maple Dr, Othertown",
    rep: "Unassigned",
    status: "Prospect",
  },
  {
    name: "Community Care Pharmacy",
    type: "Pharmacy",
    address: "212 Birch Rd, Othertown",
    rep: "Field Rep",
    status: "Inactive",
  },
]

export default function POIPage() {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "default"
      case "prospect":
        return "secondary"
      case "inactive":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Points of Interest</CardTitle>
            <CardDescription>
              Manage pharmacies, clinics, and hospitals.
            </CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2" />
            Add POI
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden lg:table-cell">Address</TableHead>
              <TableHead className="hidden md:table-cell">Assigned Rep</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pointsOfInterest.map((poi, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{poi.name}</TableCell>
                <TableCell className="hidden md:table-cell">{poi.type}</TableCell>
                <TableCell className="hidden lg:table-cell">{poi.address}</TableCell>
                <TableCell className="hidden md:table-cell">{poi.rep}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(poi.status)}>{poi.status}</Badge>
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
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
      </CardContent>
    </Card>
  )
}
