import "@fortawesome/fontawesome-free/css/all.css";
import {
   faCloud,
   faGamepad,
   faHouseChimney,
   faMagnifyingGlass,
   faTowerBroadcast,
   faUser,
   faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import NavbaseUserNavigation from "./NavbaseUserNavigation";

function Navbar() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const navigate = useNavigate();

   function toggleMenu() {
      if (isMenuOpen) {
         setIsMenuOpen(false);
      } else {
         setIsMenuOpen(true);
      }
   }

   return (
      <div className="flex flex-col items-start h-screen w-60 bg-navbarColor select-none relative shadow">
         {/* Logo */}
         <div
            className="p-6 flex items-center hover:cursor-pointer border-b border-b-white/20 w-full mb-8"
            onClick={() => {
               navigate("/dashboard");
            }}
         >
            <FontAwesomeIcon icon={faGamepad} size="2x" color="white" />
            <h1 className="text-white text-xl font-semibold pl-4">ATY</h1>
         </div>

         <NavbarItem target="/dashboard" title="Página Inicial">
            <FontAwesomeIcon icon={faHouseChimney} size="1x" color="white" />
         </NavbarItem>
         <NavbarItem target="#" title="Pesquisar estações">
            <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" color="white" />
         </NavbarItem>
         <NavbarItem target="/cadastrar-estacao" title="Gerenciar estações">
            <FontAwesomeIcon icon={faCloud} size="1x" color="white" />
         </NavbarItem>
         <NavbarItem target="/gerenciar-sensores" title="Gerenciar sensores">
            <FontAwesomeIcon icon={faTowerBroadcast} size="1x" color="white" />
         </NavbarItem>
         <NavbarItem target="/gerenciar-usuarios" title="Gerenciar usuários">
            <FontAwesomeIcon icon={faUsers} size="1x" color="white" />
         </NavbarItem>
         <NavbaseUserNavigation />
      </div>
   );
}

export default Navbar;
