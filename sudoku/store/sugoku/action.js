import { SUGOKU_GET } from "./actionType";

function getSugoku(board) {
  return {
    type: SUGOKU_GET,
    payload: board
  }
}

export function getSugokuCreator(sugokuURL, difficulty) {
  return async function (dispatch, _) {
    try {
      const response = await fetch(`${sugokuURL}/board?difficulty=${difficulty}`);
      if (!response.ok)
        throw new Error(`Error ${response.status}: Failed to generate board`);
      const { board } = await response.json();
      dispatch(getSugoku(board));
    } catch (error) {
      throw error.message;
    }
  }
}
// NOTE: validate => return status: solved or unsolved
export function validateSugokuCreator(sugokuURL, playerBoard) {
  return async function (dispatch, getState) {
    let statusBoard = '';
    try {
      const encodeBoard = (board) => board.reduce((result, row, i) =>
        result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '');
      const encodeParams = (params) =>
        Object.keys(params).map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`).join('&');

      const data = { board: playerBoard }
      const response = await fetch(`${sugokuURL}/validate`, {
        method: 'POST',
        body: encodeParams(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      if (!response.ok)
        throw new Error(`Error ${response.status}: Failed to validate board`);
      const { status } = await response.json();
      statusBoard = status;
    } catch (error) {
      throw error.message;
    } finally {
      return statusBoard;
    }
  }
}
// NOTE: solve => return the answer, the right board
export function solveSugokuCreator(sugokuURL) {
  return async function (dispatch, getState) {
    let solutionBoard = [];
    try {
      const encodeBoard = (board) => board.reduce((result, row, i) =>
        result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '');
      const encodeParams = (params) =>
        Object.keys(params).map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`).join('&');

      const data = { board: getState().sugoku.board }
      const response = await fetch(`${sugokuURL}/solve`, {
        method: 'POST',
        body: encodeParams(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      if (!response.ok)
        throw new Error(`Error ${response.status}: Failed to validate board`);
      const { solution } = await response.json();
      solutionBoard = solution;
    } catch (error) {
      throw error.message;
    } finally {
      return solutionBoard;
    }
  }
}