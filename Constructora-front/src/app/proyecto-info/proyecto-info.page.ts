import { Component, OnInit } from '@angular/core';
import { ProyectosService } from "../Services/proyectos.service";
import { AreaService } from "../Services/area.service";
import { PersonalService } from "../Services/personal.service";
import { ToastController } from '@ionic/angular';


import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';
import { ActivatedRoute, Router } from '@angular/router';

export type ChartOptions = {
  chart: ApexChart;
  series: ApexAxisChartSeries | any[];
  stroke: ApexStroke;
  markers: ApexMarkers;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  colors: string[];
  labels: string[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-proyecto-info',
  templateUrl: './proyecto-info.page.html',
  styleUrls: ['./proyecto-info.page.scss'],
})
export class ProyectoInfoPage implements OnInit {

  id=''
  manoObra = 0
  ganancias = 0
  materialesEsperados = 0
  nombreJefes=[]
  area = {
    nombre: ''
  }
  informacion = {
    nombre:'',
    imgProyecto: '',
    personasCargo: [],
    areaAsginada: ''
  }
  estadisticas = []
  public options: Partial<ChartOptions>
  constructor(
    private aRouter: ActivatedRoute,
    private router: Router,
    public proyectoS:ProyectosService,
    public areaS: AreaService,
    public personalS: PersonalService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.proyectoId()
    this.chart()
  }


  proyectoId(){
    this.aRouter.params.subscribe(params=>{
      this.id = params['id']
      this.proyectoS.estadisticaPorProyecto(this.id).subscribe((res:any)=>{
        this.estadisticas.push(res.ManoObra)
        this.estadisticas.push(res.ganancias)
        this.estadisticas.push(res.materialesEsperados)        
      },async(err)=>{
        const toast = await this.toastController.create({
          message: err.error.msg,
          duration: 2000,
          position: 'bottom',
          icon: 'close-circle'
        })
        await toast.present()
      })

      this.proyectoS.obtenerProyectoId(this.id).subscribe((res:any)=>{
        this.informacion = res.cont
        
        this.areaS.obtenerAreaID(this.informacion.areaAsginada).subscribe((res:any)=>{
          this.area = res.cont
          
        },async(err)=>{
          const toast = await this.toastController.create({
            message: err.error.msg,
            duration: 2000,
            position: 'bottom',
            icon: 'close-circle'
          })
          await toast.present()
        })

        this.informacion.personasCargo.forEach(element=>{
          this.personalS.obtenerPersonalId(element).subscribe((res:any)=>{
            this.nombreJefes.push(res.cont.nombre)
          },async(err)=>{
            const toast = await this.toastController.create({
            message: err.error.msg,
            duration: 2000,
            position: 'bottom',
            icon: 'close-circle'
          })
          await toast.present()
        })
        })        
      })
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

  chart(){
    this.options = {
      series: this.estadisticas,
      chart:{
        type:'donut'
      },
      labels: ['Mano de obra', 'Ganancias', 'Materiales esperados'],
      colors: ['#8D8D8D', '#328D23', '#DB1C1C']
    }
  }

  toCronograma(){
    this.router.navigate(['/cronograma', this.id])
  }

}
