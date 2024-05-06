import { authService } from "../services/auth.services.js";
import { validationResult } from "express-validator"; 
import jwt from "jsonwebtoken";

const authController = {

    async login(req,res){
        const errors =  validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        try{
            const{email, password_empleado} = req.body;
            const empleado = await authService.authenticateEmpleado(email, password_empleado);

            if(!empleado){
                return res.status(401).json({ message: "Invalid email or password"});
            }
            const token = authService.generateTokenForEmpleado(empleado);

             // Asumiendo que 'TrabajaEn' y 'Spa' están incluidos en la respuesta de 'empleado'
             const trabajo = empleado.Trabaja_ens && empleado.Trabaja_ens[0] ? empleado.Trabaja_ens[0] : null;
             res.status(200).json({
                id_empleado: empleado.id_empleado,
                token: token,
                tipo_empleado: empleado.tipo_empleado,
                nombre_empleado: empleado.nombre_empleado,
                apellido_paterno: empleado.apellido_paterno,
                apellido_materno: empleado.apellido_materno,
                email: empleado.email,
                id_spa: trabajo && trabajo.Spa ? trabajo.Spa.id_spa : null,
                nombre_spa: trabajo && trabajo.Spa ? trabajo.Spa.nombre_spa : null,
                ciudad: trabajo && trabajo.Spa ? trabajo.Spa.ciudad : null,


            });
        }catch(error){
            console.error(error);
            res.status(500).json({ message: "Server error"});
        }
    },

    async getPerfil(req,res){
        // Decofica el token para obtener el id del empleado
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const empleadoId = decoded.id;

        // Busca los detalles del perfil del usuario en la base de datos
        const empleado = await authService.getEmpleadoById(empleadoId);
        if(!empleado){
            return res.status(404).json({message: "Empleado not found"});
        }
        // Envia los detalles del perfil del usuario
        res.json(empleado);
    }
};

export { authController };