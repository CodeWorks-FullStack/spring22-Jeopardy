import { ProxyState } from "../AppState.js"
import { Question } from "../Models/Question.js"
import { jService } from "./AxiosService.js"

class QuestionsService {
  async getQuestion() {
    const res = await jService.get('')
    const question = new Question(res.data[0])
    if (!question.question || !question.answer) {
      console.error("INVALID QUESTION")
      this.getQuestion()
      return
    }
    ProxyState.question = question
  }
}

export const questionsService = new QuestionsService()