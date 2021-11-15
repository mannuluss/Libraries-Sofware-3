package example.libraries;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class library {

    public library(String titulo, String iSBN, String autor, String reseña, String valor, Integer unidades) {
        Titulo = titulo;
        ISBN = iSBN;
        Autor = autor;
        Reseña = reseña;
        Valor = valor;
        Unidades = unidades;
    }

    public String Titulo, ISBN, Autor, Reseña, Valor;
    public Integer Unidades;
}
