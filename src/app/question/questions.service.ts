import {Question} from "../question";
import {questionsBank} from "./questions-bank";
import {Injectable} from "@angular/core";

@Injectable()
export class QuestionsService {
  private askedQuestionsAmountObserver = () => {};
  questions: Question[] = [];

  constructor(){
    this.loadQuestions();
  }

  private loadQuestions() {
    questionsBank.forEach((q) => this.questions.push(new Question(q['question'], q["Answers"])));
    this.questions = QuestionsService.shuffle(this.questions);
  }

  resetWithoutCorrectAnsweredQuestions() {
    let oldQuestions = this.questions;
    this.questions = [];
    oldQuestions.filter((q) => !q.isRightAnswer(q.selectedAnswer)).forEach((q) => this.questions.push(q));
    this.questions.forEach((q) => q.resetQuestion());
    this.askedQuestionsAmountObserver();
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
    let c = 0;
    for (let q of this.questions)
      c = q.isRightAnswer(q.selectedAnswer) ? c + 1 : c;
    return c;
  }

  getQuestion(index: number): Question {
    if (index > this.questions.length || index < 1) {
      return null;
    }
    this.askedQuestionsAmountObserver();
    return this.questions[index - 1];
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
