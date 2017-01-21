import { Component, OnInit } from '@angular/core';
import {QuestionsService} from "../questions.service";
import {Question} from "../../question";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'bq-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

  constructor(public questionsService: QuestionsService) {
  }

  ngOnInit() {
  }

}
