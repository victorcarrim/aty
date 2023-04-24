type SelectFieldProps = {
    id: string;
  state: any;
  dispatch: React.Dispatch<any>;
  options: ISelectOptions[];
  onChange?: (value: string) => void;
  };
  
  export interface ISelectOptions {
    label: string;
    value: string;
    selected: boolean;
  }
  
  const SelectFieldMultiply = ({
    options,
    id,
    dispatch,
    state,
    onChange,
  }: SelectFieldProps) => {
  
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ ...state, [id]: String(event.target.value) });
        if (onChange) {
          onChange(event.target.value);
        }
      };
      
  
    return (
      <div className="relative">
        <select
          id={id}
          name={id}
          value={state[id]}
          onChange={handleChange}
          className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} selected={option.selected ? true :false}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M0 6l10 10 10-10z" />
          </svg>
        </div>
      </div>
    );
  };
  
  export default SelectFieldMultiply;
  