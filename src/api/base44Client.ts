/**
 * Base44 API Client
 * Mock implementation for demonstration
 * Replace with actual API implementation in production
 */

export interface MenuItem {
  id: string;
  name: string;
  name_de?: string;
  name_tr?: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  allergens?: string[];
  is_spicy?: boolean;
  is_vegetarian?: boolean;
  is_vegan?: boolean;
  is_popular?: boolean;
}

export interface Reservation {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  special_requests?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status?: 'neu' | 'gelesen' | 'beantwortet';
}

// Mock data for demonstration
const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Adana Kebab',
    description: 'Pikant gewürztes Hackfleisch vom Holzkohlegrill',
    price: 14.90,
    category: 'grillspezialitäten',
    image_url: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80',
    is_spicy: true,
    is_popular: true,
  },
  {
    id: '2',
    name: 'Kuzu Şiş',
    description: 'Zartes Lammfleisch mariniert mit orientalischen Gewürzen',
    price: 16.90,
    category: 'grillspezialitäten',
    image_url: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80',
    is_popular: true,
  },
  {
    id: '3',
    name: 'Karışık Izgara',
    description: 'Gemischte Grillplatte mit verschiedenen Spezialitäten',
    price: 18.90,
    category: 'grillspezialitäten',
    image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
  },
  {
    id: '4',
    name: 'Lahmacun',
    description: 'Türkische Pizza mit Hackfleisch und frischen Kräutern',
    price: 6.50,
    category: 'vorspeisen',
    image_url: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80',
    is_spicy: true,
  },
  {
    id: '5',
    name: 'Hummus',
    description: 'Kichererbsenpüree mit Tahini, Olivenöl und Gewürzen',
    price: 5.90,
    category: 'vorspeisen',
    image_url: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=800&q=80',
    is_vegetarian: true,
    is_vegan: true,
  },
  {
    id: '6',
    name: 'Sigara Böreği',
    description: 'Knusprige Teigrollen gefüllt mit Schafskäse',
    price: 7.50,
    category: 'vorspeisen',
    is_vegetarian: true,
  },
  {
    id: '7',
    name: 'Mercimek Çorbası',
    description: 'Traditionelle rote Linsensuppe',
    price: 4.90,
    category: 'vorspeisen',
    image_url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
    is_vegetarian: true,
    is_vegan: true,
  },
  {
    id: '8',
    name: 'Tavuk Şiş',
    description: 'Gegrillte Hähnchen-Spieße mit Paprika und Zwiebeln',
    price: 13.90,
    category: 'grillspezialitäten',
    image_url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80',
  },
  {
    id: '9',
    name: 'Köfte',
    description: 'Hausgemachte Hackfleischbällchen mit Gewürzen',
    price: 12.90,
    category: 'hauptgerichte',
    is_popular: true,
  },
  {
    id: '10',
    name: 'Patlıcan Kebap',
    description: 'Auberginen-Kebap mit Hackfleisch',
    price: 14.50,
    category: 'hauptgerichte',
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
  },
  {
    id: '11',
    name: 'İmam Bayıldı',
    description: 'Gefüllte Auberginen mit Gemüse und Olivenöl',
    price: 11.90,
    category: 'vegetarisch',
    is_vegetarian: true,
    is_vegan: true,
  },
  {
    id: '12',
    name: 'Bulgur Pilavı',
    description: 'Bulgur-Reis mit Tomaten und Paprika',
    price: 4.50,
    category: 'beilagen',
    is_vegetarian: true,
    is_vegan: true,
  },
  {
    id: '13',
    name: 'Çoban Salatası',
    description: 'Türkischer Hirtensalat mit frischem Gemüse',
    price: 5.90,
    category: 'beilagen',
    is_vegetarian: true,
    is_vegan: true,
  },
  {
    id: '14',
    name: 'Künefe',
    description: 'Süßes Dessert mit Käse und Sirup',
    price: 7.90,
    category: 'desserts',
    image_url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80',
    is_popular: true,
  },
  {
    id: '15',
    name: 'Baklava',
    description: 'Traditionelles Gebäck mit Nüssen und Honig',
    price: 6.50,
    category: 'desserts',
  },
  {
    id: '16',
    name: 'Ayran',
    description: 'Erfrischendes Joghurtgetränk',
    price: 2.90,
    category: 'getränke',
  },
  {
    id: '17',
    name: 'Türkischer Tee',
    description: 'Traditioneller schwarzer Tee im Glas',
    price: 2.50,
    category: 'getränke',
  },
  {
    id: '18',
    name: 'Türkischer Mokka',
    description: 'Starker Mokka nach traditioneller Art',
    price: 3.50,
    category: 'getränke',
  },
];

// API Client
export const base44 = {
  entities: {
    MenuItem: {
      list: async (): Promise<MenuItem[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockMenuItems;
      },
      get: async (id: string): Promise<MenuItem | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockMenuItems.find(item => item.id === id);
      },
    },
    Reservation: {
      create: async (data: Reservation): Promise<Reservation> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
          ...data,
          id: `res-${Date.now()}`,
          status: 'pending',
        };
      },
    },
    ContactMessage: {
      create: async (data: ContactMessage): Promise<ContactMessage> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
          ...data,
          id: `msg-${Date.now()}`,
          status: 'neu',
        };
      },
    },
  },
};
