import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ShowsInfoInterface } from '@app-models/shows.model';
import { TvShowsService } from '@app-services/tv-shows.service';

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.scss']
})
export class FavoritesViewComponent implements OnInit {

  favoritesForm: FormGroup;
  @Input() showsListFromParent: ShowsInfoInterface[];
  @Output() removeFavoritesEmitter = new EventEmitter<number>();

  constructor(private showsService: TvShowsService,  private fb: FormBuilder ) {
    this.showsListFromParent = [];
    this.favoritesForm = this.fb.group({
      showsFavorites: this.fb.array([]),
    })
  }

  get getFavoritesShows(): FormArray {
    return this.favoritesForm.get('showsFavorites') as FormArray;
  }

  showsFavorites (data: ShowsInfoInterface){
    return this.fb.group({
      image: [data.poster],
      title: [data.title],
      type: [data.type],
      year: [data.year],
      comments: [data.comments],
      selected: [data.selected],
      registrationDate: [data.registrationDate]
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('llego al hijo', this.showsListFromParent)
    if(changes['showsListFromParent'].currentValue){
      this.showsListFromParent = changes['showsListFromParent'].currentValue;
      this.getFavoritesShows.clear();
      this.showsListFromParent.forEach((showsFavorites) => {
        if(showsFavorites.selected) {
          this.getFavoritesShows.push(this.showsFavorites(showsFavorites));
        }
      })
    }
  }

  removeFavorites(index: number){
    console.log('index',index)
    this.removeFavoritesEmitter.emit(index);
    this.getFavoritesShows.at(index).get('selected')?.patchValue('false');
  }

}
