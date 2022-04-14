import { PlayersController } from "./Controllers/PlayersController.js"
import { QuestionsController } from "./Controllers/QuestionsController.js"


class App {
  questionsController = new QuestionsController()
  playersController = new PlayersController()
}

window["app"] = new App()
