const db=require('../database/conexion.js')

class ProfesoresController {
    constructor() {}
  
    consultar(req, res) {
      try{
        db.query(`select * from profesores`,(err,rows)=>{
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
        const {dni,nombre,apellido,email,profesion,telefono}=req.body;
        db.query(`INSERT INTO profesores (id, dni,nombre, apellido, email,profesion,telefono) VALUES (NULL, ?,?,?,?,?,?);`,[dni,nombre,apellido,email,profesion,telefono],(err,rows)=>{
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
        const {dni,nombre,apellido,email,profesion,telefono}=req.body;
        db.query(`UPDATE profesores set dni=? ,nombre=?, apellido=?, email=?,profesion=?,telefono=? where id=?;`,[dni,nombre,apellido,email,profesion,telefono,id],(err,rows)=>{
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
        db.query(`delete from profesores where id=?;`,[id],(err,rows)=>{
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
        db.query(`select * from profesores where id=?`,[id],(err,rows)=>{
          if(err){
            res.status(400).send(err.message);
          }
          res.status(200).json(rows[0 ])
        })
  
      }catch(err){
        res.status(500).send(err.message);
      }
    }
  }
  
  module.exports = new ProfesoresController();
  