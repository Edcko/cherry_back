import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Empleado } from "../models/index.js";

const authService = {
  generateTokenForEmpleado(empleado) {
    const payload = {
      id: empleado.id_empleado,
      role: empleado.tipo_empleado,
    };
    return jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });
  },

  async authenticateEmpleado(email, password_empleado) {
    console.log("Email:", email);
    console.log("Password:", password_empleado);
    const empleado = await Empleado.findOne({ where: { email } });

    //console.log("Empleado:", empleado);

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
};

export { authService };
