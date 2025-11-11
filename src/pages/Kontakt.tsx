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
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const sendMessage = useMutation({
    mutationFn: (data: typeof formData) => base44.entities.ContactMessage.create(data),
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Nachricht erfolgreich gesendet!");
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }, 5000);
    },
    onError: () => {
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage.mutate(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Musterstraße 123\n12345 Musterstadt\nDeutschland"
    },
    {
      icon: Phone,
      title: "Telefon",
      content: "+49 123 456 7890",
      link: "tel:+491234567890"
    },
    {
      icon: Mail,
      title: "E-Mail",
      content: "info@cinargrill.de",
      link: "mailto:info@cinargrill.de"
    },
    {
      icon: Clock,
      title: "Öffnungszeiten",
      content: "Mo-Fr: 11:00 - 23:00\nSa-So: 12:00 - 00:00"
    }
  ];

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
              <Mail className="w-5 h-5 mr-2" />
              Kontakt
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Kontaktieren Sie uns
            </h1>

            <p className="text-xl text-white/90">
              Wir freuen uns auf Ihre Nachricht
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding-sm">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="card-premium p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--primary-500))] to-[hsl(var(--accent-terracotta))] flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-gray-900">{info.title}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-600 hover:text-[hsl(var(--primary-600))] transition-colors whitespace-pre-line"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <Card className="card-premium">
                {submitted ? (
                  <div className="p-12 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">
                      Vielen Dank!
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                      Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns schnellstmöglich bei Ihnen melden.
                    </p>
                  </div>
                ) : (
                  <div className="p-8 md:p-12">
                    <h2 className="text-3xl font-bold mb-2 text-gray-900">
                      Nachricht senden
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Haben Sie Fragen oder Anregungen? Schreiben Sie uns!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            placeholder="Ihr Name"
                            className="h-12 text-base focus-premium"
                          />
                        </div>

                        <div className="space-y-2">
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

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-base font-semibold">
                            Telefon
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder="+49 123 456 7890"
                            className="h-12 text-base focus-premium"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-base font-semibold">
                            Betreff
                          </Label>
                          <Input
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => handleChange("subject", e.target.value)}
                            placeholder="Betreff Ihrer Nachricht"
                            className="h-12 text-base focus-premium"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-base font-semibold">
                          Nachricht *
                        </Label>
                        <Textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          placeholder="Ihre Nachricht an uns..."
                          rows={6}
                          className="text-base focus-premium"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        variant="premium"
                        className="w-full text-lg py-7 rounded-full font-bold"
                        disabled={sendMessage.isPending}
                      >
                        <Send className="mr-2 w-5 h-5" />
                        {sendMessage.isPending ? "Wird gesendet..." : "Nachricht senden"}
                      </Button>
                    </form>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding-sm bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              So finden Sie uns
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Besuchen Sie uns im Herzen der Stadt
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl h-[500px] bg-gray-200"
          >
            {/* Placeholder for map - Replace with actual Google Maps embed */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white">
              <div className="text-center">
                <MapPin className="w-20 h-20 mx-auto mb-4 opacity-50" />
                <p className="text-xl font-semibold mb-2">Karte wird geladen...</p>
                <p className="text-gray-400">Musterstraße 123, 12345 Musterstadt</p>
              </div>
            </div>
            {/* For production, use actual Google Maps:
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            */}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
