import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { DataService } from '../../data.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducer';
import * as fromEdit from './edit.actions';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
@Injectable()
export class EditResolveService {

  constructor(
    private data: DataService,
    private store: Store<fromRoot.State>
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const version = +route.params['version'];
    console.log(`edit resolver version: ${version}`)
    return this.data.loadScreener(version)
            .take(1);
  }
}