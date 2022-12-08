import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import currentWeek from '../week';
import { isBingo } from '../logic';

interface BoardState {
  tiles: (string | null)[] | null;
  bingos: number;
  selected: string[];
  week: number;
}

const initialState: BoardState = {
  tiles: null,
  bingos: 0,
  selected: [],
  week: 0,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setTiles: (state, action: PayloadAction<(string | null)[]>) => {
      state.tiles = action.payload;
      state.bingos = isBingo(action.payload, state.selected);
      state.week = currentWeek();
    },
    selectTile: (state, action: PayloadAction<string>) => {
      state.selected.push(action.payload);
      state.bingos = isBingo(state.tiles!, state.selected);
    },
    deselectTile: (state, action: PayloadAction<string>) => {
      state.selected = state.selected.filter((key) => key !== action.payload);
      state.bingos = isBingo(state.tiles!, state.selected);
    },
  },
});

export const { setTiles, selectTile, deselectTile } = boardSlice.actions;

export function selectTiles(state: RootState): (string | null)[] | null {
  return state.board.tiles;
}

export function selectSelected(state: RootState): string[] {
  return state.board.selected;
}

export function selectWeek(state: RootState): number {
  return state.board.week;
}

export function selectBingos(state: RootState): number {
  return state.board.bingos;
}

export default boardSlice.reducer;
