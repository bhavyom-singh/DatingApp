import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
    paheNumber = 1;
    pageSize = 5;
    likeParams = 'Likers';
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(): Observable<User[]> {
        return this.userService.getUsers(this.paheNumber, this.pageSize, null, this.likeParams).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}