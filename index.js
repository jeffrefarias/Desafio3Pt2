import { agregarPost,getPosts,deletePosts,likePost } from './database/consultas.js';
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

// Select all posts
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
   
// Insert Posts
   app.get("/posts", async (req, res) => {
    try {
        const result = await getPosts();
        //respuesta del servidor
        return res.status(200).json({ ok: true, message: "Posts registrados en tabla", result }); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, result: "Error al insertar el post"  }); //respuesta del servidor
    }
});


// Delete post


app.delete("/posts/:id", async (req, res) => {
    const {id} = req.params;
    try {
        await deletePosts(id);
        const result = await getPosts();
        //respuesta del servidor
        return res.status(200).json({ ok: true, message: "Posts eliminado", result }); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, result: "Error al eliminar el post"  }); //respuesta del servidor
    }
});

// Update post

app.put("/posts/like/:id", async (req, res) => {
    const {id} = req.params;
    try {
        await likePost(id);
        const result = await getPosts();
        //respuesta del servidor
        return res.status(200).json({ ok: true, message: "Posts con like", result }); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, result: "Error al dar like al post"  }); //respuesta del servidor
    }
});

