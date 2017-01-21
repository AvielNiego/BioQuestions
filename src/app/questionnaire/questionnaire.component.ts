import {Component, OnInit} from "@angular/core";
import {QuestionnaireService} from "./questionnaire.service";
import {Router} from "@angular/router";

@Component({
  selector: 'bq-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  constructor(private qs: QuestionnaireService, private router: Router) { }

  ngOnInit() {
    this.qs.questionsRetrieveObservable.subscribe(
      (q) => this.router.navigate(['questionnaire', '1'])
    );
  }

}
