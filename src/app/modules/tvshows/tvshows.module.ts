import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvshowsRoutingModule } from './tvshows-routing.module';
import { TvshowsComponent } from './tvshows.component';

import { SearchViewComponent } from './components/search-view/search-view.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { FavoritesViewComponent } from './components/favorites-view/favorites-view.component';
import {
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatToolbarModule
} from '@shared/angular-material/index';


@NgModule({
  declarations: [
    TvshowsComponent,
    SearchViewComponent,
    SearchPanelComponent,
    FavoritesViewComponent
  ],
  imports: [
    CommonModule,
    TvshowsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule
  ]
})
export class TvshowsModule { }
