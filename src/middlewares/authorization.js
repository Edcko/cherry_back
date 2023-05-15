function requiereRole(...allowedRoles){

    return function (req, res, next){
        const userRole = req.user.tipo_empleado;
        console.log(userRole);

        if(allowedRoles.includes(userRole)){
        return next();
    } else {
        return res.status(403).json({message: "Forbidden"});
    }
  };
}

export { requiereRole };