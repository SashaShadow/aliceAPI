
export const validatePost = () => {
    return (req, res, next) => {
        const photo = req.body;
        if (photo.name && photo.url && photo.desc && photo.category) {
                next();
        } else {
            return res.status(400).send({ error: "parametros incorrectos" });
        }
    }
}

export const validateAuth = () => {
    return (req, res, next) => {
        if (req.session.user) {
            req.body.code = req.session.code
        }
        if (req.body.code === process.env.CODE  &&
            Object.keys(req.body).length === 5) {
            next();
        } else {
            return res.json({error: 'No tienes acceso a esta ruta'})
            }
    }
}

export const validatePut = () => {
    return (req, res, next) => {
        const prodMod = req.body;
        const format = photo.name && photo.url && photo.desc && photo.category &&
        Object.keys(photo).length === 4 ? true : null;

        if (format) {
            next();
        } else {
            res.send({error: "El formato de la foto no es correcto"})
        }
    }
}

export const validateDelete = () => {
    return (req, res, next) => {
        if (req.session.user) {
            req.body.code = req.session.code
        }
        if (req.body.code === process.env.CODE) {
            next();
        } else {
            return res.json({error: 'No tienes acceso a esta ruta'})
        }
    }
}