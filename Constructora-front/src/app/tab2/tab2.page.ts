import { Component, OnInit } from '@angular/core';
import {TareaService } from "../Services/tarea.service";
import {AreaService } from "../Services/area.service";
import { PersonalService } from "../Services/personal.service";
import { ProyectosService } from "../Services/proyectos.service";
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  areas = []
  personal = []
  proyectos = []
  files:any
  fecha = ''
  tarea = {
    nombre: "",
    prioridad: "",
    proyecto: {_id: ''},
    area: {_id: ''},
    personaAsignada: {_id: ''},
    semanasEsperadas: '',
    fechaLimite: '',
    detalles: "",
    adjuntos: [],
  }

  prioridad = ["Alta","Media","Baja"]

  constructor(
    public tareaS: TareaService, 
    public areaS: AreaService,
    public personalS:PersonalService,
    public proyectoS: ProyectosService,
    private toastController: ToastController) {}

  ngOnInit(): void {
    this.obtenerAreas()
    this.obtenerJefes()
    this.obtenerProyectos()
  }

  obtenerAreas(){
    this.areaS.obtenerAreas().subscribe((res:any)=>{
      this.areas = res.cont      
    },async(err)=>{
      const toast = await this.toastController.create({
        message: err.error.msg,
        duration: 2000,
        position: 'bottom',
        icon: 'checkbox'
      })
      await toast.present();
      
    })
  }

  obtenerJefes(){
    this.personalS.obtenerTodoPersonal().subscribe((res:any)=>{
      this.personal = res.cont      
    }
    ,async(err) =>{
      const toast = await this.toastController.create({
        message: err.error.msg,
        duration: 2000,
        position: 'bottom',
        icon: 'checkbox'
      })
      await toast.present();
  
    })
  }

  obtenerProyectos(){
    this.proyectoS.ObtenerProyectosActivos().subscribe((res:any)=>{
      this.proyectos = res.cont      
    },async(err)=>{
      const toast = await this.toastController.create({
        message: err.error.msg,
        duration: 2000,
        position: 'bottom',
        icon: 'checkbox'
      })
      await toast.present();      
    })
  }

  agregarTarea(){
    const nuevaTarea =  new FormData()
    nuevaTarea.append('nombre', this.tarea.nombre)
    nuevaTarea.append('prioridad', this.tarea.prioridad)
    nuevaTarea.append('proyecto', this.tarea.proyecto._id)
    nuevaTarea.append('area', this.tarea.area._id)
    nuevaTarea.append('personaAsginada', this.tarea.personaAsignada._id)
    nuevaTarea.append('semanasEsperadas', this.tarea.semanasEsperadas)
    nuevaTarea.append('fechaLimite', this.tarea.fechaLimite)
    nuevaTarea.append('detalles', this.tarea.detalles)
    if(this.files){
      for (let i = 0; i < this.files.length; i++) {
        nuevaTarea.append('archivo', this.files[i])      
      }
    }
    
    
    this.tareaS.crearTarea(nuevaTarea).subscribe(async(res:any)=>{
      const toast = await this.toastController.create({
        message: 'Tarea creada con exito',
        duration: 2000,
        position: 'bottom',
        icon: 'checkbox'
      })
      await toast.present();
      

    }, async(err)=>{
      const toast = await this.toastController.create({
        message: err.error.msg,
        duration: 2000,
        position: 'bottom',
        icon: 'checkbox'
      })
      await toast.present();
      
    })
  }

  onFileSelected(event){
    this.files = event.target.files 
  }



}
