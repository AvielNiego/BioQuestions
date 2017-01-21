import {Routes} from "@angular/router";
import {QuestionEditComponent} from "./question-edit/question-edit.component";

export const QUESTION_EDIT_ROUTES: Routes = [
  { path: '', component: QuestionEditComponent },
  { path: ':id', component: QuestionEditComponent },
];
