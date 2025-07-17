"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

type POI = {
  id: string;
  name: string;
  type: string;
  address: string;
  rep: string;
  status: string;
};

export default function POIPage() {
  const [pointsOfInterest, setPointsOfInterest] = useState<POI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPOIs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "poi"));
        const pois = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as POI));
        setPointsOfInterest(pois);
      } catch (error) {
        console.error("Error fetching POIs from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPOIs();
  }, []);

  const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
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
         {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading data from Firestore...</p>
          </div>
        ) : (
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
            {pointsOfInterest.map((poi) => (
              <TableRow key={poi.id}>
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
        )}
      </CardContent>
    </Card>
  )
}
