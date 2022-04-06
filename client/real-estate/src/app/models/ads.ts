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
  OBLG: { name: string }[];
  GBLG: { name: string }[];
  GBG: { name: string }[];
  OBG: { name: string }[];
  GVR: { name: string }[];
  OVR: { name: string }[];
  GVT: { name: string }[];
  OVT: { name: string }[];
  GVD: { name: string }[];
  OVD: { name: string }[];
  GVC: { name: string }[];
  OVC: { name: string }[];
  GGB: { name: string }[];
  OGB: { name: string }[];
  GDB: { name: string }[];
  ODB: { name: string }[];
  GKJ: { name: string }[];
  OKJ: { name: string }[];
  GKL: { name: string }[];
  OKL: { name: string }[];
  GLC: { name: string }[];
  OLC: { name: string }[];
  GMN: { name: string }[];
  OMN: { name: string }[];
  GPZ: { name: string }[];
  OPZ: { name: string }[];
  GPR: { name: string }[];
  OPR: { name: string }[];
  GPLN: { name: string }[];
  OPLN: { name: string }[];
  GPL: { name: string }[];
  OPL: { name: string }[];
  GRZ: { name: string }[];
  ORZ: { name: string }[];
  GR: { name: string }[];
  OR: { name: string }[];
  GSL: { name: string }[];
  OSL: { name: string }[];
  GS: { name: string }[];
  OS: { name: string }[];
  GSM: { name: string }[];
  OSM: { name: string }[];
  GSO: { name: string }[];
  OSO: { name: string }[];
  GST: { name: string }[];
  OST: { name: string }[];
  GTRG: { name: string }[];
  OTRG: { name: string }[];
  GX: { name: string }[];
  OX: { name: string }[];
  GSH: { name: string }[];
  OSH: { name: string }[];
  GQ: { name: string }[];
  OQ: { name: string }[];
}
export interface ICity {
  name: string;
}

export interface IAd2 {
  name: string;
  searchValue: string;
}
