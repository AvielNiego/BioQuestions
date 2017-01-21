import {Component, OnInit} from "@angular/core";
import {QuestionnaireService} from "../../questionnaire/questionnaire.service";
import {Router} from "@angular/router";

@Component({
  selector: 'bq-questions-edit-list',
  templateUrl: './questions-edit-list.component.html',
  styleUrls: ['./questions-edit-list.component.css']
})
export class QuestionsEditListComponent implements OnInit {

  constructor(public questionsService: QuestionnaireService) {
  }
  ngOnInit() {
  }

}
