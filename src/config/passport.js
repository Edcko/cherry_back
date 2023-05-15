import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Empleado } from "../models/index.js";

const jwtOptions = {

    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "your_jwt_secret",
};

const jwtLogin = new JwtStrategy(jwtOptions, async(payload, done) => {
    try{
        const empleado = await Empleado.findByPk(payload.id);

        if(empleado){
            return done( null, empleado);
        }else{
            return done(null,false);
        }
    }catch(error){
        return done(error, false);
    }
});

passport.use(jwtLogin);