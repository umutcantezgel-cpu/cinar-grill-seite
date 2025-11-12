export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical: string;
  robots?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

export interface StructuredDataRestaurant {
  '@type': 'Restaurant';
  name: string;
  description?: string;
  image?: string | string[];
  servesCuisine: string;
  priceRange: string;
  telephone?: string;
  address?: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    reviewCount: string;
    bestRating?: string;
    worstRating?: string;
  };
  openingHoursSpecification?: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
}

export interface StructuredDataReview {
  '@type': 'Review';
  author: {
    '@type': 'Person';
    name: string;
  };
  reviewRating: {
    '@type': 'Rating';
    ratingValue: string;
    bestRating: string;
  };
  reviewBody: string;
  datePublished?: string;
}

export interface StructuredDataBreadcrumb {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}
