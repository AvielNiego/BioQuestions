import {RouterModule, Routes} from "@angular/router";
import {QuestionComponent} from "./questionnaire/question/question.component";
import {QuestionnaireComponent} from "./questionnaire/questionnaire.component";
import {QuestionsManagerComponent} from "./questions-manager/questions-manager.component";
import {QUESTION_EDIT_ROUTES} from "./questions-manager/question-edit.route";
const APP_ROUTES: Routes = [
  { path: '', redirectTo: "questionnaire", pathMatch: "full" },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'questionnaire/:id', component: QuestionnaireComponent },
  { path: 'questions-manager', component: QuestionsManagerComponent, children: QUESTION_EDIT_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
