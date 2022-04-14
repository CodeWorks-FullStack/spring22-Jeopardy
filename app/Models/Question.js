export class Question {
  constructor(data) {
    this.question = data.question
    this.answer = data.answer
    this.value = data.value || 200
    this.category = data.category.title
  }

  get Template() {
    return `
    <div>
      <h5 class="text-uppercase">CATEGORY: ${this.category}</h5>
      <h5>${this.value}</h5>
      <h2 class="question-font">${this.question}</h2>
    </div>
    <p class="on-hover"><em>${this.answer}</em></p>
    `
  }
}