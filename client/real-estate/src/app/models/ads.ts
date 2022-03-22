export interface Ads {
    _id: string,
  adType: string,
  estateType: string,
  price: number,
  rooms: number,
  location: string,
  imageUrls: string[],
  region:string,
  area: number,
  floor: number
  constructionType:string,
  date: number,
  telNumber:number,
  moreInfo: string
  isNewProject: boolean

  likedUsers: string[],
  owner:string
}