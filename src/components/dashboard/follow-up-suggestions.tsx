"use client"

import { useState, useTransition } from "react"
import { suggestFollowUpActions } from "@/ai/flows/suggest-follow-up-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { List, Sparkles, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function FollowUpSuggestions() {
  const [isPending, startTransition] = useTransition()
  const [notes, setNotes] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const { toast } = useToast()

  const handleSuggestFollowUp = () => {
    startTransition(async () => {
      if (!notes.trim()) {
        toast({
          title: "Error",
          description: "Please enter some visit notes first.",
          variant: "destructive",
        })
        return
      }
      try {
        const result = await suggestFollowUpActions({ visitNotes: notes })
        setSuggestions(result.followUpSuggestions || [])
      } catch (error) {
        console.error("AI suggestion error:", error)
        toast({
          title: "Error",
          description: "Failed to get AI suggestions. Please try again.",
          variant: "destructive",
        })
        setSuggestions([])
      }
    })
  }

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <CardTitle>AI Follow-up Suggestions</CardTitle>
        </div>
        <CardDescription>
          Enter your visit notes and let AI suggest the next steps.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full gap-2">
          <Label htmlFor="visit-notes">Visit Notes</Label>
          <Textarea
            id="visit-notes"
            placeholder="e.g., Client showed interest in Product X, asked for pricing details..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </div>
        {suggestions.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Suggested Actions:</h4>
            <ul className="space-y-2 rounded-md border bg-secondary/50 p-4">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3">
                  <List className="h-4 w-4 mt-1 shrink-0 text-primary" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSuggestFollowUp} disabled={isPending}>
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Suggestions
        </Button>
      </CardFooter>
    </Card>
  )
}
