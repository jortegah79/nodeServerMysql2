const express=require ('express');
const app=express();
const cors=require('cors')

//Añadir los routers.
const estudiantesRoutes= require('./routes/estudiantesRoutes.js')
const profesoresRoutes= require('./routes/profesoresRoutes.js')
const cursosRoutes=require('./routes/cursosRoutes.js')

//Añadir los middlewares
app.use(express.json())
app.use(cors())

//ruta para control
app.get('/',(req,res)=>{
  res.send('Hola mundo desde el puerto 3000')
})

//Añadir las rutas para los routers
app.use('/estudiantes',estudiantesRoutes);
app.use('/profesores',profesoresRoutes)
app.use('/cursos',cursosRoutes);


//Poner la app a la escucha
app.listen(3000,()=>{
    console.log('Servidor activo');
})