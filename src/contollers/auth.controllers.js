import { authService } from "../services/auth.services.js";
import { validationResult } from "express-validator"; 

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
            res.status(200).json({token});
        }catch(error){
            console.error(error);
            res.status(500).json({ message: "Sever error"});
        }
    },
};

export { authController };