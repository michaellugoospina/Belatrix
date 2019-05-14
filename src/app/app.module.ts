import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyExchangeCalculatorComponent } from './currency-exchange-calculator/currency-exchange-calculator.component';
import { AppComponent } from './money-exchange/app.component';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigService } from './ReadConfig/read-config';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyExchangeCalculatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [HttpClient, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
