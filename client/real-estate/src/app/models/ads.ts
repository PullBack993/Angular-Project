export interface IAds {
  _id: string;
  title: string;
  adType: string;
  estateType: string;
  price: number;
  location: string;
  imageUrls: string[];
  region: string;
  area: number;
  floor: number;
  constructionType: string;
  date: number;
  tags: string[];
  telNumber: number;
  moreInfo: string;
  isNewProject: boolean;

  likedUsers: string[];
  owner: string;
}

export interface IAdsDto {
  message: string;
  latestAds: IAds[];
  latestProjects: IAds[];
}

export interface IAdsCatalogDto {
  message: string;
  data: IAds[];
  total_pages: number;
  total_results: number;
}

export interface IAdDto {
  success: string;
  message: string;
  data: IAds;
}

export interface ICreateAd {
  _id: string;
  title: string;
  adType: string;
  estateType: string;
  price: number;
  location: string;
  imageUrls: string[];
  region: string;
  area: number;
  floor: number;
  constructionType: string;
  tags: string[];
  telNumber: number;
  moreInfo: string;
  isNewProject: boolean;
  owner: string;
}

export interface IConstructionType {
  type: string;
}

export interface ITags {
  tag: string;
}

export interface IAdType {
  type: string;
}

export interface IRegion {
  WN: { name: string }[];
  VRLB: { name: string }[];
  TL: { name: string }[];
  STM: { name: string }[];
  SLB: { name: string }[];
  OBOST: { name: string }[];
  NDOST: { name: string }[];
  KRTN: { name: string }[];
  BRGL: { name: string }[];
}
export interface ICity {
  name: string;
}

export interface ILocation {
  name: string;
  searchValue: string;
}
export interface ISearch {
  location?: string;
  adType?: string;
  estateType?: string;
  area?: number;
  price?: number;
  limit: number;
}
