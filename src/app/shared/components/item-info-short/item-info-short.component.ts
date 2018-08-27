import { Component, Input } from '@angular/core';

import { Item } from '@models';

@Component({
  selector: 'item-info-short',
  templateUrl: 'item-info-short.component.html',
})
export class ItemInfoShortComponent {
  @Input() item: Item;

  get hasValue() {
    return this.item.value !== 0;
  }
}
