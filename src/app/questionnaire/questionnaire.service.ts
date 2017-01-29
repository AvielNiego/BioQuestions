import {Question} from "../question";
import {Injectable, OnDestroy, EventEmitter} from "@angular/core";
import {QuestionsProviderService} from "../questions-provider.service";
import {Subscription} from "rxjs";

@Injectable()
export class QuestionnaireService implements OnDestroy{

  questions: Question[] = [];
  private subscription: Subscription;
  private askedQuestionsAmountObserver = () => {};
  public questionsRetrieveObservable = new EventEmitter<Question[]>();
  shuffledQuestions: Question[] = [];

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
    this.shuffledQuestions = QuestionnaireService.shuffle(this.questions);
    this.questionsRetrieveObservable.emit(this.questions);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  resetWithoutCorrectAnsweredQuestions() {
    let oldQuestions = this.shuffledQuestions;
    this.shuffledQuestions = [];
    oldQuestions.filter((q) => !q.isRightAnswer(q.selectedAnswer)).forEach((q) => this.shuffledQuestions.push(q));
    this.shuffledQuestions.forEach((q) => q.resetQuestion());
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
    return this.shuffledQuestions.length;
  }

  getRightAnswersAmount() {
    let c = 0;
    for (let q of this.shuffledQuestions)
      c = q.isRightAnswer(q.selectedAnswer) ? c + 1 : c;
    return c;
  }

  getShuffledQuestion(index: number): Question {
    if (index > this.shuffledQuestions.length || index < 1) {
      return null;
    }
    this.askedQuestionsAmountObserver();
    return this.shuffledQuestions[index - 1];
  }

  getAnsweredQuestionsAmount() {
    let c = 0;
    for (let q of this.shuffledQuestions)
      c = q.selectedAnswer != "" ? c + 1 : c;
    return c;
  }

  addAskedQuestionsAmountObserver(askedQuestionsAmountObserver) {
    this.askedQuestionsAmountObserver = askedQuestionsAmountObserver;
  }

  deleteQuestion(questionId: string) {
    this.questions.splice(this.questions.findIndex(q => q.id === questionId), 1);
    this.shuffledQuestions.splice(this.shuffledQuestions.findIndex(q => q.id === questionId), 1);
    this.questionsProvider.deleteQuestion(questionId);
  }

  createNewQuestion(newQuestion: Question) {
    const createNewSubscription = this.questionsProvider.createNew(newQuestion).subscribe(
      (questionId: string) => {
        newQuestion.id = questionId;
        this.questions.push(newQuestion);
        createNewSubscription.unsubscribe();
      }
    );
    this.shuffledQuestions = QuestionnaireService.shuffle(this.questions);
  }

  updateQuestion(questionId: string, newQuestion: Question) {
    newQuestion.id = questionId;
    const updateSubscription = this.questionsProvider.updateQuestion(questionId, newQuestion).subscribe(
      (r) => {
        console.log(r);
        this.questions[this.questions.findIndex(q => q.id === questionId)] = newQuestion;
        updateSubscription.unsubscribe();
      }
    );
  }
}
