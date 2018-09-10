import { SearchEventType } from '@enums';

export interface EventSearch {
  type: SearchEventType;
  text: string;
  dice?: number;
}
