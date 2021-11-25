require('dotenv').config();
const moongose = require("mongoose");
const reseñasModel = require("./models/ModelReviews");

//configuracion conexion con mongodb
moongose.connect(process.env.uri_mongodb, null, () => { console.log("=> Connect with mongondb") });

var InitialReviews = [
    {
        usuario: "mannulus",
        isbn: "000001222",
        estrellas: 0,
        comentario: "no es muy bueno, muy aburrido, perfiero una pelicula"
    },
    {
        usuario: "chaphe",
        isbn: "758001222",
        estrellas: 5,
        comentario: "sin palabras.... excelente obra, me encanta, la leo todo el tiempo"
    }
]
//insertar datos iniciales y crear coleccion
reseñasModel.insertMany(InitialReviews).then((res) => {
    console.log("=> Insercion de los datos completa")
    moongose.connection.close();
}).catch((err) => console.log(err));
