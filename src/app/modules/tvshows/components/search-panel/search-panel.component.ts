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

  get getDropDownForm(){//estos get que me dan acceso a los formcontrol son muy importantes porque siempre
    //seran utiles para acceder a los valores de los formcontrol
    return this.showForm.get("dropDownForm");
  }

  get getShowToSearch(){
    return this.showForm.get("showToSearch");
  }

  get getYear(){
    return this.showForm.get("year");
  }

  ngOnInit(): void {
    //para escuchar los cambios de un formulario reactivo o de un formcontrol
    //lo mejor es usar observables en el ngOnInit como valueChanges y si
    //usamos observables podemos suscribirnos a el y conocer los cambios
    this.getDropDownForm?.valueChanges.subscribe((result) => {
      if(result == 'series') {
        this.getYear?.enable();//casi siempre debo usar los metodos get
        this.getYear?.setValidators([Validators.required, Validators.maxLength(9)]);//setvalidator me permite agregar validadores al formcontrol
        //hay 2 metodos, setvalidator y addValidators, la dif es q el addValidators no elimina los validadores
        //antiguos que ya tenga seteado el formcontrol pero setvalidator borra validator que ya tenga el formcontrol
        //y deja los nuevos que esta agregando. se necesita usar un array

        //como el input year estaba desabilitado no era bueno establecer validators desde antes, es mejor practica
        //agregar validators luego de que el usuario habilite el input year porque desea acceder a esa info

      } else {//con esto nos aseguramos de desabilitar el input year si asi lo desea el usuario
        this.getYear?.disable();
        this.getYear?.clearValidators();//este clear ps limpia o borra los validators
        //para evitar problemas de validators
      }
      this.getYear?.updateValueAndValidity();//este metodo updateValueAndValidity lo tiene el formulario reactivo
      //hace consciente al formulario reactivo de que un campo cambio de valor y de validacion
      //asi actualice su estado
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
