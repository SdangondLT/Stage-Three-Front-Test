import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from "@environments/environment";
import { ShowsInfoInterface, ShowsListResponse } from '@app-models/shows.model';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  constructor(private http: HttpClient) { }

  public getTvShowsFromApi(query: string, type: string, year: string): Observable<ShowsListResponse>
  {
    const url = `${environment.URL}/?s=${query}&type=${type}&y=${year}&apikey=${environment.OMDB_APIKEY}`;
    return this.http.get<any>(url).pipe(
      map( dataApi => {
        const mapToResults = dataApi.Search?.map( (element: ShowsInfoInterface) => {
          return {
            id: element.imdbID,
            poster: element.Poster,
            title: element.Title,
            type: element.Type,
            year: element.Year,
            favorite: false,
            selectedDate: '',
            comments: ''
          }
        });

        return {
          error: dataApi.Response !== "True",
          data: {
            results: mapToResults,
            totalResults: Number(dataApi.totalResults)
          }
        }
      })
    );
  }
}
