import pkg from 'pg';
const {Pool} = pkg;
const pool = new Pool({
 host: 'localhost',
 user: 'postgres',
 password: 'admin',
 database: 'likeme',
 allowExitOnIdle: true
})


const agregarPost = async (titulo, url, descripcion) => {
  try {
    const consulta = "INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3)";
    const values = [titulo, url, descripcion];
    console.log(values);
    const result = await pool.query(consulta, values);
    console.log("Post agregado");
    return result.rows[0];
  } catch (error) {
    console.error("Error al agregar el post:", error.message);
    throw error;
  }
};

const getPosts = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
  } catch (error) {
    console.error("Error al obtener posts:", error.message);
    throw error;
  }
};

const deletePosts = async (id) => {
  try {
    await pool.query("DELETE FROM posts WHERE id=$1", [id]);
  } catch (error) {
    console.error("Error al eliminar el posts", error.message);
    throw error;
  }
};

const likePost = async (id) => {
  try {
    // Obtener el valor actual de likes
    const { rows } = await pool.query("SELECT likes FROM posts WHERE id=$1", [id]);
    const nuevoValorLikes = rows[0].likes === 0 ? 1 : 0;

    const result = await pool.query("UPDATE posts SET likes=$1 WHERE id=$2 RETURNING *", [nuevoValorLikes, id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al dar like en el posts", error.message);
    throw error;
  }
};


 export {agregarPost,getPosts,deletePosts,likePost};
