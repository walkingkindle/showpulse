import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Show } from '../../Models/Show';

@Injectable({
  providedIn: 'root',
})

export class ShowService {
  showIds:number[];
  selectedShows:Show[];
  private apiUrl = 'https://recommendit.ink/api/Shows/'

constructor(private http:HttpClient) {
  this.showIds = [];
  this.selectedShows = [];

 }

getRecordsByInput(input:string):Observable<Show[]>{
  return this.http.get<Show[]>(`${this.apiUrl}search/${input}`)
}
getRecordsById(id:number):Observable<Show>{
  return this.http.get<Show>(`${this.apiUrl}${id}`)
}
getRecommendedShowsFromInput(showIds:number[]):Observable<number[]>{
  const headers = new HttpHeaders({'Content-Type':'application/json'})
  const options = {headers:headers, withCredentials:true}
  return this.http.get<number[]>(`${this.apiUrl}suggest/${showIds[0]}/${showIds[1]}/${showIds[2]}`,options);
}

}
