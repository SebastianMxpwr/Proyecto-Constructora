import { Component, OnInit } from '@angular/core';
import { TareaService } from "../../Services/tarea.service";
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  tareas = []
  textoDeBusqueda: ''
  constructor(
    public tareaS: TareaService,
    public router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.obtenerTareas()
  }

  obtenerTareas(){
    const id  = localStorage.getItem('_id')
    this.tareaS.obtenerTareasPersonal(id).subscribe(async(res:any)=>{
      this.tareas = res.cont
      const toast = await this.toastController.create({
        message: 'Obtenidas con exito',
        duration: 2000,
        position: 'top',
        icon: 'checkbox'
      })
      await toast.present();
      console.log(this.tareas);
      
    },async(err)=>{
      const toast = await this.toastController.create({
        message: err.error.msg,
        duration: 3000,
        position: 'top',
        icon: 'close-circle'
      })
      await toast.present();
      console.log(err);
      
    })
  }

  toInfo(id){
    console.log(id);
    
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
