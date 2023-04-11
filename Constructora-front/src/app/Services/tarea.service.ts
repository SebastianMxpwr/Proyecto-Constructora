import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class TareaService {
  url = 'http://127.0.0.1:3000/api'

  constructor(private http:HttpClient) { }

  obtenerTareas(){
    return this.http.get(`${this.url}/tareas`)
  }
  obtenerTareaId(id){
    return this.http.get(`${this.url}/tareas/${id}`)
  }
  obtenerTareasPersonal(id){
    return this.http.get(`${this.url}/tareasPersonal/${id}`)
  }
  crearTarea(data){
    return this.http.post(`${this.url}/crearTarea`, data)
       
  }
  actualizarTarea(id, data){
    return this.http.put(`${this.url}/actualizar/${id}`, data)
  }
  completarTarea(id, data){
    return this.http.put(`${this.url}/tacompletarreas/${id}`, data)
  }
  borrarTarea(id){
    return this.http.delete(`${this.url}/borrar/${id}`)
  }
}
