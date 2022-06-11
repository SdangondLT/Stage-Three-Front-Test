import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametersForApiInterface } from '@app-models/shows.model';
import { TvShowsService } from '@app-services/tv-shows.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {

  @Output() searchShowsEmitter = new EventEmitter<ParametersForApiInterface>();
  showForm: FormGroup;
  shows: any[];

  parametersForApi: ParametersForApiInterface = {
    title: "",
    type: "",
    year: ""
  };

  constructor(private showsService: TvShowsService,  private formBuilder: FormBuilder ) {
    this.showForm = this.formBuilder.group({
      dropDownForm: ['', Validators.required],
      showToSearch: ['', Validators.required],
      year: [{value: '', disabled: true}]
    });
    this.shows = [
      {
        label: 'movie',
        valueToShow: 'peliculas'
      },
      {
        label: 'series',
        valueToShow: 'series'
      },
      {
        label: 'episode',
        valueToShow: 'episodios'
      }
    ];
  }

  get getDropDownForm(){
    return this.showForm.get("dropDownForm");
  }

  get getShowToSearch(){
    return this.showForm.get("showToSearch");
  }

  get getYear(){
    return this.showForm.get("year");
  }

  ngOnInit(): void {
    this.getDropDownForm?.valueChanges.subscribe((result) => {
      if(result == 'series') {
        this.getYear?.enable();
        this.getYear?.setValidators([Validators.required, Validators.maxLength(9)]);
      } else {
        this.getYear?.disable();
        this.getYear?.clearValidators();
      }
      this.getYear?.updateValueAndValidity();
    })
  }

  searchShows(){
    this.parametersForApi = {
      title: this.getShowToSearch!.value,
      type: this.getDropDownForm!.value,
      year: this.getYear!.value
    }
    this.searchShowsEmitter.emit(this.parametersForApi);
  }
}
