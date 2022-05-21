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
  showsListFavorites: ShowsInfoInterface[];

  constructor(private showsService: TvShowsService) {
    this.showsListFromParent = [];
    this.showsListFavorites = [];
  }

  searchShows(movie: string){
    this.showsService.getTvShowsFromApi(movie).subscribe(
      (result: ShowsInterface) => {
        if (result.error){
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

  addFavorites(showToFavorite: ShowsInfoInterface){
    showToFavorite.selected = true;
    const addedShowFavorite = this.showsListFavorites.findIndex((element: ShowsInfoInterface) => element.id === showToFavorite.id);
    if(addedShowFavorite === -1){
      this.showsListFavorites.push(showToFavorite);
    }
  }

  removeFavorites(index: number){
    console.log('ha cambiado a true')
    this.showsListFromParent[index].selected = false;
  }
}
