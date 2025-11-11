import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, CheckCircle2, User } from "lucide-react";
import { toast } from "sonner";

export default function Reservierung() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    special_requests: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const createReservation = useMutation({
    mutationFn: (data: typeof formData) => base44.entities.Reservation.create(data),
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Reservierung erfolgreich!");
    },
    onError: () => {
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReservation.mutate(formData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const timeSlots = [
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-[hsl(var(--neutral-cream))] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full text-center"
        >
          <Card className="card-premium p-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Reservierung Bestätigt!
            </h2>

            <p className="text-xl text-gray-600 mb-8">
              Vielen Dank für Ihre Reservierung. Wir haben Ihre Anfrage erhalten und werden sie in Kürze bearbeiten.
              Sie erhalten eine Bestätigungs-E-Mail an <strong>{formData.email}</strong>.
            </p>

            <div className="bg-[hsl(var(--neutral-warm))] rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-lg mb-4 text-gray-900">Ihre Reservierungsdetails:</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[hsl(var(--primary-600))]" />
                  <span><strong>Datum:</strong> {formData.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[hsl(var(--primary-600))]" />
                  <span><strong>Uhrzeit:</strong> {formData.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[hsl(var(--primary-600))]" />
                  <span><strong>Personen:</strong> {formData.guests}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Bei Fragen erreichen Sie uns unter: <br />
              <strong>Telefon:</strong> +49 123 456 7890<br />
              <strong>E-Mail:</strong> info@cinargrill.de
            </p>

            <Button
              onClick={() => setSubmitted(false)}
              variant="premium"
              size="lg"
              className="rounded-full"
            >
              Neue Reservierung
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--neutral-cream))]">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="premium" className="mb-6 text-base px-6 py-3">
              <Calendar className="w-5 h-5 mr-2" />
              Reservierung
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Tisch Reservieren
            </h1>

            <p className="text-xl text-white/90">
              Sichern Sie sich Ihren Platz für ein unvergessliches kulinarisches Erlebnis
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="section-padding-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="card-premium">
              <div className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                      <User className="w-6 h-6 text-[hsl(var(--primary-600))]" />
                      Ihre Kontaktdaten
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-base font-semibold">
                          Name *
                        </Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Ihr vollständiger Name"
                          className="h-12 text-base focus-premium"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-base font-semibold">
                          Telefon *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder="+49 123 456 7890"
                          className="h-12 text-base focus-premium"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email" className="text-base font-semibold">
                          E-Mail *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="ihre.email@beispiel.de"
                          className="h-12 text-base focus-premium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Reservation Details */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-[hsl(var(--primary-600))]" />
                      Reservierungsdetails
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-base font-semibold">
                          Datum *
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => handleChange("date", e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="h-12 text-base focus-premium"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time" className="text-base font-semibold">
                          Uhrzeit *
                        </Label>
                        <select
                          id="time"
                          required
                          value={formData.time}
                          onChange={(e) => handleChange("time", e.target.value)}
                          className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-premium"
                        >
                          <option value="">Bitte wählen...</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot} Uhr
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="guests" className="text-base font-semibold">
                          Anzahl Personen *
                        </Label>
                        <Input
                          id="guests"
                          type="number"
                          required
                          min="1"
                          max="20"
                          value={formData.guests}
                          onChange={(e) => handleChange("guests", parseInt(e.target.value))}
                          className="h-12 text-base focus-premium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <Label htmlFor="special_requests" className="text-base font-semibold mb-2 block">
                      Besondere Wünsche (optional)
                    </Label>
                    <Textarea
                      id="special_requests"
                      value={formData.special_requests}
                      onChange={(e) => handleChange("special_requests", e.target.value)}
                      placeholder="z.B. Allergien, Hochstuhl benötigt, besondere Anlässe..."
                      rows={4}
                      className="text-base focus-premium"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    variant="premium"
                    className="w-full text-lg py-7 rounded-full font-bold"
                    disabled={createReservation.isPending}
                  >
                    {createReservation.isPending ? "Wird gesendet..." : "Jetzt Reservieren"}
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
