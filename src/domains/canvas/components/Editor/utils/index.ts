import { CELL, GRID } from '../constants';

export const toX = (col: number) => GRID.padding + (col - 1) * CELL;

export const toY = (row: number) => GRID.padding + (row - 1) * CELL;

export const toCol = (x: number) => Math.max(1, Math.min(GRID.columns, Math.round((x - GRID.padding) / CELL) + 1));

export const toRow = (y: number) => Math.max(1, Math.round((y - GRID.padding) / CELL) + 1);

export const wOf = (cs: number) => cs * GRID.cellSize + (cs - 1) * GRID.gap;

export const hOf = (rs: number) => rs * GRID.cellSize + (rs - 1) * GRID.gap;

export const clampC = (c: number, cs: number) => Math.max(1, Math.min(c, GRID.columns - cs + 1));
