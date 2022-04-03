
export interface IUserDto {
  token: string;
  expiresIn: number;
  userData: {
    email: string;
    id: string;
    isAdmin: boolean;
    isBroker: boolean;
    isNew: boolean;
    likedAd: string[];
    username: string;
  };
}