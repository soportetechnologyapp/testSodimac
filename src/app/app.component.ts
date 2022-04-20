import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from './services/customer.service';
import { Customer } from './models/customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formCustomer!: FormGroup;

  constructor(private customerService: CustomerService) {}

  //TODO Funcion que inicializa el formulario
  private validationForm(): void {
    this.formCustomer = new FormGroup({
      nameCustomer: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit(): void {
    this.validationForm();
  }

  addCustomer() {
    //TODO Se hace el llamado al servicio de Customer, el cual comparte un la información con otros componentes
    this.customerService.listCustomer.emit(this.setDataForm());
    this.formCustomer.reset();
  }

  //TODO Se da formato a la data que viene del formulario
  setDataForm(): Customer {
    return {
      nameCustomer: this.formCustomer.get('nameCustomer')?.value,
    };
  }
}
