import { ProxyState } from "../AppState.js"
import { Player } from "../Models/Player.js"
import { sandboxApi } from "./AxiosService.js"

class PlayersService {
  toggleComplex() {
    ProxyState.complex = !ProxyState.complex
  }
  async setOrCreatePlayer(playerData) {
    // determine if player exists
    let exists = ProxyState.players.find(p => p.name.toLowerCase() == playerData.name.toLowerCase())
    // if not create
    if (!exists) {
      const res = await sandboxApi.post('', playerData)
      exists = new Player(res.data)
      ProxyState.players = [...ProxyState.players, exists]
    }

    // set active
    ProxyState.activePlayer = exists
  }
  correct(result) {
    // modify the player object
    const player = ProxyState.activePlayer
    const value = ProxyState.question.value

    player.points += result ? value : value * -1
    player.questions++
    if (result) {
      player.correct++
    } else {
      player.incorrect++
    }

    // send to server
    // sandboxApi.put(player.id, { points: player.points })
    sandboxApi.put(player.id, player)

    // trigger render
    ProxyState.activePlayer = ProxyState.activePlayer
  }

  async getPlayers() {
    const res = await sandboxApi.get('')
    ProxyState.players = res.data.map(p => new Player(p))
  }

  setActivePlayer(id) {
    const player = ProxyState.players.find(p => p.id == id)
    if (!player) {
      throw new Error("something went wrong")
    }
    ProxyState.activePlayer = player
  }

}

export const playersService = new PlayersService()