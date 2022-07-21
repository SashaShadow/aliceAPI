
export const validatePost = () => {
    return (req, res, next) => {
        const photo = req.body;
        if (photo.name && photo.url && photo.desc && photo.category &&
            Object.keys(photo).length === 4) {
                next();
        } else {
            return res.status(400).send({ error: "parametros incorrectos" });
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