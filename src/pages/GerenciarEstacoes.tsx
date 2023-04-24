import Navbar from "../components/Navbar/Navbar";
import CadastroEstacoes from "../components/Estacoes/CadastroEstacoes";

function GerenciarEstacoes() {
   return (
      <div className="grid grid-cols-wrapper bg-backgroundSystem">
         <Navbar />
         <div className="flex flex-col p-4">
            <CadastroEstacoes />
         </div>
      </div>
   );
}

export default GerenciarEstacoes;
