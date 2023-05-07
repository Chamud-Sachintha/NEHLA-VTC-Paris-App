import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  clientRegisterForm!: FormGroup;
  clientDetails = new Client();

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private alertController: AlertController) { }

  ngOnInit() {
    this.createClientRegisterForm();
  }

  onSubmitCreateAccount() {
    this.clientDetails.first_name = this.clientRegisterForm.controls['firstName'].value;
    this.clientDetails.last_name = this.clientRegisterForm.controls['lastName'].value;
    this.clientDetails.mobile_number = this.clientRegisterForm.controls['mobileNumber'].value;
    this.clientDetails.email = this.clientRegisterForm.controls['emailAddress'].value;
    this.clientDetails.password = this.clientRegisterForm.controls['password'].value;

    this.authService.registerNewClient(this.clientDetails).subscribe((resp) => {
      if (resp.code == 201) {
        this.openThePopupModelForValidation('New Client Registration', null, 'Account Created Successfully.');
      } else {
        this.openThePopupModelForValidation('New Client Registration', null, 'Account Created Not Successfully.');
      }
    })
  }

  createClientRegisterForm() {
    this.clientRegisterForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async openThePopupModelForValidation(header: string, subHeader: any = null, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
