import {Injectable, OnDestroy} from '@angular/core';
import {QuestionsProviderService} from "../questions-provider.service";
import {Subscription} from "rxjs";
import {Question} from "../question";

@Injectable()
export class QuestionsService implements OnDestroy{
  private subscription: Subscription;
  questions: Question[];

  constructor(private questionsProvider: QuestionsProviderService) {
     this.subscription = this.questionsProvider.retrieveQuestions().subscribe(
       q => this.questions = q
     );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
