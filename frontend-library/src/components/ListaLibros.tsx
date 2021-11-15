import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface library {
    Titulo: string, ISBN: string, Autor: string, Reseña: string, Valor: string;
    Unidades: number;
}
const InitialStateLibrary = {
    Titulo: "", ISBN: "", Autor: "", Reseña: "", Valor: "",
    Unidades: 0
}
export default function ListaLibros() {
    const [libros, setlibros] = useState<library[]>([]);
    const [libraryData, setlibraryData] = useState(InitialStateLibrary);
    useEffect(() => {
        axios.get("http://localhost:8080/api/getlibros").then((res) => {
            setlibros(res.data);
        })
    }, [])

    function EnviarDatos() {
        axios.post(`http://localhost:8080/api/agregarlibro?titulo=${libraryData.Titulo}&ISBN=${libraryData.ISBN}&autor=${libraryData.Autor}&resena=${libraryData.Reseña}&valor=${libraryData.Valor}&unidades=${libraryData.Unidades}`)
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
                            <h3>{libro.Titulo}</h3>
                            <div className="name-container">
                                <p>{libro.Autor}</p>
                                <p>ISBN:{libro.ISBN}</p>
                            </div>
                        </div>
                        <div className="valor">
                            Precio: {libro.Valor}
                        </div>
                        <div>
                            Cantidad: {libro.Unidades}
                        </div>
                        <button className="eliminar" onClick={() => deleteitem(libro)}>X</button>
                    </div>
                    <div className="card-content">
                        <p>Reseña</p>
                        {libro.Reseña}
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
                <input type="text" value={libraryData.Titulo}
                    onChange={(evt) => { ChangesValues("Titulo", evt.target.value) }} />
            </div>
            <div>
                <label >Autor</label>
                <input type="text" value={libraryData.Autor}
                    onChange={(evt) => { ChangesValues("Autor", evt.target.value) }} />
            </div>
            <div>
                <label >Reseña</label>
                <input type="text" value={libraryData.Reseña}
                    onChange={(evt) => { ChangesValues("Reseña", evt.target.value) }} />

            </div>
            <div>
                <label >Valor</label>
                <input type="number" value={libraryData.Valor}
                    onChange={(evt) => { ChangesValues("Valor", evt.target.value) }} />
            </div>
            <div>
                <label >Unidades</label>
                <input type="number" value={libraryData.Unidades}
                    onChange={(evt) => { ChangesValues("Unidades", evt.target.value) }} />
            </div>
            <button onClick={() => EnviarDatos()}>Enviar</button>
        </div>
    </>
    )
}
