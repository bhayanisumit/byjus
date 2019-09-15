import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule }    from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { PagerService } from './pager.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule
  ],
  providers: [
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
