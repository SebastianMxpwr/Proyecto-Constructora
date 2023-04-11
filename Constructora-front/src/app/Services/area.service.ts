import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AreaService {
  url = 'http://127.0.0.1:3000/api'
  constructor(private http:HttpClient) { }

  obtenerAreas(){
    return this.http.get(`${this.url}/area`)
  }

  obtenerAreaID(id){
    return this.http.get(`${this.url}/areaId/${id}`)
  }

  obtenerPersonalArea(id){
    return this.http.get(`${this.url}/personalArea/${id}`)
  }

  agregarArea(data){
    return this.http.post(`${this.url}/agergarArea`, data)
  }

  borrarArea(id){
    return this.http.delete(`${this.url}/deleteArea/${id}`)
  }
}
