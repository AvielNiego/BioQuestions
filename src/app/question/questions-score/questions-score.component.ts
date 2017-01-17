import {Component} from "@angular/core";
import {QuestionsService} from "../questions.service";

@Component({
  selector: 'bq-questions-score',
  templateUrl: './questions-score.component.html',
  styleUrls: ['./questions-score.component.css']
})
export class QuestionsScoreComponent {
  questionsAmount: number;
  rightAnswers: number = 0;
  answeredQuestionsCounter: number;

  constructor(questionsService: QuestionsService){
    this.questionsAmount = questionsService.getQuestionsAmount();
    this.answeredQuestionsCounter = questionsService.getAnsweredQuestionsAmount();
    this.rightAnswers = questionsService.getRightAnswersAmount();
    questionsService.addAskedQuestionsAmountObserver(() => {
      this.answeredQuestionsCounter = questionsService.getAnsweredQuestionsAmount();
      this.rightAnswers = questionsService.getRightAnswersAmount();
      this.questionsAmount = questionsService.getQuestionsAmount();
    })
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
