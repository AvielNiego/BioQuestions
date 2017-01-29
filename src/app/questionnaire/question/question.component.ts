import {Component, ViewChild, OnDestroy, Output, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Question} from "../../question";
import {QuestionnaireService} from "../questionnaire.service";

@Component({
  selector: 'bq-question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy{

  private subscription: Subscription;

  question: Question;
  questionNumber: number;
  @ViewChild("questionForm") questionForm: NgForm;

  constructor(private questionnaireService: QuestionnaireService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.subscription = this.activatedRoute.params.subscribe(
      (params) => {
        this.resetQuestion(this.questionnaireService.getShuffledQuestion(params['id']));
        this.questionNumber = +(params['id']);
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(){
    this.question.submitAnswer();
  }

  onNextQuestionPressed() {
    if (this.question.isSubmitted)
      this.router.navigate(['/questionnaire', this.questionNumber + 1]);
  }

  resetQuestions() {
    this.questionnaireService.resetWithoutCorrectAnsweredQuestions();
    this.router.navigate(['/questionnaire','1']);
  }

  private resetQuestion(nextQuestion: Question) {
    this.question = nextQuestion;
    if (this.questionForm && nextQuestion.selectedAnswer === "")
      this.questionForm.resetForm();
  }

  onKeyPressed(event: KeyboardEvent) {
    let key = event.key;
    switch (key)
    {
      case "1":
      case "2":
      case "3":
      case "4":
        this.question.selectedAnswer = this.question.getShuffledAnswers()[(+key) - 1];
        break;
      case "Enter":
        if (this.questionForm.valid)
          this.onSubmit();
        break;
      case "ArrowLeft":
        this.onNextQuestionPressed();
        break;
    }
  }
}
