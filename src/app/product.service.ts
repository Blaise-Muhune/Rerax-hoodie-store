import { Injectable } from '@angular/core';
import { Item } from './types/Item';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private Items: Item[] = [
    {
      id: 1,
      name: 'Black_Hoodie',
      imgUrl:
        'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1972&q=80',
      price: 40,
      description: 'Black cotton hoodie with front pocket',
      recentlyVisited: false,

      isWished: false,
      cartInfo: {
        addedTocartDate: '',
        addedToCart: false,
        howMany: 0,
      },
      size: [{ label: '', numberIncart: 0 }],
      xs: false,
      s: true,
      m: true,
      l: true,
      xl: true,
      xxl: true,

      currentIndex: [-1],
    },
    {
      id: 2,
      name: 'Gray_Hoodie',
      imgUrl:
        'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
      price: 30,
      description: 'Gray hoodie with a minimalistic design on the front',
      isWished: false,
      recentlyVisited: false,

      cartInfo: {
        addedTocartDate: '',
        addedToCart: false,
        howMany: 0,
      },
      size: [{ label: '', numberIncart: 0 }],
      xs: true,
      s: true,
      m: true,
      l: true,
      xl: true,
      xxl: true,
      currentIndex: [-1],
    },
    {
      id: 3,
      name: 'Blue_Hoodie',
      imgUrl:
        'https://images.unsplash.com/photo-1609873814058-a8928924184a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      price: 45,
      description: 'Blue hoodie with white stripes on the sleeves',
      isWished: false,
      recentlyVisited: false,

      cartInfo: {
        addedTocartDate: '',
        addedToCart: false,
        howMany: 0,
      },
      size: [{ label: '', numberIncart: 0 }],
      xs: true,
      s: true,
      m: true,
      l: true,
      xl: true,
      xxl: true,
      currentIndex: [-1],
    },
    {
      id: 4,
      name: 'Red_Hoodie',
      imgUrl:
        'https://plus.unsplash.com/premium_photo-1673826949187-a399c964340f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      price: 35,
      description: 'Red hoodie with a black pattern on the front',
      isWished: false,
      recentlyVisited: false,

      cartInfo: {
        addedTocartDate: '',
        addedToCart: false,
        howMany: 0,
      },
      size: [{ label: '', numberIncart: 0 }],
      xs: true,
      s: true,
      m: true,
      l: true,
      xl: true,
      xxl: true,
      currentIndex: [-1],
    },
    {
      id: 5,
      name: 'Green_Hoodie',
      imgUrl:
        'https://images.unsplash.com/photo-1565978771542-0db9ab9ad3de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      price: 50,
      description: 'Green hoodie with a small logo on the chest',
      isWished: false,
      recentlyVisited: false,
      cartInfo: {
        addedTocartDate: '',
        addedToCart: false,
        howMany: 0,
      },
      size: [{ label: '', numberIncart: 0 }],
      xs: true,
      s: true,
      m: true,
      l: true,
      xl: true,
      xxl: true,
      currentIndex: [-1],
    },
    {
      id: 6,
      name: 'Yellow_Hoodie',
      imgUrl:
        'https://images.unsplash.com/photo-1601063476271-a159c71ab0b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=626&q=80',
      price: 25,
      description: 'Yellow hoodie with a large graphic on the back',
      isWished: false,
      recentlyVisited: false,

      cartInfo: {
        addedTocartDate: '',
        addedToCart: false,
        howMany: 0,
      },
      size: [{ label: '', numberIncart: 0 }],
      xs: true,
      s: true,
      m: true,
      l: true,
      xl: true,
      xxl: true,
      currentIndex: [-1],
    },
    {
      id: 7,
      name: 'Purple_Hoodie',
      imgUrl:
        'https://images.unsplash.com/photo-1611817757591-c3f345024273?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      price: 55,
      description: 'Purple hoodie with a small logo on the chest',
      isWished: false,
      recentlyVisited: false,

      cartInfo: {
        addedTocartDate: '',
        addedToCart: false,
        howMany: 0,
      },
      size: [{ label: '', numberIncart: 0 }],
      xs: true,
      s: true,
      m: true,
      l: true,
      xl: true,
      xxl: true,
      currentIndex: [-1],
    },
    {
      id: 8,
      name: 'Pink_Hoodie',
      imgUrl:
        'https://images.unsplash.com/photo-1563899981-1c5ba5185ca2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=805&q=80',
      price: 30,
      description: 'Pink hoodie with a minimalist design on the front',
      isWished: false,
      recentlyVisited: false,

      cartInfo: {
        addedTocartDate: '',
        addedToCart: false,
        howMany: 0,
      },
      size: [{ label: '', numberIncart: 0 }],
      xs: true,
      s: true,
      m: true,
      l: true,
      xl: true,
      xxl: true,
      currentIndex: [-1],
    },
    {
      id: 9,
      name: 'Orange_Hoodie',
      imgUrl:
        'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      price: 40,
      description: 'Orange hoodie with a black pattern on the front',
      isWished: false,
      recentlyVisited: false,

      cartInfo: {
        addedTocartDate: '',
        addedToCart: false,
        howMany: 0,
      },
      size: [{ label: '', numberIncart: 0 }],
      xs: true,
      s: true,
      m: true,
      l: true,
      xl: true,
      xxl: true,
      currentIndex: [-1],
    },
  ];

  constructor() {}

  getAllProducts(): any[] {
    return this.Items;
  }

  getProductById(id: number): any {
    return this.Items.find((item) => item.id === id);
  }
}
