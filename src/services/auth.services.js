import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Empleado, TrabajaEn, Spa } from "../models/index.js";

const authService = {
  generateTokenForEmpleado(empleado) {
    const payload = {
      id: empleado.id_empleado,
      role: empleado.tipo_empleado,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
  },

  async authenticateEmpleado(email, password_empleado) {
    console.log("Email:", email);
    console.log("Password:", password_empleado);
    const empleado = await Empleado.findOne({
      where: { email: email },
      include: [{
          model: TrabajaEn,
          include: [{
              model: Spa
          }]
      }]
  });


    console.log("Empleado:", empleado);
    console.log(empleado.Trabaja_ens[0].Spa);


    if (!empleado) {
      return null;
    }

    if(!password_empleado || !empleado.password_empleado){
        return null;
    }

    console.log("password enviado:", password_empleado);
    console.log("password encriptado en la base de datos:", empleado.password_empleado);
    const isPasswordValid = await bcrypt.compare(password_empleado, empleado.password_empleado);
    console.log("las contrasenias coinciden?", isPasswordValid);
    if (!isPasswordValid) {
      return null;
    }
    return empleado;
  },

  async getEmpleadoById(id) {
    try {
      const empleado = await Empleado.findOne({
        where: { id_empleado: id },
        include: [{
          model: TrabajaEn,
          include: Spa
        }]
      });
        return empleado;
    } catch (error) {
        console.error(error);
    }
},

};

export { authService };
