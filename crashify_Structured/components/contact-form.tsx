"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsSubmitting(false);
      toast({
        title: "Anfrage gesendet",
        description: "Vielen Dank für Ihr Interesse. Wir werden uns in Kürze bei Ihnen melden.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      toast({
        title: "Fehler beim Senden",
        description: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.",
        variant: 'destructive',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-gray-700">Vorname</Label>
          <Input id="firstName" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-gray-700">Nachname</Label>
          <Input id="lastName" required className="mt-1" />
        </div>
      </div>
      <div>
        <Label htmlFor="email" className="text-gray-700">E-Mail</Label>
        <Input id="email" type="email" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="phone" className="text-gray-700">Telefon</Label>
        <Input id="phone" type="tel" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="company" className="text-gray-700">Unternehmen</Label>
        <Input id="company" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="interest" className="text-gray-700">Ich interessiere mich für</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Bitte wählen Sie eine Option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gutachter">Gutachter werden</SelectItem>
            <SelectItem value="reparaturbetrieb">Reparaturbetrieb</SelectItem>
            <SelectItem value="sonstige">Sonstige</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="message" className="text-gray-700">Nachricht</Label>
        <Textarea id="message" rows={4} className="mt-1" />
      </div>
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
        {isSubmitting ? "Wird gesendet..." : "Anfrage senden"}
      </Button>
    </form>
  )
}

