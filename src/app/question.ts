export class Question {
  private shuffledAnswers: string[] = [];
  public selectedAnswer: string = '';

  constructor(public question: string,
              public answers: string[]) {
    this.shuffledAnswers = Question.shuffle(this.answers);
  }

  isRightAnswer(answer: string): boolean {
    return answer === this.answers[0];
  }

  getShuffledAnswers(): string[] {
    return this.shuffledAnswers;
  }

  private static shuffle(array: Array<any>) {
    let shuffledArray = array.slice(0);
    let currentIndex = shuffledArray.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = shuffledArray[currentIndex];
      shuffledArray[currentIndex] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temporaryValue;
    }
    return shuffledArray;
  }
}
