export function isBingo(tiles: (string | null)[], selected: string[]) {
  let bingos = 0;
  for (let i = 0; i < 25; i += 5) {
    let every = true;
    for (let j = 0; j < 5; j++) {
      const tile = tiles[i + j];
      if (tile !== null && !selected.includes(tile)) every = false;
    }
    if (every) bingos++;
  }

  for (let i = 0; i < 5; i++) {
    let every = true;
    for (let j = 0; j < 25; j += 5) {
      const tile = tiles[i + j];
      if (tile !== null && !selected.includes(tile)) every = false;
    }
    if (every) bingos++;
  }

  if (
    [0, 6, 12, 18, 24].every((i) => {
      const tile = tiles[i];
      return tile === null || selected.includes(tile);
    })
  )
    bingos++;
  if (
    [4, 8, 12, 16, 20].every((i) => {
      const tile = tiles[i];
      return tile === null || selected.includes(tile);
    })
  )
    bingos++;

  return bingos;
}
