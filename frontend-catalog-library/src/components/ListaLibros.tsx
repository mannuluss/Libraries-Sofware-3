import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface library {
    titulo: string, isbn: string, autor: string, reseña: string, valor: string;
    unidades: number;
}
const InitialStateLibrary:library = {
    titulo: "", isbn: "", autor: "", reseña: "", valor: "",
    unidades: 0
}
export default function ListaLibros() {
    const [libros, setlibros] = useState<library[]>([]);
    const [libraryData, setlibraryData] = useState(InitialStateLibrary);
    useEffect(() => {
        axios.get("/api/getlibros").then((res) => {
            setlibros(res.data);
        })
    }, [])

    function EnviarDatos() {
        axios.post(`/api/agregarlibro?titulo=${libraryData.titulo}&ISBN=${libraryData.isbn}&autor=${libraryData.autor}&resena=${libraryData.reseña}&valor=${libraryData.valor}&unidades=${libraryData.unidades}`)
            .then((res) => {
                var datoslibros = JSON.parse(JSON.stringify(libros));
                var index = datoslibros.findIndex((e: library) => e.isbn == libraryData.isbn);
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
        axios.delete(`/api/deletelibro?ISBN=${libro.isbn}`).then(res => {
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
                                <p>ISBN:{libro.isbn}</p>
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
                <input type="text" value={libraryData.isbn}
                    onChange={(evt) => { ChangesValues("isbn", evt.target.value) }} />
            </div>
            <div>
                <label >titulo</label>
                <input type="text" value={libraryData.titulo}
                    onChange={(evt) => { ChangesValues("titulo", evt.target.value) }} />
            </div>
            <div>
                <label >Autor</label>
                <input type="text" value={libraryData.autor}
                    onChange={(evt) => { ChangesValues("autor", evt.target.value) }} />
            </div>
            <div>
                <label >Reseña</label>
                <input type="text" value={libraryData.reseña}
                    onChange={(evt) => { ChangesValues("reseña", evt.target.value) }} />

            </div>
            <div>
                <label >Valor</label>
                <input type="number" value={libraryData.valor}
                    onChange={(evt) => { ChangesValues("valor", evt.target.value) }} />
            </div>
            <div>
                <label >Unidades</label>
                <input type="number" value={libraryData.unidades}
                    onChange={(evt) => { ChangesValues("unidades", evt.target.value) }} />
            </div>
            <button onClick={() => EnviarDatos()}>Enviar</button>
        </div>
    </>
    )
}
