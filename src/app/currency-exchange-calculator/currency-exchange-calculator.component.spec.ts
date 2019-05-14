import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchangeCalculatorComponent } from './currency-exchange-calculator.component';

describe('CurrencyExchangeCalculatorComponent', () => {
  let component: CurrencyExchangeCalculatorComponent;
  let fixture: ComponentFixture<CurrencyExchangeCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyExchangeCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyExchangeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
