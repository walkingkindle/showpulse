import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Show } from '../../Models/Show';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  private apiUrl = 'http://localhost:7054/api/Shows/records/'

constructor(private http:HttpClient) { }

getRecordsByInput(input:string):Observable<Show[]>{
  return this.http.get<Show[]>(`${this.apiUrl}/records/${input}`);
}

}
