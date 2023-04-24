import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignOut, UserGear } from "phosphor-react";

const NavbaseUserNavigation = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const navigate = useNavigate();

   function loggout() {
      localStorage.removeItem("user");
      navigate("/");
   }

   return (
      <div className="absolute bottom-4 left-0 flex items-center gap-3 hover:cursor-pointer w-full px-6 py-3">
         <div className="relative">
            <div
               className="flex items-center gap-2"
               onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
               <div className="min-w-[20px]">
                  <FontAwesomeIcon
                     icon={faUser}
                     size="1x"
                     className="hover:cursor-pointer"
                     color="white"
                  />
               </div>
               <span className="text-base text-white">Meu usuário</span>
            </div>
            <div
               onMouseLeave={() => setIsMenuOpen(false)}
               className={`bg-white shadow flex flex-col items-start absolute -top-28 left-0 py-2 rounded-md ${
                  isMenuOpen ? "visible" : "invisible"
               }`}
            >
               <a
                  href=""
                  className="flex items-center gap-2 text-sm text-gray-500 px-3 py-2 bg-white hover:bg-gray-100 min-w-[150px]"
               >
                  <UserGear />
                  Gerenciar perfil
               </a>

               <a
                  href=""
                  className="flex items-center gap-2 text-sm text-gray-500 px-3 py-2 bg-white hover:bg-gray-100 min-w-[150px]"
                  onClick={loggout}
               >
                  <SignOut />
                  Sair
               </a>
            </div>
            <div
               className={`arrow-down  absolute left-2 -top-7 ${
                  isMenuOpen ? "visible" : "invisible"
               }`}
            />
         </div>
      </div>
   );
};

export default NavbaseUserNavigation;
