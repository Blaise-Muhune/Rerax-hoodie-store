import { Component } from '@angular/core';
interface Item {
  name: string,
  imgUrl: string,
  price: number,
  description: string,
}
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})



export class ItemComponent {
  items: Item[] = [
    {
      name: 'Black Hoodie',
      imgUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1972&q=80',
      price: 40,
      description: 'Black cotton hoodie with front pocket',
    },
    {
      name: 'Gray Hoodie',
      imgUrl: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
      price: 30,
      description: 'Gray hoodie with a minimalistic design on the front',
    },
    {
      name: 'Blue Hoodie',
      imgUrl: 'https://images.unsplash.com/photo-1609873814058-a8928924184a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      price: 45,
      description: 'Blue hoodie with white stripes on the sleeves',
    },
    {
      name: 'Red Hoodie',
      imgUrl: 'https://plus.unsplash.com/premium_photo-1673826949187-a399c964340f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      price: 35,
      description: 'Red hoodie with a black pattern on the front',
    },
    {
      name: 'Green Hoodie',
      imgUrl: 'https://images.unsplash.com/photo-1565978771542-0db9ab9ad3de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      price: 50,
      description: 'Green hoodie with a small logo on the chest',
    },
    {
      name: 'Yellow Hoodie',
      imgUrl: 'https://images.unsplash.com/photo-1601063476271-a159c71ab0b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=626&q=80',
      price: 25,
      description: 'Yellow hoodie with a large graphic on the back',
    },
    {
      name: 'Purple Hoodie',
      imgUrl: 'https://images.unsplash.com/photo-1611817757591-c3f345024273?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      price: 55,
      description: 'Purple hoodie with a small logo on the chest',
    },
    {
      name: 'Pink Hoodie',
      imgUrl: 'https://images.unsplash.com/photo-1563899981-1c5ba5185ca2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=805&q=80',
      price: 30,
      description: 'Pink hoodie with a minimalist design on the front',
    },
    {
      name: 'Orange Hoodie',
      imgUrl: 'https://images.unsplash.com/photo-1633292750937-120a94f5c2bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      price: 40,
      description: 'Orange hoodie with a black pattern on the front',
    },
    {
      name: 'White Hoodie',
      imgUrl: 'https://images.unsplash.com/photo-1614214191247-5b2d3a734f1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      price: 35,
      description: 'White hoodie with a small logo on the chest',
    },
];

cart: string[] = []

constructor(){}

ngOnInit(): void{}

handleClick(){

  console.log(this.cart);
  
}
}
