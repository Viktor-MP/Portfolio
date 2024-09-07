import React from "react";
import { Link } from "react-router-dom";
import { providerPath as path } from "../../../routingPath";


const LogIn = () => {
    return <Link to={path.signIn()}> Log in </Link>;
};

export default LogIn;
