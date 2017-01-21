import {Component} from "@angular/core";
import {QuestionnaireService} from "../questionnaire.service";

@Component({
  selector: 'bq-questions-score',
  templateUrl: 'questions-score.component.html',
  styleUrls: ['questions-score.component.css']
})
export class QuestionsScoreComponent {
  questionsAmount: number;
  rightAnswers: number = 0;
  answeredQuestionsCounter: number;

  constructor(questionnaireService: QuestionnaireService){
    this.questionsAmount = questionnaireService.getQuestionsAmount();
    this.answeredQuestionsCounter = questionnaireService.getAnsweredQuestionsAmount();
    this.rightAnswers = questionnaireService.getRightAnswersAmount();
    questionnaireService.addAskedQuestionsAmountObserver(() => {
      this.answeredQuestionsCounter = questionnaireService.getAnsweredQuestionsAmount();
      this.rightAnswers = questionnaireService.getRightAnswersAmount();
      this.questionsAmount = questionnaireService.getQuestionsAmount();
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
