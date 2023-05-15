import { Component, Input } from '@angular/core';
import { Item } from '../types/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})



export class ItemComponent {
 @Input() item: Item = {} as Item;

 constructor(){}

 ngOnInit():void{}
 handleClick(){

  console.log('holla');
  
}
}
