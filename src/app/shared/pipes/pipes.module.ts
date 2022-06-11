import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyTextPipe } from './modify-text/modify-text.pipe';

@NgModule({
  declarations: [
    ModifyTextPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [ModifyTextPipe]
})
export class PipesModule { }
