import { Sesion } from "../models/index.js";

const sesionService = {

  async getAllSesiones() {
    return await Sesion.findAll();
  },

  async getSesionById(id) {
    return await Sesion.findOne({ where: { id_sesion: id } });
  },

  async createSesion(data) {
    return await Sesion.create(data);
  },

  async updateSesion(id, data){

    const sesion = await Sesion.findOne({where: {id_sesion: id}});
    if(sesion){
       return await sesion.update(data); 
    } else {
        return null;
    }
  },
  
  async deleteSesion(id){

    const sesion = await Sesion.findOne({ where: { id_sesion: id }});
    if(sesion){
        await sesion.destroy();
    }
    return sesion;
  },


};

export { sesionService };
