import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ShowsInterface } from '@app-models/shows.model';
import { TvShowsService } from '@app-services/tv-shows.service';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchViewComponent implements  OnChanges {

  viewSearch: FormGroup;
  showToFavorite: ShowsInterface | undefined;
  @Input() showsListFromParent: ShowsInterface[];
  @Output() addFavoritesEmitter = new EventEmitter<ShowsInterface>();
  dataSource: ShowsInterface[];

  constructor(private showsService: TvShowsService,  private fb: FormBuilder) {
    this.showsListFromParent = [];
    this.dataSource = [];
    this.viewSearch = this.fb.group({
      showsArray: this.fb.array([]),
    });
  }

  get getViewShows() : FormArray {
    return this.viewSearch.get('showsArray') as FormArray;
  }

  showsFound (data: ShowsInterface){
    return this.fb.group({
      id: [data.id],
      poster: [data.poster],
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
    if(changes['showsListFromParent']){
      this.dataSource = changes['showsListFromParent'].currentValue;
      this.dataSource.forEach((show: ShowsInterface) => {
        this.getViewShows.push(this.showsFound(show))
      })
    }
  }
//faltan estos apuntos en mi note
  addFavorites(index: number){//cuando damos click en favoritos obtenemos el index
//creamos una const para hacer un object.assign de la referencia utilizando el getViewShows
//el get hace referenciar al formControlName como formArray, como el formControl es un
//formArray para poder acceder a las posiciones del formArray utilizamos el metodo at
//le pasamos un index y tenemos accedo a la posicion en especifico y accedemos al value
//con el value estamos accediendo a toso los campos de showsFound.
    const payload = Object.assign(this.getViewShows.at(index).value, {
      registrationDate: new Date(), favorite: true
    }) //hago un Object.assign porque yo estoy capturando los valores de esa posicion del
//FormArray y le agrego nuevas propiedades al objeto
    //luego el evenEmitter para indicarle al Padre cual es el favorito
    this.addFavoritesEmitter.emit(payload);
  }
}
