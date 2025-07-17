"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { PlusCircle, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const content = [
  {
    title: "Advanced Sales Techniques",
    category: "Sales",
    type: "Video",
    updated: "2 weeks ago",
    image: "https://placehold.co/600x400",
    dataAiHint: "business meeting",
  },
  {
    title: "Product Deep Dive: Product A",
    category: "Product",
    type: "PDF",
    updated: "1 month ago",
    image: "https://placehold.co/600x400",
    dataAiHint: "product diagram",
  },
  {
    title: "Compliance Guidelines 2024",
    category: "Compliance",
    type: "PDF",
    updated: "3 days ago",
    image: "https://placehold.co/600x400",
    dataAiHint: "legal document",
  },
  {
    title: "Handling Client Objections",
    category: "Sales",
    type: "Video",
    updated: "5 days ago",
    image: "https://placehold.co/600x400",
    dataAiHint: "customer conversation",
  },
  {
    title: "Understanding Product B",
    category: "Product",
    type: "PDF",
    updated: "1 week ago",
    image: "https://placehold.co/600x400",
    dataAiHint: "science laboratory",
  },
  {
    title: "HIPAA Compliance Essentials",
    category: "Compliance",
    type: "Video",
    updated: "3 months ago",
    image: "https://placehold.co/600x400",
    dataAiHint: "medical privacy",
  },
]

type Category = "All" | "Sales" | "Product" | "Compliance"

export default function KnowledgePage() {
  const [filter, setFilter] = useState<Category>("All")

  const filteredContent =
    filter === "All"
      ? content
      : content.filter((item) => item.category === filter)

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-64">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <RadioGroup
          defaultValue="All"
          onValueChange={(value: Category) => setFilter(value)}
          className="flex flex-row md:flex-col gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="All" id="r1" />
            <Label htmlFor="r1">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Sales" id="r2" />
            <Label htmlFor="r2">Sales</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Product" id="r3" />
            <Label htmlFor="r3">Product</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Compliance" id="r4" />
            <Label htmlFor="r4">Compliance</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Knowledge Center</h1>
          <Button>
            <PlusCircle className="mr-2" />
            New Content
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredContent.map((item, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader className="p-0 relative">
                 <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/20 hover:bg-black/40 text-white hover:text-white">
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  data-ai-hint={item.dataAiHint}
                  className="rounded-t-lg object-cover aspect-video"
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                <CardTitle className="text-lg leading-snug">{item.title}</CardTitle>
              </CardContent>
              <CardFooter className="p-4 flex justify-between items-center text-sm text-muted-foreground">
                <span>{item.updated}</span>
                <Button variant="outline" size="sm">
                  View {item.type}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
