import { ProxyState } from "../AppState.js"
import { playersService } from "../Services/PlayersService.js"
import { Pop } from "../Utils/Pop.js"

async function _drawPlayers() {
  const players = ProxyState.players
  players.sort((a, z) => {
    return z.points - a.points
  })
  let template = ''
  players.forEach(p => {
    template += ProxyState.complex ? p.ComplexTemplate : p.SimpleTemplate
  })
  document.getElementById('players').innerHTML = template
}


async function _getPlayers() {
  try {
    await playersService.getPlayers()
  } catch (error) {
    console.error(error)
    Pop.toast(error.message, "error")
  }
}

export class PlayersController {
  constructor() {
    ProxyState.on('players', _drawPlayers)
    ProxyState.on('activePlayer', _drawPlayers)
    ProxyState.on('complex', _drawPlayers)

    _getPlayers()
  }

  setActivePlayer(id) {
    try {
      playersService.setActivePlayer(id)
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }

  async setOrCreatePlayer() {
    try {
      window.event.preventDefault()

      const formData = window.event.target
      const playerData = {
        // @ts-ignore
        name: formData.playername.value
      }

      await playersService.setOrCreatePlayer(playerData)
      document.getElementById("playerform").classList.add('d-none')
      document.getElementById("playspace").classList.remove('d-none')
      document.getElementById("playerslist").classList.remove('d-none')
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }

  async correct(result) {
    try {
      await playersService.correct(result)
      if (result) {
        Pop.toast("Great Job", 'success')
      } else {
        Pop.toast('Thats too bad', 'error')
      }
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')

    }
  }

  toggleComplex() {
    playersService.toggleComplex()
  }
}