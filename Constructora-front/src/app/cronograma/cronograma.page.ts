import { Component, OnInit } from '@angular/core';
import { ProyectosService } from "../Services/proyectos.service";
import { PersonalService } from "../Services/personal.service";
import { AreaService } from "../Services/area.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.page.html',
  styleUrls: ['./cronograma.page.scss'],
})
export class CronogramaPage implements OnInit {

  id = ''
  semanas = []
  proyecto = {
    nombre: '',
  imgProyecto: '',
  descripcion:'',
  presupuestoTotal:0,
  manoObra:0,
  materialesEsperados:0,
  tiempoProyectoSemanas:0,
  personasCargo:[],
  areaAsginada:'',
  tareasTotales:[]
  }

  tareasInfo = []

  // {
  //   nombre:'',
  //   prioridad:'',
  //   area:'',
  //   personaAsginada:'',
  //   semanasEsperadasNumber:0,
  //   fechaLimiteDate:0,
  //   detalles:'',
  //   adjuntos:[],
  //   completada: true
  // }
  constructor(
    public proyectoS: ProyectosService, 
    private arouter: ActivatedRoute,
    public personalS: PersonalService,
    public areaS: AreaService,
    public router: Router) { }

  ngOnInit() {
    this.obtenerProyectoYTarea()
  }

  obtenerProyectoYTarea(){
    this.arouter.params.subscribe(params=>{
      this.id = params['id']

      this.proyectoS.obtenerProyectoId(this.id).subscribe((res:any)=>{
        this.proyecto = res.cont        
        this.semanas = Array(this.proyecto.tiempoProyectoSemanas).fill(0).map((x,i)=>i)  
        
        
      },async(err)=>{
        console.log(err);
      })

      this.proyectoS.obtenerTareasProyecto(this.id).subscribe((res:any)=>{
        this.tareasInfo = res.cont
        console.log(this.tareasInfo);
        
      },async(err)=>{
        console.log(err);
        
      })


    })
  }

  toTask(){
    this.router.navigate(['home/tabs/tab2'])
  }
}
