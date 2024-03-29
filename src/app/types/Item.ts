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
  size: [{ label: string; numberIncart: number }];
  currentIndex: [number];
  xs: boolean;
  s: boolean;
  m: boolean;
  l: boolean;
  xl: boolean;
  xxl: boolean;
}
