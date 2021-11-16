import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface library {
    titulo: string, ISBN: string, autor: string, reseña: string, valor: string;
    unidades: number;
}
const InitialStateLibrary:library = {
    titulo: "", ISBN: "", autor: "", reseña: "", valor: "",
    unidades: 0
}
export default function ListaLibros() {
    const [libros, setlibros] = useState<library[]>([]);
    const [libraryData, setlibraryData] = useState(InitialStateLibrary);
    useEffect(() => {
        axios.get("http://localhost:8080/api/getlibros").then((res) => {
            console.log(res.data)
            setlibros(res.data);
        })
    }, [])

    function EnviarDatos() {
        axios.post(`http://localhost:8080/api/agregarlibro?titulo=${libraryData.titulo}&ISBN=${libraryData.ISBN}&autor=${libraryData.autor}&resena=${libraryData.reseña}&valor=${libraryData.valor}&unidades=${libraryData.unidades}`)
            .then((res) => {
                var datoslibros = JSON.parse(JSON.stringify(libros));
                var index = datoslibros.findIndex((e: any) => e.ISBN == libraryData.ISBN);
                if (index == -1) {
                    datoslibros.push(libraryData);
                    alert("nuevo libro agregada");
                } else {
                    datoslibros[index] = libraryData;
                    alert("libro actulizado");
                }
                setlibros(datoslibros);
            });
    }
    function editar(libro: library) {
        setlibraryData(libro);
    }
    function deleteitem(libro: library) {
        axios.delete(`http://localhost:8080/api/deletelibro?ISBN=${libro.ISBN}`).then(res => {
            setlibros(libros.filter(e => e != libro))
        })
    }
    function ChangesValues(property: string, value: any) {
        var data = JSON.parse(JSON.stringify(libraryData));
        data[property] = value;
        setlibraryData(data);
    }

    return (<>
        <div className="container">
            {libros.map((libro, index) => {
                return (<div className="card-container" key={index}>
                    <div className="card-title">
                        <div>
                            <h3>{libro.titulo}</h3>
                            <div className="name-container">
                                <p>{libro.autor}</p>
                                <p>ISBN:{libro.ISBN}</p>
                            </div>
                        </div>
                        <div className="valor">
                            Precio: {libro.valor}
                        </div>
                        <div>
                            Cantidad: {libro.unidades}
                        </div>
                        <button className="eliminar" onClick={() => deleteitem(libro)}>X</button>
                    </div>
                    <div className="card-content">
                        <p>Reseña</p>
                        {libro.reseña}
                        <button className="editar" onClick={() => { editar(libro) }}>Editar</button>
                    </div>
                </div>);
            })}
        </div>
        <div className="agregar-container">
            <div>
                <label >ISBN</label>
                <input type="text" value={libraryData.ISBN}
                    onChange={(evt) => { ChangesValues("ISBN", evt.target.value) }} />
            </div>
            <div>
                <label >titulo</label>
                <input type="text" value={libraryData.titulo}
                    onChange={(evt) => { ChangesValues("Titulo", evt.target.value) }} />
            </div>
            <div>
                <label >Autor</label>
                <input type="text" value={libraryData.autor}
                    onChange={(evt) => { ChangesValues("Autor", evt.target.value) }} />
            </div>
            <div>
                <label >Reseña</label>
                <input type="text" value={libraryData.reseña}
                    onChange={(evt) => { ChangesValues("Reseña", evt.target.value) }} />

            </div>
            <div>
                <label >Valor</label>
                <input type="number" value={libraryData.valor}
                    onChange={(evt) => { ChangesValues("Valor", evt.target.value) }} />
            </div>
            <div>
                <label >Unidades</label>
                <input type="number" value={libraryData.unidades}
                    onChange={(evt) => { ChangesValues("Unidades", evt.target.value) }} />
            </div>
            <button onClick={() => EnviarDatos()}>Enviar</button>
        </div>
    </>
    )
}
