import { Component, OnInit } from '@angular/core';
import { ParametersForApiInterface, ShowsInterface, ShowsListResponse } from '@app-models/shows.model';
import { TvShowsService } from '@app-services/tv-shows.service';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss']
})

export class TvshowsComponent implements OnInit {
  showsListFromParent: ShowsInterface[];
  showsListFavorites: ShowsInterface[];

  constructor(private showsService: TvShowsService) {
    this.showsListFromParent = [];
    this.showsListFavorites = [];
  }

  searchShows(value: ParametersForApiInterface){
    this.showsService.getTvShowsFromApi(value.title, value.type, value.year).subscribe(
      (result: ShowsListResponse) => {
        if (!result.error){
          this.showsListFromParent = result.data.results;
        } else {
          alert('too many results, write more!')
        }
        return result;
      }
    )
  }

  ngOnInit(): void {
  }

  addFavorites(showToFavorite: ShowsInterface){
    showToFavorite.selected = true;
    const addedShowFavorite = this.showsListFavorites.findIndex((element: ShowsInterface) => element.id === showToFavorite.id);
    if(addedShowFavorite === -1){
      this.showsListFavorites.push(showToFavorite);
    }
  }

  removeFavorites(index: number){
    this.showsListFromParent[index].selected = false;
  }
}
