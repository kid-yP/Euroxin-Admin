import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail } from "lucide-react"

const companies = [
  {
    name: "PharmaPlus Distributors",
    contact: { name: "John Doe", phone: "123-456-7890", email: "john@pharmaplus.com" },
    products: [
      { name: "Product A", stock: 150 },
      { name: "Product C", stock: 200 },
    ],
  },
  {
    name: "MediSupply Inc.",
    contact: { name: "Jane Smith", phone: "987-654-3210", email: "jane@medisupply.com" },
    products: [
      { name: "Product B", stock: 80 },
      { name: "Product D", stock: 120 },
    ],
  },
  {
    name: "HealthFirst Logistics",
    contact: { name: "Sam Wilson", phone: "555-123-4567", email: "sam@healthfirst.com" },
    products: [
      { name: "Product A", stock: 300 },
      { name: "Product B", stock: 50 },
      { name: "Product E", stock: 250 },
    ],
  },
]

export default function StockPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Visibility</CardTitle>
        <CardDescription>
          List of companies stocking Euroxin products and their contact information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {companies.map((company, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg font-medium hover:no-underline">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {company.name}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-secondary/30 rounded-md border">
                  <div>
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <p className="font-medium text-sm">{company.contact.name}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{company.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{company.contact.email}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Stocked Products</h4>
                    <ul className="space-y-1">
                      {company.products.map((product, pIndex) => (
                        <li key={pIndex} className="flex justify-between text-sm">
                          <span>{product.name}</span>
                          <span className="font-mono text-muted-foreground">
                            {product.stock} units
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
