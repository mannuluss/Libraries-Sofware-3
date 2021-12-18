import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSelectChange } from '@angular/material/select';

interface listaReview {
  usuario: string,
  isbn: string,
  estrellas: number,
  comentario: string
}
interface library {
  titulo: string, isbn: string, autor: string, descripcion: string, valor: string;
  unidades: number;
}
interface Cart { id: string, isbn: string, cantidad: number }
interface CartRelation { [id: string]: CartDataAngular }
interface CartDataAngular { libro: library, cant: number }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hostreviews = "http://localhost:3000"//direccion del servidor de review (Express)
  hostlibros = "http://localhost:8081"//direccion del servidor de libros (spring)
  hoststore = "http://localhost:8082"//direccion del servidor de la tienda (spring)

  libros: library[] = [];
  usuario = "student";
  //storeCard: string[] = [];//lista de isbn 
  carrito: CartRelation = {};

  state: "inicio" | "carrito" = "inicio";

  SetState(value: "inicio" | "carrito") { this.state = value; }

  GetTotal() {
    var keys = Object.keys(this.carrito);
    let total = 0;
    for (let name of keys) {
      total += this.carrito[name].cant;
    }
    return total;
  }
  KeysObjet = Object.keys;

  constructor(private http: HttpClient) {
    this.init(http)
  }
  init(http: HttpClient){
    http.get(this.hostlibros + "/api/getlibros").subscribe((res) => {
      this.libros = res as library[];
    })

    http.get(this.hoststore + `/api/getcart?usuario=${this.usuario}`).subscribe((res) => {
      console.log("getCart", res);
      for (const item of res as Cart[]) {
        var libro = this.libros.find((e) => e.isbn == item.isbn)
        if (libro)
          this.carrito[item.isbn] = { libro: libro, cant: item.cantidad };
      }
    })
  }

  onclickAddCart(isbn: string, cart?: CartDataAngular) {
    if (cart) {
      if (cart.cant + 1 < cart.libro.unidades)
        this.addcart(isbn, cart.cant + 1)
    } else
      this.addcart(isbn, 1);
  }
  addcart(isbn: string, cant: number) {

    //var index = this.storeCard.findIndex((item) => item == isbn)
    if (!this.carrito[isbn]/*index == -1*/) {
      //this.storeCard.push(isbn);
      var libro = this.libros.find((e) => e.isbn == isbn)
      if (libro)
        this.carrito[isbn] = { libro: libro, cant: cant };
    } else {
      this.carrito[isbn].cant = cant;
    }

    this.http.post(this.hoststore + `/api/addcart?usuario=${this.usuario}&isbn=${isbn}&cantidad=${cant}`, null)
      .subscribe((res) => {
        console.log("addcart", res)
      })
  }
  onCantChange(evt: MatSelectChange, isbn: string) {
    this.addcart(isbn, evt.value);
  }

  deletecart(isbn: string) {
    //this.storeCard = this.storeCard.filter((element) => element != isbn);
    delete this.carrito[isbn];
    this.http.delete(this.hoststore + `/api/deletecart?usuario=${this.usuario}&isbn=${isbn}`).subscribe((res) => {
      console.log(res)
    })
  }

  ChangeUser(){
    console.log(this.usuario)
    this.carrito = {};
    this.init(this.http)
  }
}
