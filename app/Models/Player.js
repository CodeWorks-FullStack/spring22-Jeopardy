import { ProxyState } from "../AppState.js"

export class Player {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.points = data.points
    this.incorrect = data.incorrect
    this.correct = data.correct
    this.questions = data.questions
  }

  get IsActive() {
    // javascript elvis operator, '?' allows to check for property before drilling further into object
    return this.id === ProxyState.activePlayer?.id
  }

  get SimpleTemplate() {
    return `<li class="selectable m-2 ${this.IsActive ? 'text-warning border border-warning border-2 p-2' : ''} " onclick="app.playersController.setActivePlayer('${this.id}')" > ${this.name}: ${this.points}</li> `
  }

  get ComplexTemplate() {
    return `<li class="selectable m-2 ${this.IsActive ? 'text-warning border border-warning border-2 p-2' : ''} " onclick="app.playersController.setActivePlayer('${this.id}')" > 
    <p>${this.name}: ${this.points}</p>
    <p>Correct/Incorrect: ${this.correct}/${this.incorrect}, Accuracy: ${((this.correct / this.questions) * 100).toFixed(2)}%</p> 
    
    
    </li> `
  }
}