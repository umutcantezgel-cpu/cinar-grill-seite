import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Camera } from "lucide-react";

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    title: "Atmosphäre",
    category: "restaurant"
  },
  {
    url: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80",
    title: "Adana Kebab",
    category: "food"
  },
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    title: "Innenbereich",
    category: "restaurant"
  },
  {
    url: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80",
    title: "Grill Spezialitäten",
    category: "food"
  },
  {
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    title: "Mezze Platte",
    category: "food"
  },
  {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    title: "Gemütliche Ecke",
    category: "restaurant"
  },
  {
    url: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80",
    title: "Lahmacun",
    category: "food"
  },
  {
    url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
    title: "Hauptsaal",
    category: "restaurant"
  },
  {
    url: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=800&q=80",
    title: "Frische Zutaten",
    category: "food"
  },
  {
    url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    title: "Bar Bereich",
    category: "restaurant"
  },
  {
    url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80",
    title: "Künefe Dessert",
    category: "food"
  },
  {
    url: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
    title: "Am Grill",
    category: "grill"
  }
];

export default function Galerie() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [filter, setFilter] = useState("all");

  const filteredImages = filter === "all"
    ? galleryImages
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-[hsl(var(--neutral-cream))]">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
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
              <Camera className="w-5 h-5 mr-2" />
              Bildergalerie
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Impressionen
            </h1>

            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Tauchen Sie ein in die Welt von Cinar Grill
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl shadow-lg py-6">
        <div className="container-custom">
          <div className="flex gap-3 justify-center flex-wrap">
            {[
              { id: "all", label: "Alle" },
              { id: "food", label: "Gerichte" },
              { id: "restaurant", label: "Restaurant" },
              { id: "grill", label: "Grill" }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filter === cat.id
                    ? 'bg-gradient-to-r from-[hsl(var(--accent-gold))] to-[hsl(var(--accent-gold-light))] text-gray-900 shadow-lg'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[hsl(var(--primary-600))]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding-sm">
        <div className="container-custom">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.url}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className={index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}
                >
                  <Card
                    className="overflow-hidden cursor-pointer group border-none shadow-lg hover:shadow-2xl transition-all duration-300"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className={`relative overflow-hidden ${index % 5 === 0 ? 'h-96 md:h-full' : 'h-80'}`}>
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-bold text-white">{image.title}</h3>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 rounded-full glass hover:bg-white/20 flex items-center justify-center transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mt-6"
              >
                <h3 className="text-3xl font-bold text-white">{selectedImage.title}</h3>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
