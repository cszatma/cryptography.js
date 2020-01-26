import { Action } from '../actions/mod.ts';

export type Grid = string[][];

export const emptyGrid = (rows: number, columns: number = rows): Grid =>
  new Array<string[]>(rows).fill(new Array(columns));

// Rearranges the rows of the grid based on the given order
export const rearrangeGrid = (grid: Grid, order: number[]): Grid => {
  const resultGrid = emptyGrid(8);

  order.forEach((val, index) => {
    resultGrid[val] = grid[index];
  });

  return resultGrid;
};

// Switches the rows and columns of the grid
export const gridTranspose = (grid: Grid): Grid =>
  grid[0].map((col, i) => grid.map(row => row[i]));

export const generateGrid = (text: string): string[][] =>
  text.match(/.{1,8}/g)!.map(group => group.split(''));

export const gridToString = (
  grid: string[][],
  order: number[],
  action: Action,
): string => {
  if (action === Action.decrypt) {
    grid = rearrangeGrid(grid, order);
  }

  const transpose = gridTranspose(grid);
  const sequence = action === Action.encrypt ? order : [...Array(8).keys()];

  return sequence.map(index => transpose[index].join('')).join('');
};
