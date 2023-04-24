import { useLocation } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import GerenciarSensor from "../components/Sensores/GerenciarSensor";

function EditarSensor(){
   
    const location = useLocation<{ userId: string }>();

    return(
    <div>
        <Navbar/>
        <GerenciarSensor id={location.state?.id}/>
    </div>
    )
}

export default EditarSensor;