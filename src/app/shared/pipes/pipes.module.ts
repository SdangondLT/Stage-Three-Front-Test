import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyTextPipe } from './modify-text/modify-text.pipe';
import { PhoneFormatPipe } from './phone-format/phone-format.pipe';



@NgModule({
  declarations: [
    ModifyTextPipe,
    PhoneFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [ModifyTextPipe]
})
export class PipesModule { }
