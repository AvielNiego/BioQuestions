import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/Rx";
import {Question} from "./question";
import {Observable} from "rxjs";

@Injectable()
export class QuestionsProviderService {

  constructor(private http: Http) {
  }

  retrieveQuestions(): Observable<Question[]> {
    return this.http.get('https://bio-questions-55573.firebaseio.com/questions.json')
      .map((r: Response) => r.json())
      .map((r) => Object.keys(r).map(k => new Question(r[k]['question'], r[k]['Answers'], k)));
  }

  deleteQuestion(questionId: string) {
    const deleteSubscription = this.http.delete('https://bio-questions-55573.firebaseio.com/questions/' + questionId + '.json').subscribe(
      r => console.log(r.json()),
      e => console.log(e),
      () => deleteSubscription.unsubscribe()
    );
  }

  createNew(question: Question): Observable<string> {
    const body = JSON.stringify({question: question.question, Answers: question.answers});
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post('https://bio-questions-55573.firebaseio.com/questions.json', body, {headers: headers}).map((r: Response) => r.json());
  }

  updateQuestion(questionId: string, question: Question) {
    const body = JSON.stringify({question: question.question, Answers: question.answers});
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://bio-questions-55573.firebaseio.com/questions/' + questionId + '.json', body, {headers: headers})
      .map((r: Response) => r.json());
  }
}
