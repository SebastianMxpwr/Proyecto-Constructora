import { Component, OnInit } from '@angular/core';
import {AreaService } from "../Services/area.service";
import { PersonalService } from "../Services/personal.service";
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-registro-empleados',
  templateUrl: './registro-empleados.page.html',
  styleUrls: ['./registro-empleados.page.scss'],
})
export class RegistroEmpleadosPage implements OnInit {

  photoSelected: string | ArrayBuffer | undefined;
  file: File;
  areas=[]
  usuario = {
    nombre:'',
    correo: '',
    contrasena: '',
    numeroTelefono: '',
    area: {
      nombre: ''
    },
    tipoEmpleado:'',
    imgPerfil: File
  }

  constructor(
    public areaS:AreaService, 
    public personalS:PersonalService,
    private toastController: ToastController ){
  }

  ngOnInit() {
    this.obtenerAreas()
  }

  onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];      
      // image preview
      const reader = new FileReader();
      reader.onload = (e) => this.photoSelected = reader.result as string;
      reader.readAsDataURL(this.file);
    }
  }

  obtenerAreas(){
    this.areaS.obtenerAreas().subscribe((res: any)=>{
     this.areas = res.cont
      
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

  crearUsuario(){
    const nuevoUsuario = new FormData()
    nuevoUsuario.append('nombre', this.usuario.nombre)
    nuevoUsuario.append('correo', this.usuario.correo)
    nuevoUsuario.append('contrasena', this.usuario.contrasena)
    nuevoUsuario.append('numeroTelefonoString', this.usuario.numeroTelefono)
    nuevoUsuario.append('area', this.usuario.area.nombre)
    nuevoUsuario.append('tipoEmpleado', this.usuario.tipoEmpleado)
    nuevoUsuario.append('imgPerfil', this.file)

    this.personalS.crearPersonal(nuevoUsuario).subscribe(async(res:any)=>{
      const toast = await this.toastController.create({
        message: 'Creado con exito',
        duration: 1000,
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
      await toast.present()
      
    })
    
  }
  }


