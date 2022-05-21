import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TvShowsService } from '@app-services/tv-shows.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {

  selectedValueDropdown: string;
  @Output() searchShowsEmitter = new EventEmitter<string>();
  showForm: FormGroup;

  shows: any[] = [
    {
      value: 'movies',
      viewValue: 'movies'
    },
    {
      value: 'series',
      viewValue: 'series'
    },
    {
      value: 'episodes',
      viewValue: 'episodes'
    }
  ];

  constructor(private showsService: TvShowsService,  private formBuilder: FormBuilder ) {
    this.selectedValueDropdown = '';
    this.showForm = this.formBuilder.group({
      movie: ["", Validators.required],
      serie: [""]
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

  changeDropdown(value: any){
    this.selectedValueDropdown = value;
    console.log('entro')
    console.log('valor del dropdown', value)
  }
}
