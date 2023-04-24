import { useLocation } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import { useEffect } from "react";
import { useState } from "react";
import api from "../services/Api";
import GerenciarUsuario from "../components/Usuarios/GerenciarUsuario";

function EditarUsuario(){
   
    const location = useLocation<{ userId: string }>();

    return(
    <div>
        <Navbar/>
        <GerenciarUsuario userId={location.state?.userId}/>
    </div>
    )
}

export default EditarUsuario