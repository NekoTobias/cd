import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.config.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.config.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.config.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.config.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.config.apiUrl}/users/${id}`);
    }

 
}