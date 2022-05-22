import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametersForApiInterface } from '@app-models/shows.model';
import { TvShowsService } from '@app-services/tv-shows.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {

  selectedValueDropdown: string;
  @Output() searchShowsEmitter = new EventEmitter<ParametersForApiInterface>();
  validationButton: boolean;
  showForm: FormGroup;

  shows: any[] = [
    {
      value: 'movie',
      viewValue: 'movies'
    },
    {
      value: 'series',
      viewValue: 'series'
    },
    {
      value: 'episode',
      viewValue: 'episodes'
    }
  ];

  parametersForApi: ParametersForApiInterface = {
    title: "",
    type: "",
    year: ""
  };

  constructor(private showsService: TvShowsService,  private formBuilder: FormBuilder ) {
    this.selectedValueDropdown = '';
    this.showForm = this.formBuilder.group({
      showToSearch: ["", Validators.required],
      dropDownForm: ["", Validators.required],
      year: ["", Validators.required]
    });
    this.validationButton = true;
  }

  get getShowToSearch(){
    return this.showForm.get("showToSearch");
  }

  get getYear(){
    return this.showForm.get("year");
  }
  get getDropDownForm(){
    return this.showForm.get("dropDownForm");
  }

  searchShows(){
    console.log('searchShows')
    console.log(this.getShowToSearch!.value)
    this.parametersForApi = {
      title: this.getShowToSearch!.value,
      type: this.getDropDownForm!.value,
      year: this.getYear!.value
    }
    this.searchShowsEmitter.emit(this.parametersForApi);
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
      this.getYear?.setValue('');
    }
  }

  onChangeEventInputSearch(event: any){
    console.log('this.selectedValueDropdown', this.selectedValueDropdown);
    console.log('antes del if', event.target.value);

    if(event.target.value && this.selectedValueDropdown === 'series' && this.getYear?.enable()){
      console.log('2inputs trabajando', event.target.value);
      this.validationButton =  false;
    } else if (event.target.value && this.selectedValueDropdown){
      this.validationButton =  false;
    }
  }
}
