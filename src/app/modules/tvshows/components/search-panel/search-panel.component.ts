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
      showToSearch: ["", Validators.required],
      dropDownForm: ["", Validators.required],
      year: ["", Validators.required]
    });
  }

  get getShowToSearch(){
    return this.showForm.get("showToSearch");
  }

  get getYear(){
    return this.showForm.get("year");
  }

  searchShows(){
    console.log('searchShows')
    console.log(this.getShowToSearch!.value)
    this.searchShowsEmitter.emit(this.getShowToSearch!.value);
  }

  ngOnInit(): void {
    this.getYear?.disable();
  }

  changeDropdown(value: any){
    this.selectedValueDropdown = value;
    console.log('entro')
    console.log('valor del dropdown', value)
    if(value === 'series'){
      this.getYear?.enable();
    } else {
      console.log(value)
      this.getYear?.disable();
    }
  }
}
