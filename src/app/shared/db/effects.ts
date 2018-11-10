import { EffectType } from '@enums';
import { Effect } from '@models';

export const Effects: Effect[] = [
  {
    effectType: EffectType.AttackOffset,
    name: 'Смещение атаки',
    image: 'assets/img/effects/attack-offset.jpg.jpg',
    description: 'При получении удара в голову, атака переходит в другую часть тела (1 раз за бой)',
  },
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
    effectType: EffectType.BlockDamage,
    name: 'Окаменение',
    image: 'assets/img/effects/block-damage.jpg',
    description: 'Не получает повреждений',
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
    effectType: EffectType.CreatureWithoutBody,
    name: 'Нет тела',
    image: 'assets/img/effects/creature-without-body.jpg',
    description: '',
  },
  {
    effectType: EffectType.CreatureWithoutHands,
    name: 'Нет рук',
    image: 'assets/img/effects/creature-without-hands.jpg',
    description: '',
  },
  {
    effectType: EffectType.CreatureWithoutHead,
    name: 'Нет головы',
    image: 'assets/img/effects/creature-without-head.jpg',
    description: '',
  },
  {
    effectType: EffectType.CreatureWithoutLegs,
    name: 'Нет ног',
    image: 'assets/img/effects/creature-without-legs.jpg',
    description: '',
  },
  {
    effectType: EffectType.Destructible13,
    name: 'Разрушимость',
    image: 'assets/img/effects/destructible.jpg',
    description: 'При получении 13 и более урона разрушается',
  },
  {
    effectType: EffectType.ForceBreakingChests,
    name: 'Крепкий взломщик',
    image: 'assets/img/effects/todo.jpg',
    description: '+1 к силовому вскрытию сундуков',
  },
  {
    effectType: EffectType.HealWithAllies,
    name: 'Совместное лечение',
    image: 'assets/img/effects/heal-with-allies.jpg',
    description: 'При лечении союзников лечит себе 4 жизни',
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
    effectType: EffectType.Shield,
    name: 'Щит',
    image: 'assets/img/effects/shield.jpg',
    description: '',
  },
  {
    effectType: EffectType.Slackness,
    name: 'Вялость',
    image: 'assets/img/effects/slackness.jpg',
    description: 'Урон снижается на 2',
  },
  {
    effectType: EffectType.Stan,
    name: 'Оглушение',
    image: 'assets/img/effects/stan.jpg',
    description: 'Пропуск следующего хода.',
  },
  {
    effectType: EffectType.Stan2,
    name: 'Оглушение',
    image: 'assets/img/effects/stan.jpg',
    description: 'Пропуск следующих 2х ходов.',
  },
  {
    effectType: EffectType.Suppression,
    name: 'Подавление',
    image: 'assets/img/effects/suppression.jpg',
    description: 'Получение двойного урона',
  },
  {
    effectType: EffectType.TargetAttackLegs,
    name: 'Прицельная атака',
    image: 'assets/img/effects/target-attack.jpg',
    description: 'Всегда атакует по ногам',
  },
  {
    effectType: EffectType.WounderHeal,
    name: 'Чудотворное лечение',
    image: 'assets/img/effects/wounder-heal.jpg',
    description: 'При выпадании 5 или 6 во время лечения - двойной эффект',
  },
];
