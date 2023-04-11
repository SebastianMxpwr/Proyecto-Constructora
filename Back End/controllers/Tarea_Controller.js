const Tarea = require('../Models/Tarea_Model')
const Proyecto  = require('../Models/Proyectos_Model')
const Personal = require('../Models/Personal_Model')
const moment = require('moment')


const obtenerTareas = async(req, res)=>{
    try {
        const tareasObtenidas = await Tarea.find()
        if(tareasObtenidas.length == 0) {
            res.status(404).send({
                msg: 'No hay tareas',
                cont: 0
            })
        }else{
            res.status(200).send({
                msg:'Tareas obtenidas con exito',
                cont: tareasObtenidas
            })
        }
    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            err: error.message
        })
    }
}

const obtenerTareaID = async(req,res)=>{
   try {
    let {id} = req.params

    if(!id){
        res.status(404).send({
            msg: 'No se recibi un id valido',
            cont: 0
        })
    }else{
        const tareaObtenidaID = await Tarea.findById(id)
        if(!tareaObtenidaID){
            res.status(404).send({
                msg: 'No existe la tarea',
                cont: 0
            })
        }else{
            res.status(200).send({
                msg: 'Tarea obtenida con exito',
                cont: tareaObtenidaID
            })
        }
    }
   } catch (error) {
    res.status(500).send({
        msg: 'Error interno',
        err: error.message
    })
   }
} 

const crearTarea = async(req, res)=>{
    try {
        console.log(req.body);
        
        let {nombre, prioridad,proyecto, area, personaAsginada,
            semanasEsperadas, fechaLimite, detalles} = req.body

        let paths = []
        req.files.forEach(element => {
            paths.push(element.path)
        });
        console.log(paths);

        fechaLimiteDate = new Date(fechaLimite)
        semanasEsperadasNumber = Number(semanasEsperadas)

        const nuevaTarea = {
            nombre,
            prioridad,
            proyecto,
            area,
            personaAsginada,
            semanasEsperadasNumber, 
            fechaLimiteDate,
            detalles,
            adjuntos: paths
        }

        console.log(nuevaTarea);
        const tareaAgregada = new Tarea(nuevaTarea)
        const tareaAgregadaProyecto = await Proyecto.findOneAndUpdate({_id: proyecto},{$push:{tareasTotales:tareaAgregada}},{new:true})

        await tareaAgregada.save()

        if(!tareaAgregada && !tareaAgregadaProyecto){
            res.status(400).send({
                msg: 'Error del servidor, intente de nuevo'
            })
        }else if(tareaAgregada && !tareaAgregadaProyecto){
            res.status(200).send({
                msg:'Tarea Creada pero no esta en el proyecto',
                res: tareaAgregada
            })
        }else{
            res.status(200).send({
                msg:'Tarea creada y agregada ',
                res: [tareaAgregada, tareaAgregadaProyecto]
            })
        }


    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            err: error.message
        })
    }
}

const actualizarTarea = async(req, res)=>{
    try {
        const {id} = req.params
        let {nombre, prioridad, area, personaAsginada,
            semanasEsperadas, fechaLimite, detalles} = req.body

        const tareaEncontrada = await Tarea.findById(id)
        if(!tareaEncontrada){
            res.status(404).send({
                msg: 'No se enuentra la tarea'
            })
        }else{
            const nuevaTarea = {
                nombre,
                prioridad,
                area,
                personaAsginada,
                semanasEsperadas, 
                fechaLimite,
                detalles,
            }

            const tareaEncontradaActualizada = await Tarea.findByIdAndUpdate(id,nuevaTarea,{new:true})
            if(!tareaEncontrada){
                res.status(400).send({
                    msg: 'No se pudo actualizar la tarea, intente de nuevo'
                })
            }else{
                res.status(200).send({
                    msg: 'Exito al actualizar la tarea',
                    cont: tareaEncontradaActualizada
                })
            }
        }
    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            err: error.message
        })
    }
}

const borrarTarea = async(req, res)=>{
    try {
        const {id} = req.params

        const tareaBorrada = await Tarea.findByIdAndUpdate(id,{activo: false},{new:true})

        if(!tareaBorrada){
            res.status(400).send({
                msg: 'No se pudo borrar la tarea, intente de nuevo'
            })
        }else{
            res.status(200).send({
                msg: 'Exito al borrar la tarea',
                cont: tareaBorrada
            })
        }
    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            err: error.message
        })
    }
}

const completarTarea = async(req, res)=>{
    try {
        const {id} = req.params

        const tareaCompletada = await Tarea.findByIdAndUpdate(id,{completada: true},{new:true})

        if(!tareaCompletada){
            res.status(400).send({
                msg: 'No se pudo completar la tarea, intente de nuevo'
            })
        }else{
            res.status(200).send({
                msg: 'Exito al completar la tarea',
                cont: tareaCompletada
            })
        }
    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            err: error.message
        })
    }
}

const tareasPorPersonal = async(req, res)=>{
    try {
        let {id}= req.params
        if (!id) {
            res.status(404).send({
                msg: 'No se recibio un id o id valido',
                cont:0 
            })
        } else {
            const personaAsignada = await Personal.findById(id)
            if(!personaAsignada){
                res.status(404).send({
                    msg: 'No existe esta persona',
                    cont:0 
                })
            }else{
                const tareasObtenidas = await Tarea.find({personaAsginada: personaAsignada._id})
                semanas = 0
                tareasObtenidas.forEach((e, i)=>{
                    if(e.semanasEsperadasNumber > semanas ){
                        semanas = e.semanasEsperadasNumber
                    }else{
                        return
                    }
                })
                if(tareasObtenidas.length == 0){
                    res.status(404).send({
                        msg: 'No hay tareas por ahora',
                        cont:0 
                    })
                }else{
                    res.status(200).send({
                        msg: 'Obtenidas con exito',
                        cont: tareasObtenidas,
                        semanas: semanas 
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).send({
            msg: 'Error interno',
            err: error.message
        })
    }
}
module.exports = {
    obtenerTareas,
    obtenerTareaID,
    crearTarea,
    actualizarTarea,
    borrarTarea,
    completarTarea,
    tareasPorPersonal

}