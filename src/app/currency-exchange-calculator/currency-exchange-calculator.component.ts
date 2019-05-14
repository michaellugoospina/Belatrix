import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MoneyExchangeAPIService } from '../Services/money-exchange-api.service';
import { ConfigService } from '../ReadConfig/read-config';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-currency-exchange-calculator',
  templateUrl: './currency-exchange-calculator.component.html',
  styleUrls: ['./currency-exchange-calculator.component.css']
})
export class CurrencyExchangeCalculatorComponent implements OnInit {

  EuroValue : any;
  UsdValue : any;
  private apiUrl = this.configService.loadJSON('../assets/AppConfig.json')['ApiUrl'];
  private accessKey = this.configService.loadJSON('../assets/AppConfig.json')['AccessKey'];

  constructor(private exchangeApi: MoneyExchangeAPIService, private configService: ConfigService) { }

  ngOnInit() {
  }

  GetUsdExchange(){
    console.log(this.EuroValue);
     if(this.ValidateRatesExpired()){
      this.exchangeApi.InvokeGetMethod(this.apiUrl+'?access_key='+this.accessKey, {}).subscribe(
        data => {
          var usdApiValue = parseFloat(data.rates.USD);
          var currentEuroVal = this.EuroValue;
          while(currentEuroVal.includes(',')){
            currentEuroVal = currentEuroVal.replace(',','')
          }
          var exchangeValue = parseFloat(currentEuroVal) * usdApiValue;
          this.UsdValue = exchangeValue.toFixed(4);
          localStorage.setItem('UsdRate', data.rates.USD);
          localStorage.setItem('LastUpdate', new Date().toString());
          this.currencyFormatUsd();
        }
        ,
      error => {
        alert('Error getting rates.');
        localStorage.setItem('LastUpdate', 'ERROR');
      });
     }
     else{
       var usdLsValue = parseFloat(localStorage.getItem('UsdRate'));
       var currentEuroVal = this.EuroValue;
          while(currentEuroVal.includes(',')){
            currentEuroVal = currentEuroVal.replace(',','')
          }
       var exchangeValue = parseFloat(currentEuroVal) * usdLsValue;
      this.UsdValue = exchangeValue.toFixed(4);
      this.currencyFormatUsd();
     }
     
  }

  decimalValidator(userKey){
    if(this.EuroValue != null && this.EuroValue.includes('.') && userKey.charCode == 46) return false;
    if (userKey.keyCode == 8 || userKey.keyCode == 46 || userKey.keyCode == 37 || userKey.keyCode == 39 || userKey.keyCode == 36
      || userKey.keyCode == 116 || userKey.keyCode == 9 || userKey.keyCode == 16 || userKey.keyCode == 35) return true;
    if (userKey.keyCode == 46 && this.EuroValue.indexOf('.') != -1) return false;
    if ((userKey.charCode < 48 || userKey.charCode > 57) && userKey.charCode != 46) {
        return false;
    }
    if(this.EuroValue != null && this.EuroValue.includes('.') && this.EuroValue.split('.')[1].length == 4) return false;
    
  }

  currencyFormatEuro(){
    if (this.EuroValue.indexOf(".") >= 0) {
      var decimalPos = this.EuroValue.indexOf(".");
      var leftSide = this.EuroValue.substring(0, decimalPos);
      var rightSide = this.EuroValue.substring(decimalPos);
  
      leftSide = leftSide.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      rightSide = rightSide.replace(/\D/g, "");
      rightSide = rightSide.substring(0, 4);
      this.EuroValue = leftSide + "." + rightSide;
    }
    else{
      if(this.EuroValue != null)
        this.EuroValue = this.EuroValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  currencyFormatUsd(){
    if (this.UsdValue.indexOf(".") >= 0) {
      var decimalPos = this.UsdValue.indexOf(".");
      var leftSide = this.UsdValue.substring(0, decimalPos);
      var rightSide = this.UsdValue.substring(decimalPos);
  
      leftSide = leftSide.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      rightSide = rightSide.replace(/\D/g, "");
      rightSide = rightSide.substring(0, 4);
      this.UsdValue = leftSide + "." + rightSide;
    }
    else{
      if(this.UsdValue != null)
        this.UsdValue = this.UsdValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  ValidateRatesExpired(){
  if(localStorage.length == 0 || localStorage.getItem('LastUpdate') == null
      || localStorage.getItem('LastUpdate') == 'ERROR'){
        return true;
      }

    var lastUpdate = new Date(localStorage.getItem('LastUpdate')).getTime();
    var currentDate = new Date().getTime();
    var diffMs = currentDate - lastUpdate;
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    console.log(diffMins);
    if(diffMins > 10){
      return true;
    }
    else{
      return false;
    }
  }

}
