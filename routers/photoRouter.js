import {validatePost, validatePut} from "../middlewares.js";
import PhotoDAOMongoDB from "../photoDAOMongoDB.js"
import express from "express";
const { Router } = express;
const photoRouter = Router()
const photoStorage = new PhotoDAOMongoDB();

export default photoRouter;

photoRouter.get('', (req, res) => {
    return photoStorage.getElems(req, res)
    .then(fotos => {
      return res.json({fotos})
    })
    .catch(err => {res.send(err); throw err})
})

photoRouter.get('/:id', (req, res) => {
    return photoStorage.getElem(req, res)
    .then(foto => {
        return res.json({foto})
    })
    .catch(err => {res.send(err); throw err})
})

photoRouter.post('', validatePost(), (req, res) => {
    return photoStorage.postElem(req, res)
})

photoRouter.put('/:id', validatePut(), (req, res) => {
    return photoStorage.putElem(req, res)
})

photoRouter.delete('/:id', (req, res) => {
    return photoStorage.deleteElem(req, res)
})