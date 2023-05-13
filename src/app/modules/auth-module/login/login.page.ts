import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/login';
import { Authenticate } from 'src/app/models/authenticate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  clientLoginForm!: FormGroup;
  clientAuthDetails = new Authenticate();
  loginDetails = new Login();
  timer: any = 0;
  isLoading!: boolean;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private alertController: AlertController
            , private loadingCtrl: LoadingController
            , private router: Router) { }

  ngOnInit() {
    this.createClientLoginForm();
  }

  createClientLoginForm() {
    this.clientLoginForm = this.formBuilder.group({
      emailAddress: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitClientLoginForm() {

    this.openSyncLoading(true);

    this.loginDetails.email = this.clientLoginForm.controls['emailAddress'].value;
    this.loginDetails.password = this.clientLoginForm.controls['password'].value;

    this.authService.validateCustomerLogin(this.loginDetails).subscribe((resp) => {
      const dataList = JSON.parse(JSON.stringify(resp));
      if (resp.code == 200) {
        this.clientAuthDetails.data.first_name = dataList.data[0].first_name;
        this.clientAuthDetails.data.last_name = dataList.data[0].last_name;
        this.clientAuthDetails.data.mobile_number = dataList.data[0].mobile_number;
        this.clientAuthDetails.data.email = dataList.data[0].email;
        this.clientAuthDetails.token = dataList.data[0].token;

        this.openSyncLoading(false);
        this.openThePopupModelForValidation('Client Authentication', null, 'Cleint Authentication Successfully.');

        this.saveClientDetailsInLocalStorage(this.clientAuthDetails);

        this.router.navigate(['/booking']);
      } else {
        this.openSyncLoading(false);
        this.openThePopupModelForValidation('Client Authentication', null, dataList.data.msg);
      }
    });
  }

  saveClientDetailsInLocalStorage(clientAuthDetails: Authenticate) {
    localStorage.setItem("firstName", clientAuthDetails.data.first_name);
    localStorage.setItem("lastName", clientAuthDetails.data.last_name);
    localStorage.setItem("emailAddress", clientAuthDetails.data.email);
    localStorage.setItem("mobileNumber", clientAuthDetails.data.mobile_number);
  }

  async openSyncLoading(status: boolean) {

    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1000
    });

    await loading.present();

    if (status == false) {
      await loading.onDidDismiss();
    }
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
