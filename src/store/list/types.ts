export type AssetAbout = {
  releaseDate: string;
  make: string;
  model: string;
  creator: string;
  exclusivity: string;
  condition: string;
};

export type AssetFinancialSpecs = {
  price: number;
  actualPrice: number;
  totalShares: number;
  pricePerShare: number;
  sharesSold: number;
  averageMarketPrice: number;
  pricePerformancePercentage: number | null;
};

export type AnnualHistoricalReturns = {
  annualReturn: number;
  inflationRate: number;
  originalSellingPrice: number;
  timePeriod: number;
};

export type AssetHighlightsItem = {
  id: string;
  title: string;
  content: string;
  image: string;
};

export type AssetDocumentsItem = {
  id: string;
  assetId: string;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  type: string;
};

export type AssetGalleryItem = {
  id: string;
  assetId: string;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  type: string;
};

export type AssetSectionImagesItem = {
  id: string;
  assetId: string;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  type: string;
};

export type AssetNewsItem = {
  id: string;
  title: string;
  content: string;
  image: string;
};

export type ListItemDetail = {
  id: string;
  label: string;
  heroImage: string;
  heroImageThumbnail: string;
  heroColour: string;
  type: string;
  status: string;
  tradingWindowStartDate: string;
  tradingWindowStartTime: string;
  tradingWindowEndTime: string;
  dropDate: string;
  assetAbout: AssetAbout;
  assetFinancialSpecs: AssetFinancialSpecs;
  annualHistoricalReturns: AnnualHistoricalReturns;
  maxSharesPerTransaction: number;
  feePercentage: 4;
  assetHighlights: Array<AssetHighlightsItem>;
  assetDocuments: Array<AssetDocumentsItem>;
  assetGallery: Array<AssetGalleryItem>;
  assetSectionImages: Array<AssetSectionImagesItem>;
  assetNews: Array<AssetNewsItem>;
  costCenter: string;
  webLink: string;
  taxType: string;
  tradingFee: number | null;
  averageMarketPrice: number;
  pricePerformancePercentage: number | null;
  tradingHeaderImage: number | null;
};

export type ListItem = {
  availableOffers: number;
  averageMarketPrice: number;
  dropDate: string;
  heroColour: string;
  heroImage: string;
  heroImageThumbnail: string;
  id: string;
  images: {
    medium: string;
    mediumAlt: string;
    mediumFlatten: string;
    placeholder: string;
    thumbnail: string;
    thumbnailAlt: string;
    thumbnailFlatten: string;
  };
  isHidden: boolean;
  label: string;
  order: number;
  pricePerformancePercentage: number | null;
  status: string;
  tradingWindowStartDate: string;
  tradingWindowStartTime: string;
  type: string;
};
