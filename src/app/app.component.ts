import { Component } from '@angular/core';
import {QuestionnaireService} from "./questionnaire/questionnaire.service";
import {QuestionsProviderService} from "./questions-provider.service";
import {QuestionsService} from "./questions-manager/questions.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [QuestionnaireService, QuestionsProviderService, QuestionsService]
})
export class AppComponent {
}
