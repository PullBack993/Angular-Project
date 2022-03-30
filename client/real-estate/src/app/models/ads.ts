export interface IAds {
  _id: string;
  title: string,
  adType: string;
  estateType: string;
  price: number;
  rooms: number;
  location: string;
  imageUrls: string[];
  region: string;
  area: number;
  floor: number;
  constructionType: string;
  date: number;
  tags: string,
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

export interface IAdsCatalogDto{
  message: string;
  data: IAds[];
  total_pages: number;
  total_results: number;
}

export interface ICreateAd {
  title: string;
  adType: string;
  estateType: string;
  price: number;
  rooms: number;
  location: string;
  imageUrls: string[];
  region: string;
  area: number;
  floor: number;
  constructionType: string;
  tags: string;
  telNumber: number;
  moreInfo: string;
  isNewProject: boolean;
}