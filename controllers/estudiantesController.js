const db=require('../database/conexion.js')

class EstudiantesController {
  constructor() {}

  consultar(req, res) {

    try{
      db.query(`select * from estudiantes`,(err,rows)=>{
        if(err){
          res.status(400).send(err.message);
        }
        res.status(200).json(rows)
      })

    }catch(err){
      res.status(500).send(err.message);
    }

  }
  ingresar(req, res) {
    
    try{
      const {dni,nombre,apellido,email}=req.body;
      db.query(`INSERT INTO estudiantes (id, dni,nombre, apellido, email) VALUES (NULL, ?, ?, ?,?);`,[dni,nombre,apellido,email],(err,rows)=>{
        if(err){
          res.status(400).send(err.message)
        }
        if(rows.insertId){
          res.status(201).json({id:rows.insertId})
        }
      })

    }catch(err){
      res.status(500).send(err.message)
    }

  }
  actualizar(req, res) {
    try{
      const {id}=req.params;
      const {dni,nombre,apellido,email,}=req.body;
      db.query(`UPDATE estudiantes set dni=? ,nombre=?, apellido=?, email=? where id=?;`,[dni,nombre,apellido,email,id],(err,rows)=>{
        if(err){
          res.status(400).send(err.message)
        }
        if(rows.affectedRows==1){
        res.status(200).json({message:'Registro actualizado correctamente'})
        }
      })

    }catch(err){
      res.status(500).send(err.message)
    }

  }
  borrar(req, res) {
    try{
      const {id}=req.params;
      db.query(`delete from estudiantes where id=?;`,[id],(err,rows)=>{
        if(err){
          res.status(400).send(err.message)
        }
       
          res.status(200).json({message:'Registro eliminado correctamente'})
        
      })

    }catch(err){
      res.status(500).send(err.message)
    }

  }
  consultarDetalle(req, res) {
    try{
      const {id}=req.params;
      db.query(`select * from estudiantes where id=?`,[id],(err,rows)=>{
        if(err){
          res.status(400).send(err.message);
        }
        res.status(200).json(rows[0])
      })

    }catch(err){
      res.status(500).send(err.message);
    }
  }
}

module.exports = new EstudiantesController();
