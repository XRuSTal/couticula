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
    effectType: EffectType.BlockHeal,
    name: 'Проказа',
    img: 'assets/img/effects/block-heal.jpg',
    description: 'Не подвержен лечению до конца хода',
  },
  {
    effectType: EffectType.BreakingChests,
    name: 'Умелый взломщик',
    img: 'assets/img/effects/todo.jpg',
    description: '+1 к вскрытию сундуков',
  },
  {
    effectType: EffectType.Course,
    name: 'Проклятие',
    img: 'assets/img/effects/course.jpg',
    description: 'При атаке наносится минимальный урон (бросок равен 1).',
  },
  {
    effectType: EffectType.ForceBreakingChests,
    name: 'Крепкий взломщик',
    img: 'assets/img/effects/todo.jpg',
    description: '+1 к силовому вскрытию сундуков',
  },
  {
    effectType: EffectType.HideCreature,
    name: 'Существо скрыто',
    img: 'assets/img/effects/todo.jpg',
    description: 'Не может взаимодействовать с противником и стать целью атаки',
  },
  {
    effectType: EffectType.Imbecility,
    name: 'Скудоумие',
    img: 'assets/img/effects/imbecility.jpg',
    description: 'Атакует случайное существо',
  },
  {
    effectType: EffectType.MagicProtection,
    name: 'Магический щит',
    img: 'assets/img/effects/magic-protection.jpg',
    description: 'Защита от магических атак',
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
  {
    effectType: EffectType.Slackness,
    name: 'Вялость',
    img: 'assets/img/effects/slackness.jpg',
    description: 'Урон снижается на 2',
  },
  {
    effectType: EffectType.Suppression,
    name: 'Подавление',
    img: 'assets/img/effects/suppression.jpg',
    description: 'Получение двойного урона',
  },
];
