type RadioInputsFieldsetProps = {
   id: string;
   state: any;
   dispatch: React.Dispatch<any>;
   options: IRadioOptions[];
};

export interface IRadioOptions {
   label: string;
   value: number;
   cheack: boolean;
}

// This component will be used to render a list of radios inputs with the same style, receveing a list of options and the id, the state, the dispatch.

const RadioInputsFieldset = ({
   options,
   id,
   dispatch,
   state,
}: RadioInputsFieldsetProps) => {
   // This is default options of radios buttons if need more, just add the label and value

   return (
      <div className="grid grid-cols-2 gap-3">
         {options.map((option) => (
            <fieldset className="flex items-center gap-2">
               <input
                  key={option.value}
                  type="radio"
                  name="userType"
                  id={option.label}
                  value={option.value}
                  onClick={() => dispatch({ ...state, [id]: option.value })}
                  checked={option.cheack ? true : false}
               />
               <label htmlFor={option.label} className="text-sm text-slate-800">
                  {option.label}
               </label>
            </fieldset>
         ))}
      </div>
   );
};

export default RadioInputsFieldset;
