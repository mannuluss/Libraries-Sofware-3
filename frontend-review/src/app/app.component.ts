import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface listaReview {
  isbn: string,
  estrellas: number,
  comentario: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'frontend-review';
  lista: listaReview[] = [
    {
      isbn: "000001222",
      estrellas: 5,
      comentario: "no es muy bueno, me dio cancer"
    },
    {
      isbn: "758001222",
      estrellas: 2,
      comentario: "casi me da cancer"
    }
  ]

  /*
  otra manera de obtener la referencia hacia un elemento en el DOM
  @ViewChild('isbn') 
  isbn: ElementRef | null = null;*/
  public isbnbyid = "";//con viewChild


  public isbn = "";
  public stars = 0;
  public comentario = "";


  constructor(private http: HttpClient) {
    http.get("http://localhost:3000/reviews").subscribe((res) => {
      console.log(res);
      this.lista = res as listaReview[];
    })
  }

  sendreview() {
    this.http.post(`http://localhost:3000/addreviews?isbn=${this.isbn}&estrellas=${this.stars}&comentario=${this.comentario}`, null).subscribe((res) => {
      console.log(res);
      var data = { isbn: this.isbn, comentario: this.comentario, estrellas: this.stars }

      var index = this.lista.findIndex(e => e.isbn == this.isbn);
      if (index == -1){
        this.lista.push(data);
        alert("nueva reseña agregada");
      }else{
        this.lista[index] = data;
        alert("reseña actulizada");
      }
     
    })
  }
  deleteitem(item: listaReview) {
    this.http.delete(`http://localhost:3000/deletereviews?isbn=${item.isbn}`).subscribe((res) => {
      this.lista = this.lista.filter(e => e != item);
    })
  }
  editar(item: listaReview) {
    this.isbn = item.isbn;
    this.comentario = item.comentario;
    this.stars = item.estrellas;
  }


}
