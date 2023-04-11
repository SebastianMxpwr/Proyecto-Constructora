import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PersonalService } from "../Services/personal.service";

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  usuario ={
    correo: '',
    imgPerfil: '',
    imgPortada: '',
    nombre: '',
    numeroTelefono: '',
    tipoEmpleado: ''
  }
  constructor(public router: Router, public personalS:PersonalService) { }

  ngOnInit() {
    this.obtenerUsuarioPersonal()
  }

  obtenerUsuarioPersonal(){
    let id = localStorage.getItem('_id')
    this.personalS.obtenerPersonalId(id).subscribe((res:any)=>{
      this.usuario = res.cont
      
    },err=>{
      console.log(err);
      
    })
  }

  agreagarUsuarios(){
    this.router.navigate(['/registro-empleados'])
  }

  agreagarArea(){
    this.router.navigate(['/crear-area'])
  }

}
