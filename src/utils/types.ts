export interface Price {
  currencyCode: string;
  wasPriceIncTax?: number;
  wasPriceExcTax?: number;
  priceIncTax: number;
  priceExcTax: number;
  isOnPromotion: boolean;
  monthlyFinanceEstimate: number;
  discountPercentage: number;
}

export interface Image {
  url: string;
  imageAltText: string;
}

export interface StockStatus {
  status: string;
  eta: string;
  stockLevel: string;
}

export interface Brand {
  brandImage: {
    attributes: {
      imageAltText: string;
    };
    url: string;
  };
  imageAltText: string;
}

export interface Attributes {
  hasMoreOptions: boolean;
  hasOneOutlet: boolean;
  hasThreeOutlets: boolean;
  hasTwoOutlets: boolean;
  isAntiSlipIncluded: boolean;
  isApproved: boolean;
  isBatteryIncluded: boolean;
  isBestSeller: boolean;
  isBluetoothIncluded: boolean;
  isFreeWaste: boolean;
  isNew: boolean;
  isPremium: boolean;
  isRecommended: boolean;
  isShortProjection: boolean;
  isShownOnTv: boolean;
  isTrayIncluded: boolean;
  isWaterProof: boolean;
}

export interface Product {
  productName: string;
  price: Price;
  image: {
    url: string;
    imageAltText: string;
  };
  attributes: {
    hasMoreOptions: boolean;
    hasOneOutlet: boolean;
    hasThreeOutlets: boolean;
    hasTwoOutlets: boolean;
    isAntiSlipIncluded: boolean;
    isApproved: boolean;
    isBatteryIncluded: boolean;
    isBestSeller: boolean;
    isBluetoothIncluded: boolean;
    isFreeWaste: boolean;
    isNew: boolean;
    isPremium: boolean;
    isRecommended: boolean;
    isShortProjection: boolean;
    isShownOnTv: boolean;
    isTrayIncluded: boolean;
    isWaterProof: boolean;
  };
  brand: Brand;
  stockStatus: StockStatus;
  reviewsCount: number;
  averageRating: number;
}
