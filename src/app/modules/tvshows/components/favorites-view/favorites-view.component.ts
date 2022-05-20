import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ShowsInfoInterface } from '@app-models/shows.model';
import { TvShowsService } from '@app-services/tv-shows.service';

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.scss']
})
export class FavoritesViewComponent implements OnChanges {

  @Input() showsListFavorites: ShowsInfoInterface[];
  @Output() removeFavoritesEmitter = new EventEmitter<number>();

  constructor(private showsService: TvShowsService,  private fb: FormBuilder ) {
    this.showsListFavorites = [];

  }



  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('vista de fav', this.showsListFavorites)
  }

  // removeFavorites(index: number){
  //   console.log('remove index',index)
  //   this.removeFavoritesEmitter.emit(index);
  //   this.getFavoritesShows.at(index).get('selected')?.patchValue('false');
  // }

}
