import { Cabina, Empleado } from "../models/index.js";

const cabinaService = {

  async getAllCabinas() {
    return await Cabina.findAll({
        include: [
            {
                model: Empleado,
                atributes: ["nombre_empleado", "apellido_paterno", "apellido_materno"],
            },
        ],
    });
},


async getCabinaById(id) {
  return await Cabina.findByPk(id, {
      include: [
          {
              model: Empleado,
              atributes: ["nombre_empleado", "apellido_paterno", "apellido_materno"],
          },
      ],
  });
},

  async createCabina(data) {
    return await Cabina.create(data);
  },

  async updateCabina(id, data){

    const cabina = await Cabina.findOne({ where: { id_cabina: id }});
    if(cabina){
        return await cabina.update(data);
    } else {
        return null;
    }
  },

  async deleteCabina(id){

    const cabina = await Cabina.findOne({ where:{ id_cabina: id} });

    if(cabina){

        await cabina.destroy();
    }
    return cabina;
  },


}

export { cabinaService };
