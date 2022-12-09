//const Usuario = require("../models/usuarioModels");

import Usuario from "../models/usuarioModels.js";

async function leerUsuario (req,res) {
//exports.leerUsuario = async (req, res ) => {
    try{
        const usuario = await Usuario.find();
        res.json({usuario});
    }catch(error){
        console.log(error);
    }   
}

async function crearUsuario (req,res) {
//exports.crearUsuario = async (req, res ) => {
    const {email, password, estado} =req.body;
    try{
        let usuario = await Usuario.findOne({email});
        if (usuario){
            return res.status(400).json({msg:" El usuario ya existe"});
        }
        
        usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();
        res.json(usuarioGuardado);

    }catch(error){
        console.log(error);
    }
    
}

async function actualizarUsuario (req,res) {
//exports.actualizarUsuario = async (req, res ) => {
    const {id} = req.params;
    const usuario = await Usuario.findById(id);

    if(!usuario){
        return res.status(400).json({msg:" El usuario no ha sido encontrado"});

    }
    
    usuario.nombre = req.body.nombre || usuario.nombre;
    usuario.password = req.body.password || usuario.password;
    usuario.email = req.body.email || usuario.email;
    usuario.estado =req.body.estado || usuario.estado;
    usuario.save();
    res.json({usuario});
}

async function borrarUsuario (req,res) {
//exports.borrarUsuario = async (req, res ) => {
    const {id} = req.params;
    const usuario = await Usuario.findById(id);

    if(!usuario){
        return res.status(400).json({msg:" El usuario no ha sido encontrado"});

    }
    try{
        await Usuario.deleteOne({_id: req.params.id});
        res.json({msg:"Usuario Eliminado"});

    } catch(error){
    console.log(error);
  } 
}

export {leerUsuario, crearUsuario, actualizarUsuario, borrarUsuario}