import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {QuestionComponent} from "./questionnaire/question/question.component";
import {HeaderComponent} from "./header.component";
import {QuestionsScoreComponent} from "./questionnaire/questions-score/questions-score.component";
import { QuestionsListComponent } from './questionnaire/questions-list/questions-list.component';
import {routing} from "./app.routing";
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionsManagerComponent } from './questions-manager/questions-manager.component';
import { QuestionsEditListComponent } from './questions-manager/questions-edit-list/questions-edit-list.component';
import { QuestionEditComponent } from './questions-manager/question-edit/question-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    HeaderComponent,
    QuestionsScoreComponent,
    QuestionsListComponent,
    QuestionnaireComponent,
    QuestionsManagerComponent,
    QuestionsEditListComponent,
    QuestionEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
