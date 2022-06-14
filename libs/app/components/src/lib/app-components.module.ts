import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [CommonModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class AppComponentsModule {}
