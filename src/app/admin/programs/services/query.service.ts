import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { ProgramCondition, ProgramQuery } from '../../models';
import { ProgramQueryClass } from './program-query.class';
import { AuthService } from '../../core/services/auth.service'
import { Observable } from 'rxjs/Observable';


@Injectable()
export class QueryService {

  constructor(private http: Http, private authService: AuthService,) {}

  private getCredentials(): RequestOptions {
    return this.authService.getCredentials();
  }



  createOrUpdate(query: ProgramQueryClass, program_guid: string) {
    if (!query.form.valid) return;

    const creds = this.getCredentials();
    creds.headers.append('Content-Type', 'application/json' );
    const data = {
      query: query.form.value,
      guid: program_guid
    };
    const body = JSON.stringify({ data });
    return this.http.post('/protected/query/', body, creds)
      .map(res => res.json())
      .do( _ => console.log(_))
      .catch(this.loadError)
  }

  loadError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body['message'] || JSON.stringify(body);
      errMsg = err;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}