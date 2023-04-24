import ListarUsuarios from "../components/Usuarios/ListarUsuarios";
import Navbar from "../components/Navbar/Navbar";

function GerenciarUsuarios() {
   return (
      <div className="grid grid-cols-wrapper bg-backgroundSystem">
         <Navbar />
         <div className="flex flex-col p-4">
            <ListarUsuarios />
         </div>
      </div>
   );
}

export default GerenciarUsuarios;
