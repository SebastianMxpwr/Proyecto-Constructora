import { Component, OnInit } from '@angular/core';
import { PersonalService } from "../Services/personal.service";
import { AreaService } from "../Services/area.service";
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-crear-area',
  templateUrl: './crear-area.page.html',
  styleUrls: ['./crear-area.page.scss'],
})
export class CrearAreaPage implements OnInit {

  idsJefes = []
  idsPersonal = []
  nombreJefes = []
  nombrepersonal = []
  personalJefes=[]
  personalNormal=[]
  area = {
    nombre: '',
    Trabajadores: [],
    Jefes: []
  }
  constructor(
    public personalS: PersonalService, 
    public areaS: AreaService,
    private toastController: ToastController) { }

  ngOnInit() {
    this.jefes()
    this.noJefes()
  }

  mostrarNombrePersonal(){
    this.nombrepersonal=[]
    this.area.Trabajadores.forEach(element=>{
      this.nombrepersonal.push(element.nombre)
      this.idsPersonal.push(element._id)
    })    
  }

  mostrarNombreJefes(){
    this.nombreJefes=[]
    this.area.Jefes.forEach(element=>{
      this.nombreJefes.push(element.nombre)
      this.idsJefes.push(element._id)
    })
  }

  jefes(){
    this.personalS.obtenerPersonalJefe().subscribe((res:any)=>{
      this.personalJefes = res.cont      
    },async(err)=>{
      const toast = await this.toastController.create({
        message: err.error.msg,
        duration: 2000,
        position: 'bottom',
        icon: 'close-circle'
      })
      await toast.present();
    })
  }

  noJefes(){
    this.personalS.obtenerTodoPersonal().subscribe((res:any)=>{
      this.personalNormal = res.cont      
    },async(err)=>{
      const toast = await this.toastController.create({
        message: err.error.msg,
        duration: 2000,
        position: 'bottom',
        icon: 'close-circle'
      })
      await toast.present();
    })
  }

  crearArea(){
    this.area.Trabajadores = this.idsPersonal
    this.area.Jefes = this.idsJefes
    this.areaS.agregarArea(this.area).subscribe(async(res)=>{
      const toast = await this.toastController.create({
        message: 'Area creada con exito',
        duration: 2000,
        position: 'bottom',
        icon: 'checkbox'
      })
      await toast.present();
      
    },async(err)=>{
      const toast = await this.toastController.create({
        message: err.error.msg,
        duration: 2000,
        position: 'bottom',
        icon: 'close-circle'
      })
      await toast.present();
      
    })
    
  }

}
