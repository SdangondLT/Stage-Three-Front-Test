import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, pluck } from 'rxjs';
import { environment } from "@environments/environment";
import { ShowsInfoInterface, ShowsInterface, ShowsListResponse } from '@app-models/shows.model';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  constructor(private http: HttpClient) { }

  public getTvShowsFromApi(query: string): Observable<ShowsInterface> {
    console.log('entrando al servicio');
    const url = `${environment.URL}/?s=${query}&apikey=${environment.OMDB_APIKEY}`;
    return this.http.get<any>(url).pipe(map(dataApi => {
      dataApi.error = dataApi['Response'];
      dataApi.data = {};
      dataApi.data.results = dataApi['Search'];;
      dataApi.data.totalResults = dataApi['totalResults'];
      delete dataApi['Response'];
      delete dataApi['Search'];
      delete dataApi['totalResults']
      dataApi.data.results.map((element : any) => {
        element.title = element.Title;
        delete element.Title;
        element.poster = element.Poster;
        delete element.Poster;
        element.type = element.Type;
        delete element.Type;
        element.year = element.Year;
        delete element.Year;
        element.id = element.imdbID;
        delete element.imdbID;
        return Object.assign(element, {selected : false}, {comments : ''})
      })
      return dataApi;
    }));
  }
}
