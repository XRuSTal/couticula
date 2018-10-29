import { EffectType } from '@enums';
import { Effect } from '@models';

export const Effects: Effect[] = [
  {
    effectType: EffectType.AttackWithIgnoringShield,
    name: 'Игнорирование щита',
    image: 'assets/img/effects/attack-with-ignoring-shield.jpg',
    description: 'Цель не получает броню за щит',
  },
  {
    effectType: EffectType.AttackWithPoisonWeak1,
    name: 'Яд',
    image: 'assets/img/effects/attack-with-poison.jpg',
    description: 'Шанс 1 из 6, урон 1',
  },
  {
    effectType: EffectType.BlockHeal,
    name: 'Проказа',
    image: 'assets/img/effects/block-heal.jpg',
    description: 'Не подвержен лечению до конца хода',
  },
  {
    effectType: EffectType.BreakingChests,
    name: 'Умелый взломщик',
    image: 'assets/img/effects/todo.jpg',
    description: '+1 к вскрытию сундуков',
  },
  {
    effectType: EffectType.Course,
    name: 'Проклятие',
    image: 'assets/img/effects/course.jpg',
    description: 'При атаке наносится минимальный урон (бросок равен 1).',
  },
  {
    effectType: EffectType.ForceBreakingChests,
    name: 'Крепкий взломщик',
    image: 'assets/img/effects/todo.jpg',
    description: '+1 к силовому вскрытию сундуков',
  },
  {
    effectType: EffectType.HideCreature,
    name: 'Существо скрыто',
    image: 'assets/img/effects/todo.jpg',
    description: 'Не может взаимодействовать с противником и стать целью атаки',
  },
  {
    effectType: EffectType.Imbecility,
    name: 'Скудоумие',
    image: 'assets/img/effects/imbecility.jpg',
    description: 'Атакует случайное существо',
  },
  {
    effectType: EffectType.MagicProtection,
    name: 'Магический щит',
    image: 'assets/img/effects/magic-protection.jpg',
    description: 'Защита от магических атак',
  },
  {
    effectType: EffectType.Poison1,
    name: 'Отравление',
    image: 'assets/img/effects/poisoned.jpg',
    description: 'Урон 1',
  },
  {
    effectType: EffectType.Regeneration5,
    name: 'Регенерация',
    image: 'assets/img/effects/regeneration.jpg',
    description: 'Восстановление 5 за ход',
  },
  {
    effectType: EffectType.RebirthSerpent,
    name: 'Возрождение змия',
    image: 'assets/img/effects/todo.jpg',
    description: '',
  },
  {
    effectType: EffectType.Slackness,
    name: 'Вялость',
    image: 'assets/img/effects/slackness.jpg',
    description: 'Урон снижается на 2',
  },
  {
    effectType: EffectType.Suppression,
    name: 'Подавление',
    image: 'assets/img/effects/suppression.jpg',
    description: 'Получение двойного урона',
  },
];
