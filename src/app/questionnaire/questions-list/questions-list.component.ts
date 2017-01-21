import {Component, OnInit} from "@angular/core";
import {QuestionnaireService} from "../questionnaire.service";

@Component({
  selector: 'bq-questions-list',
  templateUrl: 'questions-list.component.html',
  styleUrls: ['questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

  constructor(public questionnaireService: QuestionnaireService) {
  }

  ngOnInit() {
  }

}
