package example.libraries;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Book {    

    public String Titulo, ISBN, Autor, Reseña, Valor;
    public Integer Unidades;
}
