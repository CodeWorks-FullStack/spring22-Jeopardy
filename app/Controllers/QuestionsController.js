import { ProxyState } from "../AppState.js"
import { questionsService } from "../Services/QuestionsService.js"
import { Pop } from "../Utils/Pop.js"

function _drawQuestion() {
  const question = ProxyState.question
  document.getElementById('question').innerHTML = question.Template
}


export class QuestionsController {
  constructor() {
    ProxyState.on('question', _drawQuestion)
    ProxyState.on('activePlayer', this.getQuestion)
  }

  async getQuestion() {
    try {
      await questionsService.getQuestion()
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }

}