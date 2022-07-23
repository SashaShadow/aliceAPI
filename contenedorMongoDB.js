
class contenedorMongo {
    constructor(db, model) {
        this.db = db;
        this.model = model;
    }

    async getElems(req, res) {
        return this.db
        .then(_ => this.model.find({}))
        .then(data => {
            return data
        })
    }

    async getElem(req, res) {
        return this.db
        .then(_ => this.model.find({_id: req.params.id}))
        .then(data => {
            return data
        })
    }

    async postElem(req, res) {
        const elemento = req.body;
        const elemNuevo = new this.model(elemento);

        return this.db
        .then(_ => elemNuevo.save())
        .then(_=> {
                return res.redirect('/api/viewordelete')
        })
    }

    async putElem(req, res) {
        const elemMod = req.body;

        return this.db
        .then(_ => this.model.updateOne({_id: req.params.id}, {$set: elemMod }))
        .then(_=> {
                return res.json({Mensaje: "Foto modificada"})
        })
        .catch(err => console.log("Hubo un error", err))
    }

    async deleteElem(req, res) { 
        this.db
        .then(_ => this.model.findOne({_id: req.params.id}))
        .then(elem => {
            return elem.remove()
        })
        .then(_=> {
                return res.json({Mensaje: "Foto eliminada"})
        })
        .catch(err => console.log("No se encontró el elemento con dicha id", err))
    }
}

export default contenedorMongo;