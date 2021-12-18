package store.backendstore;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import store.backendstore.mysqlservices.ICartService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE })
public class StoreController {

    @Autowired
    private ICartService service;

    public StoreController() {
    }

    @GetMapping("/getcart")
    public ResponseEntity<?> GetCartUser(@RequestParam(value = "usuario") String nombreuser) {
        List<Cart> booksList = service.GetCart(nombreuser);// new ArrayList<Book>(books.values());
        return new ResponseEntity<List<Cart>>(booksList, HttpStatus.OK);
    }

    @PostMapping("/addcart")
    public ResponseEntity<?> PostCart(
            @RequestParam(value = "usuario") String nombreuser,
            @RequestParam(value = "isbn") String isbn,
            @RequestParam(value = "cantidad", defaultValue = "1") int cantidad) {

        service.AddCartUser(isbn, nombreuser, cantidad);
        return new ResponseEntity<String>("{\"status\":\"OK\"}", HttpStatus.OK);
    }

    @DeleteMapping("/deletecart")
    public ResponseEntity<?> DeleteCart(@RequestParam(value = "isbn") String isbn,
            @RequestParam(value = "usuario") String nombreuser) {
        service.DeleteCartUser(isbn, nombreuser);
        return new ResponseEntity<String>("{\"status\":\"OK\"}", HttpStatus.OK);
    }

}
