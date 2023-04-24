import LoadingSpinner from "./LoadingSpinner";

type ActionButtonType = {
   title: string;
   onClick: (event?: any) => void;
   style: "primary" | "secondary" | "tertiary" | "quaternary";
   loadingState?: boolean;
};
// This component will be used to render one button with a title and a onClick function in the same style, have two styles: primary and secondary.

const ActionButton = ({
   title,
   onClick,
   style,
   loadingState,
}: ActionButtonType) => {
   if (style === "primary" && loadingState)
      return (
         <button
            onClick={onClick}
            className="w-full py-2 px-4 rounded-md border-none  text-white font-medium bg-buttonLoginLigth hover:bg-buttonLogin hover:border-transparent focus:outline-none focus:ring-2 focus:ring-buttonLogin focus:ring-offset-2"
         >
            {!loadingState ? title : <LoadingSpinner />}
         </button>
      );

   if (style === "primary")
      return (
         <button
            onClick={onClick}
            className="w-full py-2 px-4 rounded-md border-none  text-white font-medium bg-buttonLoginLigth hover:bg-buttonLogin hover:border-transparent focus:outline-none focus:ring-2 focus:ring-buttonLogin focus:ring-offset-2"
         >
            {title}
         </button>
      );

   if (style === "tertiary")
      return (
         <button
            onClick={onClick}
            className="w-full py-2 px-4 rounded-md border-none  text-white font-medium bg-red-500 hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
         >
            {title}
         </button>
      );
   
   if (style === "quaternary")
      return (
         <button
            onClick={onClick}
            className="w-full py-2 px-4 rounded-md border-none  text-white font-medium bg-green-500 hover:bg-green-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
         >
            {title}
         </button>
      );

   return (
      <button
         onClick={onClick}
         className="w-full py-2 px-4 rounded-md border-2 border-buttonLoginLigth  text-buttonLoginLigth font-medium hover:bg-buttonLogin hover:text-white focus:outline-none focus:ring-2 focus:ring-buttonLogin focus:ring-offset-2"
      >
         {title}
      </button>
   );
};

export default ActionButton;
