import { agregarPost,getPosts } from './database/consultas.js';
import express from 'express';
import cors from 'cors'

const app = express();

 // Configurar cors
 app.use(cors());

// Parsear el cuerpo de la solicitud como JSON
app.use(express.json());

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server en puerto: http://localhost:${PORT}`);
})

app.post("/posts", async (req, res) => {

    try {
        const { titulo, url ,descripcion} = req.body
    const result = await agregarPost(titulo, url,descripcion)
    return res.status(201).json({ ok: true, message: "Post agregado con exito", result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, message: "Error al agregar el post" });
    }    
   })
   

   app.get("/posts", async (req, res) => {
    try {
        const result = await getPosts();
        //respuesta del servidor
        return res.status(200).json({ ok: true, message: "Posts registrados en tabla", result }); 
    } catch (error) {
        console.log(error);
        // const { status, message } = handleErrors(error.code);
        return res.status(500).json({ ok: false, result: "Error al obtener el post"  }); //respuesta del servidor
    }
});
