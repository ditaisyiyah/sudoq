import { SUGOKU_GET, SUGOKU_UPDATE, SUGOKU_VALIDATE, SUGOKU_SOLVE } from "./actionType";

function getSugoku(board){
  return {
    type: SUGOKU_GET,
    payload: board
  }
}
function updateSugoku(board){
  return {
    type: SUGOKU_UPDATE,
    payload: board
  }
}
function validateSugoku(status){
  return {
    type: SUGOKU_VALIDATE,
    payload: status
  }
}

export function getSugokuCreator(sugokuURL, difficulty){
  return async function(dispatch, _){
    try {
      const response = await fetch(`${sugokuURL}/board?difficulty=${difficulty}`);
      if(!response.ok)
      throw new Error (`Error ${response.status}: Failed to generate board`);
      const { board } = await response.json();
      dispatch(getSugoku(board));
    } catch (error) {
      throw error.message;
    }
  }
}
export function updateSugokuCreator(text, i, j){
  return function(dispatch, getState){
    try {
      console.log('di action', text, i, j)
      const board = getState().sugoku.board;
      const newBoard = JSON.parse(JSON.stringify(board));
      newBoard[i][j] = text;
      dispatch(updateSugoku(newBoard));
    } catch (error) {
      throw error.message;
    }
  }
}
// NOTE: validate => return status: solved or unsolved
export function validateSugokuCreator(sugokuURL, playerBoard){
  return async function(dispatch, getState){
    try {
      const encodeBoard = (board) => board.reduce((result, row, i) => 
        result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '');
      const encodeParams = (params) => 
        Object.keys(params).map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`).join('&');

      // const data = { board: getState().sugoku.board }
      const data = { board: playerBoard }
      const response = await fetch(`${sugokuURL}/validate`, {
        method: 'POST',
        body: encodeParams(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      if(!response.ok)
      throw new Error (`Error ${response.status}: Failed to validate board`);
      const { status } = await response.json();
      dispatch(validateSugoku(status));
    } catch (error) {
      throw error.message;
    }
  }
}
// NOTE: solve => return the answer, the right board
export function solveSugokuCreator(sugokuURL){
  return async function(dispatch, getState){
    console.log(getState().sugoku.board);
    let solutionBoard = [];
    try {
      const encodeBoard = (board) => board.reduce((result, row, i) => 
        result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '');
      const encodeParams = (params) => 
        Object.keys(params).map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`).join('&');

      const data = { board: getState().sugoku.board }
      const response = await fetch(`${sugokuURL}/solve`, {
        method: 'POST',
        body: encodeParams(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      if(!response.ok)
      throw new Error (`Error ${response.status}: Failed to validate board`);
      const { solution } = await response.json();
      solutionBoard = solution;
      // dispatch(solveSugoku(solution));
    } catch (error) {
      throw error.message;
    } finally {
      return solutionBoard;
    }
  }
}