import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type NavbarItemProps = {
   children: React.ReactElement | React.ReactElement[];
   title: string;
   target: string;
};

const NavbarItem = ({ children, title, target }: NavbarItemProps) => {
   const [isActive, setIsActive] = useState<boolean>(false);
   const navigate = useNavigate();

   useEffect(() => {
      const currentPath = window.location.pathname;
      if (currentPath === target) setIsActive(true);
   }, []);

   return (
      <div
         className={`flex items-center gap-3 hover:cursor-pointer w-full relative px-6 py-3 transition-colors hover:bg-[#317acd] ${
            isActive && "bg-[#317acd]"
         }`}
         onClick={() => {
            navigate(target);
         }}
      >
         <div className="min-w-[20px]">{children}</div>
         <p className="text-white text-base font-normal">{title}</p>
         <div
            className={`absolute left-0 h-full w-[3px] bg-white ${
               isActive ? "visible" : "invisible"
            }`}
         />
      </div>
   );
};

export default NavbarItem;
