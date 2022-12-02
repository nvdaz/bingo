import ColorScale from 'color-scales';

type Rarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

const rarityColorScale = new ColorScale(0, 1, [
  '#f6f6f6',
  '#abcaff',
  '#a63fff',
  '#ff8330',
  '#ff4040',
]);

export function rarityName(rarity: number): Rarity {
  if (rarity < 0 || rarity > 1) {
    throw new Error('Invalid rarity.');
  }

  if (rarity > 0.8) {
    return 'LEGENDARY';
  } else if (rarity > 0.6) {
    return 'EPIC';
  } else if (rarity > 0.4) {
    return 'RARE';
  } else if (rarity > 0.2) {
    return 'UNCOMMON';
  }

  return 'COMMON';
}

export function rarityColor(rarity: number) {
  if (rarity < 0 || rarity > 1) {
    throw new Error('Invalid rarity.');
  }

  return rarityColorScale.getColor(rarity).toHexString();
}
