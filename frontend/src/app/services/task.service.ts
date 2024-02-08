import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient) {}

  create(data: any): Observable<any>{
    return this._http.post('http://localhost:5000/api/task', data);
  }

  update(id: number, data: any): Observable<any>{
    return this._http.put(`http://localhost:5000/api/task/${id}`, data);
  }

  getAll(): Observable<any[]>{
    return this._http.get<any[]>('http://localhost:5000/api/task').pipe(
      map((tasks: any[]) => {
        return tasks.sort((a, b) => {
          if (a.state && !b.state) {
            return 1; // 'b' antes que 'a'
          } else if (!a.state && b.state) {
            return -1; // 'a' antes que 'b'
          } else {
            return 0; // Mantener el orden actual
          }
        });
      })
    );
  }


  get(id: number): Observable<any>{
    return this._http.get(`http://localhost:5000/api/task/${id}`);
  }

  delete(id: number): Observable<any>{
    let url = "http://localhost:5000/api/task/" + id;
    return this._http.delete(url);
  }
}