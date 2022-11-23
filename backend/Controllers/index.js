const { response } = require("express");
const { Pool } = require("pg");

const connectOptions = {
  host: process.env.HOST,
  user: process.env.USER,
  port: Number(process.env.PORT),
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const pool = new Pool(connectOptions);

const getArtists = (req, res) => {
  pool
    .query(`select * from art_gallery_db.artist order by artist_id asc`)
    .then((results) => {
      console.log("Artists get successfully");
      res.render("artist", { data: results });
    })
    .catch((e) => console.log(e));
};

const getArtProduct = (req, res) => {
  pool
    .query(`select * from art_gallery_db.art_product order by art_id asc`)
    .then((results) => {
      console.log("Art got successfully");
      res.render("artproducts", { data: results });
    })
    .catch((e) => console.log(e));
};

// const getUserById = (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   pool
//     .query(`SELECT * FROM pricehistory.users WHERE user_id = $1`, [id])
//     .then((results) => {
//       console.log("user get successfully");
//       res.json(results.rows);
//     })
//     .catch((err) => res.json(err));
// };

const createArtist = (req, res) => {
  const { artist_id, artist_name, employee_id, art_type, followers, passion } = req.body;
  console.log(req.body);
  pool
    .query("INSERT into art_gallery_db.artist VALUES($1, $2, $3, $4, $5, $6)", [
      artist_id,
      artist_name,
      employee_id,
      art_type,
      followers,
      passion
    ])
    .then((response) => {
      console.log("new artist created successfully");
      res.redirect("/artist");
    })
    .catch((err) => res.json(err));
};

const updateArtist = (req, res) => {
  const id = req.params.id;
  console.log(id);
  const {artist_name, art_type, followers, passion} = req.body;
 // console.log(user_password, postal_code, id);
  pool
    .query(
      "UPDATE art_gallery_db.artist SET artist_name = $1, art_type = $2, followers = $3, passion = $4 where artist_id = $5",
      [artist_name, art_type, followers, passion, id]
    )
    .then((response) => {
      console.log("Artist updated successfully");
      res.redirect("/artist");
    })
    .catch((err) => res.json(err));
};

const deleteArtist = (req, res) => {
  const id = req.params.id;
  console.log(id);
  pool
    .query("DELETE FROM art_gallery_db.artist where artist_id = $1", [id])
    .then((response) => {
      console.log("Artist deleted successfully");
      res.redirect("/artist");
    })
    .catch((err) => res.json(err));
};

const createArtProduct = (req, res) => {
  const { art_id,artist_id,sub_category,base_prie,total_views,likes,dislikes } = req.body;
  console.log(req.body);
  pool
    .query("INSERT into art_gallery_db.art_product VALUES($1, $2, $3, $4, $5, $6, $7)", [
      art_id,
      artist_id,
      sub_category,
      base_prie,
      total_views,
      likes,
      dislikes
    ])
    .then((response) => {
      console.log("new Art product created successfully");
      res.redirect("/artproducts");
    })
    .catch((err) => res.json(err));
};

const updateArtProduct = (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  console.log(id);
  const {sub_category,base_price,total_views,likes,dislikes} = req.body;
 // console.log(user_password, postal_code, id);
  pool
    .query(
      "UPDATE art_gallery_db.art_product SET sub_category = $1, base_price = $2, total_views = $3, likes = $4, dislikes = $5 where art_id = $6",
      [sub_category,base_price,total_views,likes,dislikes, id]
    )
    .then((response) => {
      console.log("Art Product updated successfully");
      console.log(response);
      res.redirect("/artproducts");
    })
    .catch((err) => res.json(err));
};
const deleteArtProduct = (req, res) => {
  const id = req.params.id;
   //console.log(id);
  pool
    .query("DELETE FROM art_gallery_db.art_product where art_id = $1", [id])
    .then((response) => {
      console.log("Art deleted successfully");
      res.redirect("/artproducts");
    })
    .catch((err) => res.json(err));
};

const getQuery = (req, res) => {
  res.render("queries", { data: {} });
};

const runQuery = (req, res) => {
  // console.log(req.body);
  pool
    .query(`${req.body.query}`)
    .then((response) =>
      res.render("queries", { data: { resp: response, query: req.body.query } })
    )
    .catch((err) => res.json(err));
};

module.exports = {
  getArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  getArtProduct,
  createArtProduct,
  updateArtProduct,
  deleteArtProduct,
  getQuery,
  runQuery
};
