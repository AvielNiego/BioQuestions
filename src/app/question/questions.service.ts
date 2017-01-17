import {Question} from "../question";
import {questionsBank} from "./questions-bank";

export class QuestionsService {
  private askedQuestionsAmountObserver = () => {};
  questions: Question[] = [];
  private index: number = -1;
  private rightAnswers: number = 0;

  constructor(){
    this.loadQuestions();
  }

  private loadQuestions() {
    questionsBank.forEach((q) => this.questions.push(new Question(q['question'], q["Answers"])))
    this.questions = QuestionsService.shuffle(this.questions);
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


  getQuestionsAmount() {
    return this.questions.length;
  }

  getRightAnswersAmount() {
    return this.rightAnswers;
  }

  addRightAnswer() {
    this.rightAnswers++;
  }

  getNextQuestion(): Question {
    this.index++;
    this.askedQuestionsAmountObserver();
    return this.questions.length <= this.index ? null : this.questions[this.index];
  }

  getQuestionAt(index: number): Question {
    if (index >= this.questions.length) {
      return null;
    }
    this.index = index;
    this.askedQuestionsAmountObserver();
    return this.questions[index];
  }

  getAnsweredQuestionsAmount() {
    let c = 0;
    for (let q of this.questions)
      c = q.selectedAnswer != "" ? c + 1 : c;
    return c;
  }

  addAskedQuestionsAmountObserver(askedQuestionsAmountObserver) {
    this.askedQuestionsAmountObserver = askedQuestionsAmountObserver;
  }
}
