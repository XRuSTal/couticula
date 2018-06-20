import { AvailableHitPointsPipe } from './available-hitpoints.pipe';
import { AvailableItemsPipe } from './available-items.pipe';
//import { availablePricePipe } from './available-price.pipe';
import { ItemCountPipe } from './item-count.pipe';

const SHARED_PIPES: any[] = [
  AvailableHitPointsPipe,
  AvailableItemsPipe,
  ItemCountPipe
]

export {
  SHARED_PIPES,
  AvailableHitPointsPipe,
  AvailableItemsPipe,
  ItemCountPipe
}
