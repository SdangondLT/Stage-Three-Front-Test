import { Component, OnInit } from '@angular/core';
import { ShowsInfoInterface, ShowsInterface, ShowsListResponse } from '@app-models/shows.model';
import { TvShowsService } from '@app-services/tv-shows.service';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss']
})
export class TvshowsComponent implements OnInit {
  showsListFromParent: ShowsInfoInterface[];

  constructor(private showsService: TvShowsService) {
    this.showsListFromParent = [];
  }

  searchShows(movie: string){
    console.log('searchShows Papa')
    console.log('movie', movie)
    this.showsService.getTvShowsFromApi(movie).subscribe(
      (result: ShowsInterface) => {
        if (result.error){
          console.log('result.data', result.data);
          this.showsListFromParent = result.data.results
        } else {
          alert('too many results, write more!')
        }
        return result;
      }
    )
  }

  ngOnInit(): void {

  }

  addFavorites(index: number){
    console.log('ha cambiado a true')
    this.showsListFromParent[index].selected = true;
  }

  removeFavorites(index: number){
    console.log('ha cambiado a true')
    this.showsListFromParent[index].selected = false;
  }
}
