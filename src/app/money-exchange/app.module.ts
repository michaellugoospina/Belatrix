import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CurrencyExchangeCalculatorComponent } from '../currency-exchange-calculator/currency-exchange-calculator.component';
import { AppComponent } from '../money-exchange/app.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyExchangeCalculatorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
