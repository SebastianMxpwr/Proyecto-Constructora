import { Component, OnInit } from '@angular/core';
import { ProyectosService } from "../Services/proyectos.service";
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
})
export class ProyectosPage implements OnInit{

  proyectos = []
  textoDeBusqueda = ''
  tittle = 'Todos los proyectos'
  constructor(
    public proyectoS:ProyectosService, 
    public router: Router,
    private toastController: ToastController) { }

  ngOnInit(){
    this.obtenerTodosProyectos()
  }


  obtenerTodosProyectos(){
    const tipoEmpleado = localStorage.getItem('tipo')
    const id = localStorage.getItem('_id')
    if(tipoEmpleado == 'Jefe' || tipoEmpleado == 'jefe'){
      this.proyectoS.obtenerProyectosPorJefe(id).subscribe( async(proyectosRes:any)=>{
        this.proyectos = proyectosRes.cont
        this.tittle = 'Tus proyectos'
        const toast = await this.toastController.create({
          message: proyectosRes.msg,
          duration: 2000,
          position: 'top',
          icon: 'checkbox'
        })
        await toast.present();
        
      },async(err)=> {
        const toast = await this.toastController.create({
          message: err.error.msg,
          duration: 3000,
          position: 'top',
          icon: 'close-circle'
        })
        await toast.present();
        console.log(err)}
        )
    }else{
      this.proyectoS.obtenerProyectos().subscribe(async(proyecosRes:any)=>{
        this.proyectos = proyecosRes.cont
        const toast = await this.toastController.create({
          message: proyecosRes.msg,
          duration: 2000,
          position: 'top',
          icon: 'checkbox'
        })
        await toast.present();
        console.log(this.proyectos);
      
      },async(err)=> {
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
    
  }

  toInfo(id){
    this.router.navigate(['/proyecto-info', id])
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
