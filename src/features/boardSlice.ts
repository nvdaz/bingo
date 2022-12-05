import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import currentWeek from '../week';

interface BoardState {
  tiles: (string | null)[] | null;
  selected: string[];
  week: number;
}

const initialState: BoardState = {
  tiles: null,
  selected: [],
  week: 0,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setTiles: (state, action: PayloadAction<(string | null)[]>) => {
      state.tiles = action.payload;
      state.week = currentWeek();
    },
    selectTile: (state, action: PayloadAction<string>) => {
      state.selected.push(action.payload);
    },
    deselectTile: (state, action: PayloadAction<string>) => {
      state.selected = state.selected.filter((key) => key !== action.payload);
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

export default boardSlice.reducer;
