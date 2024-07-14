const db = require("../database/conexion.js");

class CursosController {
  constructor() {}

  consultar(req, res) {
    try {
      db.query(`select * from cursos`, (err, rows) => {
        if (err) {
          res.status(400).send(err.message);
        }
        res.status(200).json(rows);
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  ingresar(req, res) {
    try {
      const { nombre, descripcion, profesor_id } = req.body;
      db.query(
        `INSERT INTO cursos (id, nombre,descripcion,profesor_id) VALUES (NULL, ?,?,?);`,
        [nombre, descripcion, profesor_id],
        (err, rows) => {
          if (err) {
            res.status(400).send(err.message);
          }
          if (rows.insertId) {
            res.status(201).json({ id: rows.insertId });
          }
        }
      );
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, profesor_id } = req.body;
      db.query(
        `UPDATE cursos set nombre=?, descripcion=?, profesor_id=? where id=?;`,
        [nombre, descripcion, profesor_id, id],
        (err, rows) => {
          if (err) {
            res.status(400).send(err.message);
          } else if (rows.affectedRows == 1) {
            res
              .status(200)
              .json({ message: "Registro actualizado correctamente" });
          }
        }
      );
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  borrar(req, res) {
    try {
      const { id } = req.params;
      db.query(`delete from cursos where id=?;`, [id], (err, rows) => {
        if (err) {
          res.status(400).send(err.message);
        }

        res.status(200).json({ message: "Registro eliminado correctamente" });
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  consultarDetalle(req, res) {
    try {
      const { id } = req.params;
      db.query(`select * from cursos where id=?`, [id], (err, rows) => {
        if (err) {
          res.status(400).send(err.message);
        }
        res.status(200).json(rows[0]);
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  asociar_estudiante(req, res) {
    try {
      const { curso_id, estudiante_id } = req.body;
      db.query(
        `INSERT INTO cursos_estudiantes (curso_id,estudiante_id) VALUES (?,?);`,
        [curso_id, estudiante_id],
        (err, rows) => {
          if (err) {
            res.status(400).send(err.message);
          } else {
            res.status(201).json({message:`Estudiante registrado correctamente`});          
          }
        }
      );
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new CursosController();
