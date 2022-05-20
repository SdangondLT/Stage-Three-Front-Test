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
    console.log('ha cambiado a true en el padre')
    showToFavorite.selected = true;
    this.showsListFavorites.push(showToFavorite);
    console.log('lo que deberia recibir el hijo', this.showsListFavorites);
    console.log('lo que deberia showToFavorite', showToFavorite);
  }

  removeFavorites(index: number){
    console.log('ha cambiado a true')
    this.showsListFromParent[index].selected = false;
  }
}
