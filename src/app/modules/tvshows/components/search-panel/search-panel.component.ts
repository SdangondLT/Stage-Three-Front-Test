import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TvShowsService } from '@app-services/tv-shows.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {

  selectedValue: string;
  @Output() searchShowsEmitter = new EventEmitter<string>();
  showForm: FormGroup;

  shows: any[] = [
    {value: 'movies', viewValue: 'Movies'},
    {value: 'series', viewValue: 'Series'},
    {value: 'episodes', viewValue: 'Episodes'},
  ];

  constructor(private showsService: TvShowsService,  private formBuilder: FormBuilder ) {
    this.selectedValue = '';
    this.showForm = this.formBuilder.group({
      movie: [""],
      serie: [""]
      //,episode: ['']
    });
  }

  get getMovie(){
    return this.showForm.get("movie");
  }

  searchShows(){
    console.log('searchShows')
    console.log(this.getMovie!.value)
    this.searchShowsEmitter.emit(this.getMovie!.value);
  }

  ngOnInit(): void {
  }

}
