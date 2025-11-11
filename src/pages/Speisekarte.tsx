import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Leaf, Star, ChefHat, UtensilsCrossed } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  { id: "all", name: "Alle", icon: UtensilsCrossed },
  { id: "vorspeisen", name: "Vorspeisen", icon: ChefHat },
  { id: "hauptgerichte", name: "Hauptgerichte", icon: UtensilsCrossed },
  { id: "grillspezialitäten", name: "Grillspezialitäten", icon: Flame },
  { id: "vegetarisch", name: "Vegetarisch", icon: Leaf },
  { id: "beilagen", name: "Beilagen", icon: ChefHat },
  { id: "desserts", name: "Desserts", icon: Star },
  { id: "getränke", name: "Getränke", icon: UtensilsCrossed },
];

export default function Speisekarte() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ['menuItems'],
    queryFn: () => base44.entities.MenuItem.list(),
  });

  const filteredItems = selectedCategory === "all"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[hsl(var(--neutral-cream))]">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80')",
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
              <ChefHat className="w-5 h-5 mr-2" />
              Unsere Speisekarte
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Kulinarische Vielfalt
            </h1>

            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Entdecken Sie unsere große Auswahl an traditionellen türkischen Gerichten
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl shadow-lg">
        <div className="container-custom py-6">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "premium" : "outline"}
                  className="flex-shrink-0 rounded-full font-semibold transition-all"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="section-padding-sm">
        <div className="container-custom">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <ChefHat className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Keine Gerichte gefunden</h3>
              <p className="text-gray-600">
                In dieser Kategorie sind momentan keine Gerichte verfügbar.
              </p>
            </div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="card-premium h-full">
                      {item.image_url && (
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                          {item.is_popular && (
                            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[hsl(var(--accent-gold))] text-gray-900 text-sm font-bold flex items-center gap-1">
                              <Star className="w-4 h-4 fill-current" />
                              Beliebt
                            </div>
                          )}

                          <div className="absolute bottom-4 left-4 flex gap-2">
                            {item.is_spicy && (
                              <Badge className="bg-red-500 text-white border-none">
                                <Flame className="w-3 h-3 mr-1" />
                                Scharf
                              </Badge>
                            )}
                            {item.is_vegetarian && (
                              <Badge className="bg-green-500 text-white border-none">
                                <Leaf className="w-3 h-3 mr-1" />
                                Vegetarisch
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            {item.name}
                          </h3>
                          <span className="text-2xl font-bold text-[hsl(var(--primary-600))]">
                            €{item.price.toFixed(2)}
                          </span>
                        </div>

                        {item.description && (
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {item.description}
                          </p>
                        )}

                        {item.allergens && item.allergens.length > 0 && (
                          <div className="text-xs text-gray-500">
                            <span className="font-semibold">Allergene:</span> {item.allergens.join(", ")}
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
