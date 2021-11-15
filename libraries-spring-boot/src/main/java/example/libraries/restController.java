package example.libraries;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", 
methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE })
public class restController {

    private ArrayList<library> libros;

    public restController() {
        libros = new ArrayList<library>();
        libros.add(new library("libro1", "000001222", "jose marquez", "aqui va le reseña de un muy buen libro por eso cuesta bastante.", "100.5", 10));
        libros.add(new library("libro2", "758001222", "socrates", "muy filosofico, probablemente le aburra a algunos y a otros no tanto.", "20.5", 10));
        libros.add(new library("libro3", "050001222", "jose marquez", "aqui va la reseña, [anexo1]", "50", 10));
    }

    @GetMapping("/getlibros")
    public ResponseEntity<?> GetLibraries() {
        return new ResponseEntity<List<library>>(libros, HttpStatus.OK);
    }

    @PostMapping("/agregarlibro")
    public ResponseEntity<?> PostLibrary(@RequestParam(value = "titulo") String titulo,
            @RequestParam(value = "ISBN") String iSBN, @RequestParam(value = "autor") String autor,
            @RequestParam(value = "resena") String reseña, @RequestParam(value = "valor") String valor,
            @RequestParam(value = "unidades") Integer unidades) {
        int number = -1;
        for (Integer i = 0; i < libros.size(); i++) {
            if (libros.get(i).ISBN.equals(iSBN)) {
                number = i;
                break;
            }
        }
        library newlibro = new library(titulo, iSBN, autor, reseña, valor, unidades);
        if (number != -1) {
            libros.set(number, newlibro);
        } else
            libros.add(newlibro);
        return new ResponseEntity<String>(HttpStatus.OK);
    }

    @DeleteMapping("/deletelibro")
    public Map<String, HttpStatus> PostLibrary(@RequestParam(value = "ISBN") String iSBN) {
        int number = -1;
        for (Integer i = 0; i < libros.size(); i++) {
            if (libros.get(i).ISBN.equals(iSBN)) {
                number = i;
                break;
            }
        }
        var map = new HashMap<String, HttpStatus>();
        if (number != -1) {
            libros.remove(number);
            map.put("code", HttpStatus.OK);
        } else
            map.put("code", HttpStatus.BAD_REQUEST);
        return map;
    }
}
