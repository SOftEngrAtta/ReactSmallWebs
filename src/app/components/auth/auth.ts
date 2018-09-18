import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { StorageService } from './../../Services/storage.service';

import 'rxjs/add/operator/pairwise';
import { Token } from '../../models/token';
declare var moment: any;
@Injectable()
export class AuthGuardService implements CanActivate {
  
  constructor(private _router: Router,
    private _storageService: StorageService,
     ) { }
  
  canActivate(): boolean {
    const token : Token  = this._storageService.getDecrypted('token');
    if (token && token.AccessToken) {
      return true;
    }
    this._router.navigate(['login']);
    return false;
  }

  
}
