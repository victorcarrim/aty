import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import CadastroSensor from "../components/Sensores/CadastroSensor";
import ListarSensores from "../components/Sensores/ListarSensores";
import { useLocation } from "react-router-dom";
import ActionButton from "../components/ActionButton";

function GerenciarSensores() {
   const [renderComponent, setRenderComponent] = useState(1);

   const handleChangeManager = () => {
      setRenderComponent(1);
   };

   const handleChangeRegister = () => {
      setRenderComponent(2);
   };

   return (
      <div className="h-screen bg-backgroundSystem grid grid-cols-wrapper ">
         <Navbar />
         <div className="flex flex-col p-4">
            <div className="flex items-center max-w-[400px] gap-4 mb-4">
               <ActionButton
                  onClick={handleChangeManager}
                  style="primary"
                  title="Gerenciar sensores"
               />
               <ActionButton
                  onClick={handleChangeRegister}
                  style="primary"
                  title="Cadastrar sensores"
               />
            </div>
            {renderComponent === 1 ? <ListarSensores /> : <CadastroSensor />}
         </div>
      </div>
   );
}

export default GerenciarSensores;
