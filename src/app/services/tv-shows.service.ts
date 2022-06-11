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
      //con la ayuda de rxjs podemos aplicar los operadores como pipe y asi mod la data
      //para devolverle al observaable una estructura diferente
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
          //las propiedades de este obj serab las indicadas en las instrucciones
          error: dataApi.Response !== "True",//esta condicion me devuelve un bool
          //si viene true o si viene false
          data: {
            results: mapToResults,
            totalResults: Number(dataApi.totalResults)
            //totalResults: +dataApi.totalResults
            //totalResults: Number(dataApi.totalResults)
            //las dos anteriores son opciones para cambiar el tipo de dato de string a number
          }
        }
//El delete no es necesario, yo puedo tomar los datos, crear datos nuevos a partir de los viejos
//con otra estructura
      })
    );
  }
}
