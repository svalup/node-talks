import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponentsModule } from '@node-talks/app/components';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
