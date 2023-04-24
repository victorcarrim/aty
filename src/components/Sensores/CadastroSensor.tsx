import { useEffect, useState } from "react";
import api from "../../services/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputFieldset from "../InputFieldset";
import ActionButton from "../ActionButton";
import FormWrapper from "../FormWrapper";

type FormValuesProps = {
   name: string;
   measurementUnit: string;
   minimum: string;
   maximum: string;
   accuracy: string;
};

function CadastroSensor() {
   const [formValues, setFormValues] = useState<FormValuesProps>(
      {} as FormValuesProps
   );
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [errorMessage, setErrorMessage] = useState<string | null>();
   const navigate = useNavigate();

   function checkUserObjectIsValid(newSensor: FormValuesProps) {
      if (
         !newSensor.name ||
         !newSensor.measurementUnit ||
         !newSensor.minimum ||
         !newSensor.maximum ||
         !newSensor.accuracy
      ) {
         return false;
      }
      return true;
   }

   const handleSubmit = async (event: any) => {
      event.preventDefault();
      setIsLoading(true);

      if (!checkUserObjectIsValid(formValues)) {
         setIsLoading(false);
         toast.warn("Por favor, preencha todos os campos");
         return;
      }
      setErrorMessage(null);

      try {
         const response = await api.post("/api/Sensors", {
            ...formValues,
            isEnabled: true,
         });
         if (response.status === 201) {
            toast.success("Sensor criado com sucesso!!!!");
            navigate("/gerenciar-sensores");
            setIsLoading(false);
         }
      } catch (error) {
         console.log(error);
         setIsLoading(false);
      }
   };

   return (
      <FormWrapper>
         <header className="flex flex-col items-start gap-2">
            <h2 className="font-medium text-4xl">Cadastro de sensores</h2>
            <p className="font-normal text-base text-blackColor/60 max-w-[30ch]">
               Preencha o formulário abaixo com as suas informações do cadastro.
            </p>
         </header>
         <div>
            {errorMessage && (
               <span className="text-red-500 text-sm">{errorMessage}</span>
            )}
         </div>
         <InputFieldset
            type="text"
            id="name"
            dispatch={setFormValues}
            state={formValues}
            hasError={false}
            title="Nome do sensor"
         />
         <InputFieldset
            type="text"
            id="measurementUnit"
            dispatch={setFormValues}
            state={formValues}
            hasError={false}
            title="Unidade de mensuração"
         />
         <InputFieldset
            type="number"
            id="minimum"
            dispatch={setFormValues}
            hasError={false}
            state={formValues}
            title="Mínimo"
         />
         <InputFieldset
            type="number"
            id="maximum"
            dispatch={setFormValues}
            hasError={false}
            state={formValues}
            title="Máximo"
         />
         <InputFieldset
            type="number"
            id="accuracy"
            dispatch={setFormValues}
            hasError={false}
            state={formValues}
            title="Acurácia"
         />
         <ActionButton
            onClick={(event) => handleSubmit(event)}
            style="primary"
            title="Cadastrar"
            loadingState={isLoading}
         />
      </FormWrapper>
   );
}

export default CadastroSensor;
