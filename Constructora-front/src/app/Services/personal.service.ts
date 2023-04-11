import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  url = 'http://127.0.0.1:3000/api'
  constructor(private http: HttpClient) { }

  login(data){
    return this.http.post(`${this.url}/login`, data)
  }

  obtenerTodoPersonal(){
    return this.http.get(`${this.url}/allPersonal`)
  }

  obtenerPersonalJefe(){
    return this.http.get(`${this.url}/allPersonalJefes`)
  }

  obtenerPersonalId(id){
    return this.http.get(`${this.url}/PersonalId/${id}`)
  }

  crearPersonal(data){
    return this.http.post(`${this.url}/addPersonal`, data)
  }

  actualizarPersonal(id){
    //TODO igualemte lo que reste de este codigo
  }

  borrarPersonal(id){
    return this.http.delete(`${this.url}/deletePersonal/${id}`)
  }
}
