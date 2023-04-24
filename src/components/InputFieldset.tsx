import classNames from "classnames";
import { Eye, EyeClosed } from "phosphor-react";
import { HTMLInputTypeAttribute, useEffect, useState } from "react";

type InputProps = {
   id: string;
   state: any;
   dispatch: React.Dispatch<any>;
   type: HTMLInputTypeAttribute;
   hasError: boolean;
   placeholder?: string;
   title: string;
   toggleVisibility?: boolean;
};

// This component will be used to render a input field with the same style, receveing the id, the state, the dispatch, the type, the hasError, the placeholder, the title and the toggleVisibility
const InputFieldset = ({
   id,
   state,
   dispatch,
   type,
   hasError,
   placeholder,
   title,
   toggleVisibility,
}: InputProps) => {
   const handleChangeFormValue = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      dispatch({ ...state, [id]: event.target.value });
      console.log(state);
   };

   const [isShowing, setIsShowing] = useState<boolean>(true);

   useEffect(() => {
      console.log(toggleVisibility);
   }, []);

   if (toggleVisibility)
      return (
         <fieldset className="flex flex-col border-none gap-1 w-full">
            <label htmlFor={id} className="text-base font-medium">
               {title}
            </label>
            <div className="w-full relative">
               <input
                  type={isShowing ? type : "text"}
                  id={id}
                  value={state[id]}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                     handleChangeFormValue(event)
                  }
                  className="w-full rounded-md py-2 px-4 border border-slate-400 outline-none drop-shadow-none text-base text-gray-700"
                  placeholder={placeholder ?? ""}
               />
               <div
                  className="absolute right-3 top-[13px] text-slate-700"
                  onClick={() => setIsShowing(!isShowing)}
               >
                  {isShowing ? <Eye /> : <EyeClosed />}
               </div>
            </div>
         </fieldset>
      );

   return (
      <fieldset className="flex flex-col border-none gap-1 w-full">
         <label htmlFor={id} className="text-base font-medium">
            {title}
         </label>
         <input
            type={type}
            id={id}
            value={state[id]}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
               handleChangeFormValue(event)
            }
            className="border rounded-md py-2 px-4 border-slate-400 outline-none text-base text-gray-700"
            placeholder={placeholder ?? ""}
         />
      </fieldset>
   );
};

export default InputFieldset;
