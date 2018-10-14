import { EffectType } from '@enums';
import { Effect } from '@models';

export const Effects: Effect[] = [
  {
    effectType: EffectType.AttackWithIgnoringShield,
    name: 'Игнорирование щита',
    img: 'assets/img/effects/attack-with-ignoring-shield.jpg',
    description: 'Цель не получает броню за щит',
  },
  {
    effectType: EffectType.AttackWithPoisonWeak1,
    name: 'Яд',
    img: 'assets/img/effects/attack-with-poison.jpg',
    description: 'Шанс 1 из 6, урон 1',
  },
  {
    effectType: EffectType.BreakingChests,
    name: 'Умелый взломщик',
    img: 'assets/img/effects/todo.jpg',
    description: '+1 к вскрытию сундуков',
  },
  {
    effectType: EffectType.ForceBreakingChests,
    name: 'Крепкий взломщик',
    img: 'assets/img/effects/todo.jpg',
    description: '+1 к силовому вскрытию сундуков',
  },
  {
    effectType: EffectType.Poison1,
    name: 'Отравление',
    img: 'assets/img/effects/poisoned.jpg',
    description: 'Урон 1',
  },
  {
    effectType: EffectType.Regeneration5,
    name: 'Регенерация',
    img: 'assets/img/effects/regeneration.jpg',
    description: 'Восстановление 5 за ход',
  },
  {
    effectType: EffectType.RebirthSerpent,
    name: 'Возрождение змия',
    img: 'assets/img/effects/todo.jpg',
    description: '',
  },
];
