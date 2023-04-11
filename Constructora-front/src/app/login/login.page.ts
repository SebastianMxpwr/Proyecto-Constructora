import { Component, OnInit } from '@angular/core';
import { PersonalService } from "../Services/personal.service";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user={
    correo : '',
    contrasena: '',
    tipoEmpleado: ''
  }
  constructor(
    public personalS:PersonalService, 
    private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  login(){
    this.personalS.login(this.user).subscribe( async (personal:any) =>{
      localStorage.setItem('_id', personal.user._id)
      localStorage.setItem('tipo', personal.user.tipoEmpleado)
      const toast = await this.toastController.create({
        message: 'Logeado con exito',
        duration: 1000,
        position: 'bottom',
        icon: 'checkbox'
      })
      await toast.present();
      if(personal.user.tipoEmpleado == 'Jefe' || personal.user.tipoEmpleado == 'jefe' || personal.user.tipoEmpleado == 'JefeSupremo'){
        this.router.navigate(['/home'])
      }else{
        this.router.navigate(['/tabs-trabajador/tareas'])
      }
      
      

    },async(err)=>{
      const toast = await this.toastController.create({
        message: err.error.msg,
        duration: 1000,
        position: 'bottom',
        icon: 'close-circle'
      })
      await toast.present();
      console.log(err);
      
    })
  }

}
