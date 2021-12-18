package store.backendstore.mysqlservices;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import store.backendstore.Cart;
//import store.backendstore.Usuario;

@Repository
public interface CartRepository extends CrudRepository<Cart, String> {
    //@Query(value = "CALL GetAllUser()", nativeQuery = true)
    //public List<Usuario> GetAllUser();

    @Query(value = "CALL GetCartUser(:user)", nativeQuery = true)
    public List<Cart> GetCartUser(@Param("user") String user);

    @Modifying
    @Query(value = "CALL AddCartUser(:usuario, :isbn, :cant)", nativeQuery = true)
    public void addcart(@Param("isbn") String isbn, @Param("usuario") String user, @Param("cant") int cant);

    @Modifying
    @Query(value = "CALL DeleteCartUser(:usuario, :isbn)", nativeQuery = true)
    public void deleteCart(@Param("isbn") String isbn, @Param("usuario") String user);

    // @Modifying
    // // @Query(value = "CALL AddOrUpdateBook(\n-- #book.titulo\n,\n--
    // // #book.isbn\n,\n-- #book.autor\n,\n-- #book.descripcion\n,\n--
    // // #book.valor\n,\n-- #book.unidades\n)", nativeQuery = true)
    // @Query(value = "CALL AddOrUpdateBook(:titulo, :isbn, :autor, :descripcion, :valor, :unidades)", nativeQuery = true)
    // public void Insert(@Param("isbn") String isbn, @Param("titulo") String titulo, @Param("autor") String autor,
    //         @Param("descripcion") String descripcion, @Param("valor") String valor,
    //         @Param("unidades") Integer unidades);

    // @Modifying
    // @Query(value = "CALL DeleteBook(:isbn)", nativeQuery = true)
    // public void DeletebyISBN(@Param("isbn") String isbn);
}
