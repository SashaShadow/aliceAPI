import contenedorMongoDB from "./contenedorMongoDB.js";
import { db, photoModel} from "./dbsConfig.js";

class PhotoDAOMongoDB extends contenedorMongoDB {
    constructor() {
      super(db, photoModel)
    }
  }

export default PhotoDAOMongoDB;