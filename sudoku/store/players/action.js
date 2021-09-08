import { PLAYER_SET } from "./actionType";

export function setPlayer(playerData) {
  return {
    type: PLAYER_SET,
    payload: playerData
  }
}
