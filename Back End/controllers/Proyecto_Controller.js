const Proyecto = require('../Models/Proyectos_Model')
const Tareas = require('../Models/Tarea_Model')
const Personal = require('../Models/Personal_Model')
const Area = require('../Models/Area_Model')
const fs = require('fs');


const obtenerTodosProyectos = async(req, res)=>{
    try {
        const proyectos = await Proyecto.find()
        if(proyectos.length == 0){
            res.status(404).send({
                msg:'No hay proyectos puto',
                cont: 0
            })
        }else{
            res.status(200).send({
                msg: 'Obtendidos Correctamente',
                cont: proyectos
            })
        }
    } catch (error) {
        res.status(500).send({
            msg: 'error del servidor',
            error: error.message
        })
    }
}

const obtenerProyectosActivos = async(req, res)=>{
    try {
        const proyectos = await Proyecto.find({activo: true})
        if(proyectos.length == 0){
            res.status(404).send({
                msg:'No hay proyectos puto',
                cont: 0
            })
        }else{
            res.status(200).send({
                msg: 'Obtendidos Correctamente',
                cont: proyectos
            })
        }
    } catch (error) {
        res.status(500).send({
            msg: 'error del servidor',
            error: error.message
        })
    }
}

const obtenerProyectoPorJefe = async(req, res)=>{
    try {
        let {id} = req.params
        if(!id){
            res.status(400).send({
                msg:'no se recibio un id',
                cont:0 
            })
        }else{
            const jefeEncontrado = await Personal.findById(id)
            if(!jefeEncontrado){
                res.status(404).send({
                    msg: 'Este jefe no existe o no esta registrado',
                    cont: 0
                })
            }else{
                const proyectosPorJefe = await Proyecto.find({personasCargo: {$in: [jefeEncontrado._id]}})
                if(proyectosPorJefe.length == 0){
                    res.status(404).send({
                        msg: 'No tienes proyecto asignados',
                        cont: 0
                    })
                }else{
                    res.status(200).send({
                        msg: 'Proyectos encontrados',
                        cont: proyectosPorJefe
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            error: error.message
        })
    }
}

const obtenerProyectoId = async(req, res)=>{
    try {
        let {id} = req.params
        if(!id){
            res.status(400).send({
                msg:'no se recibio un id',
                cont:0 
            })
        }else{
            const proyectoEncontrado = await Proyecto.findById(id)
            if(!proyectoEncontrado){
                res.status(400).send({
                    msg:'No se encontro el proyecto',
                    cont: 0
                })
            }else{
                res.status(200).send({
                    msg: 'Proyecto Encontrado y entregado',
                    cont: proyectoEncontrado
                })
            }
        }
    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            error: error.message
        })
    }
}

const crearProyecto = async(req, res)=>{
    try {
        let {nombre, descripcion, presupuestoTotalString, manoObraString,
        materialesEsperadosString,tiempoProyectoSemanasString,personasCargo,
        areaAsginada} = req.body

        presupuestoTotal = Number(presupuestoTotalString)
        manoObra = Number(manoObraString)
        materialesEsperados = Number(materialesEsperadosString)
        tiempoProyectoSemanas = Number(tiempoProyectoSemanasString)
        nuevoProyecto = {
            nombre,
            imgProyecto: req.file.path,
            descripcion,
            presupuestoTotal,
            manoObra,
            materialesEsperados,
            tiempoProyectoSemanas,
            personasCargo,
            areaAsginada
        }

        const proyectoAgregado = new Proyecto(nuevoProyecto)
        await proyectoAgregado.save()

        if(!proyectoAgregado){
            res.status(500).send({
                msg:'ocurrio un error vuelva intentar',
                cont: 0
            })
        }else{
            res.status(200).send({
                msg: 'Proyecto Creado correctamente',
                cont: proyectoAgregado
            })
        }
    } catch (error) {
        res.status(500).send({
            msg: 'error del servidor',
            error: error.message
        })
    }
}

const borrarProyecto = async(req, res)=>{
    try {
        let {id} = req.params

        const proyectoEncontrado = await Proyecto.findById(id)
        if(!proyectoEncontrado){
            res.status(404).send({
                msg: 'No existe tal proyecto',
                cont: 0
            })
        }

        const borrarProyecto = await Proyecto.findByIdAndUpdate(id, {activo: false},{new: true})
        if(!borrarProyecto){
            res.status(500).send({
                msg: 'No ese pudo borrar intente de nuevo',
                cont: 0
            })
        }else{
            res.status(200).send({
                msg: 'Proyecto Borrado exitosamente',
                cont: borrarProyecto
            })
        }

    } catch (error) {
        res.status(500).send({
            msg: 'error del servidor',
            error: error.message
        })
    }
}

const obtenerTareasProyecto = async(req, res)=>{
    try {
        let {id} = req.params

        const proyectoEncontrado = await Proyecto.findById(id).populate([
            {
                path: 'tareasTotales.personaAsginada'
            },
            {
                path: 'tareasTotales.area'
            }
        ])
                
        if(!proyectoEncontrado){
            res.status(404).send({
                msg: 'No existe tal proyecto',
                cont: 0
            })
        }else{
            const tareas = proyectoEncontrado.tareasTotales

            if(tareas.length == 0){
                res.status(404).send({
                    msg: 'No hay tareas por mostrar',
                    cont:0
                })
            }else{
                res.status(200).send({
                    msg: 'Aqui estan las tareas',
                    cont: tareas,
                })
            }
        }


    } catch (error) {
        res.status(500).send({
            msg: 'error del servidor',
            error: error.message
        })
    }
}

const estadisticasProyecto = async(req, res)=>{
    try {
        let {id} = req.params

        if(!id){
            res.status(404).send({
                msg:'No se recibio ningun id o id valido',
                cont: 0
            })
        }else{
            const proyectoEncontrado = await Proyecto.findById(id)
            if(!proyectoEncontrado){
                res.status(404).send({
                    msg:'No existe el proyecto',
                    cont: 0
                })
            }else{
                const ganancias = proyectoEncontrado.presupuestoTotal - (proyectoEncontrado.materialesEsperados + proyectoEncontrado.manoObra)
                if(ganancias <= 0){
                    res.status(200).send({
                        msg: 'Ganancias en numeros rojos',
                        ganancias: ganancias,
                        materialesEsperados: proyectoEncontrado.materialesEsperados,
                        ManoObra: proyectoEncontrado.manoObra
                    })
                }else{
                    res.status(200).send({
                        msg: 'Todavia hay ganancias',
                        ganancias: ganancias,
                        materialesEsperados: proyectoEncontrado.materialesEsperados,
                        ManoObra: proyectoEncontrado.manoObra
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            error: error.message
        })
    }
}

const actualizarProyecto = async(req, res)=>{
    try {
        let {id} = req.params
        let {nombre, descripcion, presupuestoTotal, manoObra, materialesEsperados,tiempoProyectoSemanas, areaAsginada} = req. body

        if(!id){
            res.status(404).send({
                msg: "no se recibio un id valido",
                cont: 0
            })
        }else{
            const proyectoEncontrado = await Proyecto.findById(id)
            if(!proyectoEncontrado){
                res.status(404).send({
                    msg:'No existe el proyecto',
                    cont: 0
                })
            }else{
                let cambiosProyecto = {
                    nombre,
                    descripcion,
                    presupuestoTotal,
                    manoObra,
                    materialesEsperados,
                    tiempoProyectoSemanas,
                    areaAsginada
                }
                if(!req.file){
                    const proyectoActualizado = await Proyecto.findByIdAndUpdate(id, cambiosProyecto, {new:true})
                    if(!proyectoActualizado){
                        res.status(400).send({
                            msg: 'No se pudo actualizar intente de nuevo',
                            cont: 0
                        })
                    }else{
                        res.status(200).send({
                            msg: 'Proyecto Actualizado',
                            cont: proyectoActualizado
                        })
                    }
                }else{
                    cambiosProyecto.imgProyecto = req.file.path
                    const proyectoActualizado = await Proyecto.findByIdAndUpdate(id, cambiosProyecto, {new:true})
                    if(!proyectoActualizado){
                        res.status(400).send({
                            msg: 'No se pudo actualizar intente de nuevo',
                            cont: 0
                        })
                    }
                    fs.unlink(proyectoEncontrado.imgProyecto, (err)=>{
                        if(err){
                            console.log(err);
                        }
                        console.log('imagen eliminada');
                    })
                    
                    res.status(200).send({
                        msg: 'Cambios completos hechos',
                        cont: proyectoActualizado
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).send({
            msg: "Ocurri un error interno",
            err: error.message
        })
    }
}

const estadisticasGenerales = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({activo: true})
        const jefes = await Personal.find({tipoEmpleado:{$ne: 'normal'}})
        const personalNormal = await Personal.find({tipoEmpleado: 'normal'})
        const personalTotal = await Personal.find()
        const tareasCompletadas = await Tareas.find({completada: true})
        const tareasNoCompletadas = await Tareas.find({completada: false})


        const gananciasProyectos = []

        proyectos.forEach((e, i)=>{
            const estadisticaNueva ={
                ganacias: e.presupuestoTotal - (e.manoObra + e.materialesEsperados),
                manoObra: e.manoObra,
                materiales: e.materialesEsperados,
                proyecto: e.nombre
            }

            gananciasProyectos.push(estadisticaNueva)
        })

        const filtro = [tareasCompletadas.length, tareasNoCompletadas.length]

        res.status(200).send({
            msg: 'Estadisticas obtenidas',
            proyectosActivos: proyectos.length,
            jefesOgerentes: jefes.length,
            personalNormal: personalNormal.length,
            totalPersonal: personalTotal.length,
            gananciasPorProyectos: gananciasProyectos,
            tareasTotales: filtro
        })

    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            error: error.message
        })
    }
}

const estadisticasPorJefe = async(req, res)=>{
    try {
        let {id} = req.params

        if(!id){
            res.status(400).send({
                msg:'no se recibio un id',
                cont:0 
            })
        }else{
            const jefeEncontrado = await Personal.findById(id)
            if(!jefeEncontrado){
                res.status(404).send({
                    msg: 'Este jefe no existe o no esta registrado',
                    cont: 0
                })
            }else{
                const proyectos = await Proyecto.find({personasCargo: {$in: [jefeEncontrado._id]}})
                const jefes = await Personal.find({tipoEmpleado:{$ne: 'normal'}})
                const personalNormal = await Personal.find({tipoEmpleado: 'normal'})
                const personalTotal = await Personal.find()
                const tareasCompletadas = await Tareas.find({completada: true})
                const tareasNoCompletadas = await Tareas.find({completada: false})


                const gananciasProyectos = []

                proyectos.forEach((e, i)=>{
                    const estadisticaNueva ={
                        ganacias: e.presupuestoTotal - (e.manoObra + e.materialesEsperados),
                        manoObra: e.manoObra,
                        materiales: e.materialesEsperados,
                        proyecto: e.nombre
                    }

                    gananciasProyectos.push(estadisticaNueva)
                })

                const filtro = [tareasCompletadas.length, tareasNoCompletadas.length]

                res.status(200).send({
                    msg: 'Estadisticas obtenidas',
                    proyectosActivos: proyectos.length,
                    jefesOgerentes: jefes.length,
                    personalNormal: personalNormal.length,
                    totalPersonal: personalTotal.length,
                    gananciasPorProyectos: gananciasProyectos,
                    tareasTotales: filtro
                })
            }
            
        }
    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            error: error.message
        })
    }
}

module.exports = {
    obtenerTodosProyectos,
    obtenerProyectosActivos,
    obtenerProyectoPorJefe,
    obtenerProyectoId,
    crearProyecto,
    borrarProyecto,
    obtenerTareasProyecto,
    estadisticasProyecto,
    estadisticasGenerales,
    actualizarProyecto,
    estadisticasPorJefe
}