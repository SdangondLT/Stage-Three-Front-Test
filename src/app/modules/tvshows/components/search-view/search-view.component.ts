import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ShowsInfoInterface, ShowsListResponse } from '@app-models/shows.model';
import { TvShowsService } from '@app-services/tv-shows.service';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchViewComponent implements  OnChanges {

  viewSearch: FormGroup;
  @Input() showsListFromParent: ShowsInfoInterface[];
  @Output() addFavoritesEmitter = new EventEmitter<number>();

  constructor(private showsService: TvShowsService,  private fb: FormBuilder) {
    this.showsListFromParent = [];
    this.viewSearch = this.fb.group({
      poster: [""],
      showsArray: this.fb.array([]),
    });
  }

  get getViewShows() : FormArray {
    return this.viewSearch.get('showsArray') as FormArray;
  }

  showsFound (data: ShowsInfoInterface){
    return this.fb.group({
      image: [data.poster],
      title: [data.title],
      type: [data.type],
      year: [data.year],
      comments: [data.comments],
      selected: [data.selected]
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('llego al hijo', this.showsListFromParent)
    if(changes['showsListFromParent'].currentValue){
      this.showsListFromParent = changes['showsListFromParent'].currentValue;
      this.getViewShows.clear();
      this.showsListFromParent.forEach((shows) => {
        this.getViewShows.push(this.showsFound(shows))
      })
    }
  }

  addFavorites(index: number){
    this.addFavoritesEmitter.emit(index);
    this.getViewShows.at(index).get('selected')?.patchValue('true');
  }

}
