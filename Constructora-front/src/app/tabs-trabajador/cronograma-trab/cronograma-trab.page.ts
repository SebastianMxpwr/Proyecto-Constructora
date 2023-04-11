import { Component, OnInit } from '@angular/core';
import { TareaService } from "../../Services/tarea.service";

@Component({
  selector: 'app-cronograma-trab',
  templateUrl: './cronograma-trab.page.html',
  styleUrls: ['./cronograma-trab.page.scss'],
})
export class CronogramaTrabPage implements OnInit {

  constructor(private tareaS: TareaService) { }

  tareas =[]
  id=""
  semanas = []
  ngOnInit() {
    this.obtenerTareas()
  }

  obtenerTareas(){
    this.id = localStorage.getItem('_id')
    this.tareaS.obtenerTareasPersonal(this.id).subscribe((res:any)=>{
      this.tareas = res.cont
      this.semanas = Array(res.semanas).fill(0).map((x,i)=>i)  
      console.log(this.tareas, this.semanas);
      
    })
  }

}
