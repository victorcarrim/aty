type FormWrapper = {
   children: React.ReactElement | React.ReactElement[];
   onSubmit?: Function;
};

// This component will be used to render a form wrapper with the same style.

const FormWrapper = ({ children, onSubmit }: FormWrapper) => {
   return (
      <form
         onSubmit={(event) => {
            event.preventDefault();
            onSubmit;
         }}
         className="bg-white p-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col gap-6 min-w-[400px] shadow pb-13"
      >
         {children}
      </form>
   );
};

export default FormWrapper;
