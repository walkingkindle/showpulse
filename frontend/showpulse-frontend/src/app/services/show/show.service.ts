import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Show } from '../../Models/Show';

@Injectable({
  providedIn: 'root',
})

export class ShowService {
  showIds:number[];
  selectedShows:Show[];
  private apiUrl = 'https://localhost:7054/api/Shows/'

constructor(private http:HttpClient) {
  this.showIds = [];
  this.selectedShows = [];

 }

getRecordsByInput(input:string):Observable<Show[]>{
  return this.http.get<Show[]>(`${this.apiUrl}search/${input}`)
}
getRecommendedShowsFromInput(showId1:number,showId2:number,showId3:number):Observable<Show[]>{
  return this.http.get<Show[]>(`${this.apiUrl}suggest/${showId1}/${showId2}/${showId3}`);
}
retrieveShowIds(selectedShows:Show[]){
  
}


}
