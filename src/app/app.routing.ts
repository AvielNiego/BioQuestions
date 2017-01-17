import {RouterModule, Routes} from "@angular/router";
import {QuestionComponent} from "./question/question.component";
const APP_ROUTES: Routes = [
  { path: '', redirectTo: "/0", pathMatch: "full" },
  { path: ':id', component: QuestionComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
