import {Question} from "../question";
import {Injectable, OnDestroy} from "@angular/core";
import {QuestionsProviderService} from "../questions-provider.service";
import {Subscription} from "rxjs";

@Injectable()
export class QuestionnaireService implements OnDestroy{
  private askedQuestionsAmountObserver = () => {};
  questions: Question[] = [];
  private subscription: Subscription;

  constructor(private questionsProvider: QuestionsProviderService){
    this.loadQuestions();
  }

  private loadQuestions() {
    this.subscription = this.questionsProvider.retrieveQuestions().subscribe(
      q => this.onQuestionsReceive(q),
      e => console.log(e)
    );
  }

  private onQuestionsReceive(q) {
    this.questions = q;
    this.questions = QuestionnaireService.shuffle(this.questions);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
