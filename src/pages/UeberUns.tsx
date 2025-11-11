
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Award, Clock, Flame, Sparkles } from "lucide-react";

export default function UeberUns() {
  const values = [
    {
      icon: Heart,
      title: "Leidenschaft",
      description: "Wir lieben was wir tun und geben jeden Tag unser Bestes für Ihre Zufriedenheit"
    },
    {
      icon: Award,
      title: "Qualität",
      description: "Nur die besten Zutaten und traditionelle Zubereitungsmethoden kommen zum Einsatz"
    },
    {
      icon: Users,
      title: "Gemeinschaft",
      description: "Bei uns steht der Gast im Mittelpunkt - Familie und Freunde sind willkommen"
    },
    {
      icon: Flame,
      title: "Tradition",
      description: "Authentische Rezepte die über Generationen weitergegeben wurden"
    }
  ];

  const milestones = [
    { year: "1990", event: "Gründung von Cinar Grill" },
    { year: "2000", event: "Expansion und Renovierung" },
    { year: "2010", event: "Auszeichnung als bestes Restaurant" },
    { year: "2020", event: "30 Jahre Tradition und Erfolg" },
  ];

  const team = [
    {
      name: "Mehmet Çınar",
      role: "Gründer & Küchenchef",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",
      description: "Mit über 40 Jahren Erfahrung in der türkischen Küche"
    },
    {
      name: "Ayşe Çınar",
      role: "Geschäftsführerin",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
      description: "Sorgt für den perfekten Service und Gastfreundschaft"
    },
    {
      name: "Ali Demir",
      role: "Sous Chef",
      image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&q=80",
      description: "Spezialist für Grillgerichte und Fleischzubereitung"
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--neutral-cream))]">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80')",
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
              <Sparkles className="w-5 h-5 mr-2" />
              Unsere Geschichte
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Über Cinar Grill
            </h1>

            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Eine Geschichte von Tradition, Familie und Leidenschaft für authentische türkische Küche
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Unsere Geschichte
            </h2>
            <div className="divider-gold" />
          </motion.div>

          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Im Jahr 1990 eröffnete Mehmet Çınar mit einer Vision das Cinar Grill:
              Authentische türkische Küche mit der Wärme und Gastfreundschaft seiner Heimat nach Deutschland zu bringen.
              Was als kleines Familienrestaurant begann, hat sich über die Jahre zu einer beliebten Institution entwickelt.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Unser Erfolgsgeheimnis? Die perfekte Balance aus traditionellen Rezepten,
              die über Generationen weitergegeben wurden, und der Verwendung frischester Zutaten.
              Jedes Gericht wird mit derselben Sorgfalt und Liebe zubereitet wie in Mehmets Heimat Anatolien.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Heute führt die Familie das Restaurant in zweiter Generation weiter.
              Die Holzkohlegrills brennen täglich, und der Duft von frisch gegrilltem Fleisch,
              aromatischen Gewürzen und selbstgebackenem Brot erfüllt unser Restaurant.
              Bei uns ist jeder Gast Teil unserer großen Familie.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[hsl(var(--neutral-cream))]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Unsere Werte
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Diese Prinzipien leiten uns jeden Tag und machen uns zu dem, was wir sind
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-premium p-8 text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary-500))] to-[hsl(var(--accent-terracotta))] flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="premium" className="mb-6 text-base px-6 py-3">
              <Clock className="w-5 h-5 mr-2" />
              Meilensteine
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Unsere Reise
            </h2>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-8"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-gold-light))] flex items-center justify-center text-2xl font-bold text-gray-900">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="p-6 glass-dark border border-white/10 rounded-2xl">
                    <p className="text-lg">{milestone.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Unser Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Die Menschen hinter dem Erfolg von Cinar Grill
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-premium overflow-hidden">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[hsl(var(--accent-gold))] font-semibold mb-2">
                        {member.role}
                      </p>
                      <p className="text-white/80 text-sm">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
