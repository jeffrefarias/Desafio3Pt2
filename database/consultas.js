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

 export {agregarPost,getPosts};
