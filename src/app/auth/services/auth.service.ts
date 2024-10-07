import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {User, UserSignUp} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<User | undefined> {
    const params = new HttpParams().appendAll({'email': user.email, 'password': user.password});
    return this.http.get<User[]>(`${this.apiUrl}/users`, { params: params }).pipe(
      map(users => users.length > 0 ? users[0] : undefined)
    );
  }

  signup(userSignUp: UserSignUp): Observable<User> {
    const user = {
      email: userSignUp.email,
      password: userSignUp.password
    }
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }
}
