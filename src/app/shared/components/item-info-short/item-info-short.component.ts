import { Component, Input } from '@angular/core';

import { Item } from '@models';

@Component({
  selector: 'item-info-short',
  templateUrl: 'item-info-short.component.html',
  styleUrls: ['item-info-short.component.scss'],
})
export class ItemInfoShortComponent {
  @Input()
  item: Item;

  get isValueShown() {
    return Item.checkItemTypeOnEquipment(this.item.type) && this.item.value;
  }
  get backgroundColor() {
    return Item.getItemColor(this.item.value);
  }
  get hasValue() {
    return this.item.value !== 0;
  }
}
