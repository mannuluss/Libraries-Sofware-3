CREATE DATABASE IF NOT EXISTS `catalog-library`;

USE `catalog-library`;
CREATE TABLE IF NOT EXISTS Book (
	titulo VARCHAR(60), 
	ISBN VARCHAR(60) PRIMARY KEY, 
	autor VARCHAR(60), 
	descripcion VARCHAR(250),
	valor VARCHAR(60),
 	unidades INT
);

DELIMITER //

CREATE PROCEDURE GetAllBooks()
BEGIN
	SELECT * FROM Book;
END //

DELIMITER ;

#procedimiento para agregar un registro o actualizar
DELIMITER //

CREATE PROCEDURE AddOrUpdateBook(titulo VARCHAR(60), 
	isbn VARCHAR(60), 
	autor VARCHAR(60),
	descripcion VARCHAR(250),
	valor VARCHAR(60),
 	unidades INT)
BEGIN
	if(ISNULL((SELECT b.ISBN FROM Book b WHERE b.ISBN = isbn))) then 
		INSERT INTO Book VALUES (titulo, isbn, autor, descripcion, valor, unidades);
	ELSE
		UPDATE Book b SET titulo=titulo, autor=autor, descripcion=descripcion, 
		valor=valor, unidades=unidades WHERE b.ISBN = isbn;
	END if;
END //

DELIMITER ;

#procedimiento para eliminar un libro
DELIMITER //

CREATE PROCEDURE DeleteBook(isbn VARCHAR(60))
BEGIN
	DELETE FROM Book b WHERE b.ISBN = isbn;
END //

DELIMITER ;

#insert iniciales
INSERT INTO Book VALUES ("El milagro metabolico", "9789584276971", "Carlos Jaramillo", "En este libro, el célebre doctor Carlos Jaramillo ofrece respuestas contundentes a esas preguntas y plantea que la clave para un peso óptimo y una salud plena está en el metabolismo", "49", 10);
INSERT INTO Book VALUES ("A fuego lento", "9789584295446", "Paula Hawkins", "El descubrimiento del cuerpo de un joven asesinado brutalmente en una casa flotante de Londres desencadena sospechas sobre tres mujeres. ", "59", 20);
INSERT INTO Book VALUES ("Silence", "9789585191426", "Flor M. Salvador", "La confusión se ha disipado y ya no hay nada que perturbe la relación entre Patch y Nora", "55", 15);

