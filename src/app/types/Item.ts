export interface Item {
  id: number;
  name: string;
  imgUrl: string;
  price: number;
  description: string;
  isWished: boolean;
  recentlyVisited: boolean;
  cartInfo: {
    addedToCart: boolean;
    addedTocartDate: string;
    howMany: number;
  };
  size: [[string, number]];
  currentIndex: [number];
}
