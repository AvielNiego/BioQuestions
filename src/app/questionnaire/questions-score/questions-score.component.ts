import {Component, OnDestroy, OnInit} from "@angular/core";
import {QuestionnaireService} from "../questionnaire.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'bq-questions-score',
  templateUrl: 'questions-score.component.html',
  styleUrls: ['questions-score.component.css']
})
export class QuestionsScoreComponent implements OnInit, OnDestroy{
  questionsAmount: number;
  rightAnswers: number = 0;
  answeredQuestionsCounter: number;

  constructor(private questionnaireService: QuestionnaireService){
    this.questionsAmount = questionnaireService.getQuestionsAmount();
    this.answeredQuestionsCounter = questionnaireService.getAnsweredQuestionsAmount();
    this.rightAnswers = questionnaireService.getRightAnswersAmount();
  }

  ngOnInit(): void {
    this.questionnaireService.addAskedQuestionsAmountObserver(() => {
      this.answeredQuestionsCounter = this.questionnaireService.getAnsweredQuestionsAmount();
      this.rightAnswers = this.questionnaireService.getRightAnswersAmount();
      this.questionsAmount = this.questionnaireService.getQuestionsAmount();
    });
  }

  ngOnDestroy(): void {
  }

  isNotNaN(number: any): boolean {
    return !Number.isNaN(number)
  }

  getScore() {
    let s = this.rightAnswers / this.answeredQuestionsCounter * 100;
    if (s)
      return Math.floor(s);
    return s;
  }
}
