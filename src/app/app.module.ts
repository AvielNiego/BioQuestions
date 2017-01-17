import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {QuestionComponent} from "./question/question.component";
import {HeaderComponent} from "./header.component";
import {QuestionsScoreComponent} from "./question/questions-score/questions-score.component";
import { QuestionsListComponent } from './question/questions-list/questions-list.component';
import {routing} from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    HeaderComponent,
    QuestionsScoreComponent,
    QuestionsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
