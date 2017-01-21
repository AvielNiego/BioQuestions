import {Component, OnInit, OnDestroy} from "@angular/core";
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {QuestionnaireService} from "../../questionnaire/questionnaire.service";
import {Question} from "../../question";

@Component({
  selector: 'bq-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit, OnDestroy{
  questionForm: FormGroup;
  private subscription: Subscription;
  private question: Question;
  private questionId: string = null;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private questionsService: QuestionnaireService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      p => this.onRouteParamChange(p)
    );
  }

  private onRouteParamChange(p: Params) {
    if(p.hasOwnProperty('id')){
      this.initFormForEdit(this.questionsService.questions[+p['id']])
    } else {
      this.initFormForNew()
    }
  }

  private initFormForEdit(question: Question) {
    if (!question) {
      this.initFormForNew();
      return;
    }

    this.questionId = question.id;
    if (question) {
      this.initForm(question);
    } else {
      this.navigateBack();
    }
  }

  private initFormForNew() {
    this.initForm(new Question('',[],''))
  }

  private initForm(question: Question) {
    this.questionForm = this.formBuilder.group({
      'question': [question.question, Validators.required],
      'right-answer': [question.answers[0], Validators.required],
      'wrong-answers': new FormArray(question.answers.slice(1).map((a) => new FormControl(a, [Validators.required])
      ))
    })
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    let newQuestion = this.createQuestionFromForm();
    if (this.questionId) {
      this.questionsService.updateQuestion(this.questionId, newQuestion)
    } else {
      this.questionsService.createNewQuestion(newQuestion)
    }
    this.navigateBack();
  }

  onDelete() {
    this.questionsService.deleteQuestion(this.questionId)
  }

  private createQuestionFromForm() {
    let value = this.questionForm.value;
    let answers = [value['right-answer']];
    answers = answers.concat(value['wrong-answers']);
    return new Question(value['question'], answers, null);
  }

  onCancel() {
    this.navigateBack();
  }

  private navigateBack() {
    this.questionForm.reset();
    this.router.navigate(['/', 'questions-manager'])
  }

  onRemoveWrongAnswer(index: number) {
    (<FormArray>this.questionForm.controls['wrong-answers']).removeAt(index);
  }

  onAddWrongAnswer(newWrongAnswer: string) {
    (<FormArray>this.questionForm.controls['wrong-answers']).push(
      new FormControl(newWrongAnswer, [Validators.required])
    );
  }
}
