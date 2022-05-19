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

 // shows: ShowsInfoInterface ;
  viewSearch: FormGroup;
  drawingShowsData: ShowsInfoInterface[];
  @Input() showsListFromParent: ShowsInfoInterface[];

  constructor(private showsService: TvShowsService,  private fb: FormBuilder) {
    this.showsListFromParent = [];
    this.drawingShowsData = [];
    this.viewSearch = this.fb.group({
      poster: [""],
      shows: this.fb.array([]),
    });
  }

  get getViewShows() : FormArray {
    return this.viewSearch.get('shows') as FormArray;
  }

  showsFound (data: ShowsInfoInterface){
    return this.fb.group({
      image: [data.poster],
      title: [data.title],
      type: [data.type],
      year: [data.year],
      comments: [data.comments],
    })
  }

  ngOnInit(): void {
    this.drawingShowsData = this.showsListFromParent;
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


}
