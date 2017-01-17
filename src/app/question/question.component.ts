import { Component, OnInit } from '@angular/core';
import {Question} from "../question";
import {QuestionsService} from "./questions.service";
import {NgForm} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'bq-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent{
  question: Question;
  isSubmitPressed: boolean = false;
  questionForm: NgForm;

  constructor(private questionsService: QuestionsService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(
      (params) => this.resetQuestion(this.questionsService.getQuestionAt(params['id']))
    );
  }

  onSubmit(form: NgForm){
    this.isSubmitPressed = true;
    this.questionForm = form;
    if (this.question.isRightAnswer(this.question.selectedAnswer))
      this.questionsService.addRightAnswer();
  }

  onNextQuestionPressed() {
    this.resetQuestion(this.questionsService.getNextQuestion());
  }

  private resetQuestion(nextQuestion: Question) {
    if (nextQuestion == null)
    {
      this.router.navigate(['/0']);
      return;
    }

    this.question = nextQuestion;
    this.isSubmitPressed = false;
    if (this.questionForm)
      this.questionForm.resetForm();
  }
}
