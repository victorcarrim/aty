import { useEffect, useState } from "react";
import api from "../../services/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputFieldset from "../InputFieldset";
import ActionButton from "../ActionButton";
import FormWrapper from "../FormWrapper";
import SelectFieldMultiply, { ISelectOptions } from "../SelectInputMultiple";

type FormValuesProps = {
   name: string;
   latitude: string;
   longitude: string;
   altitudeMSL: number;
   isPrivate: boolean;
   token: string;
   status: boolean;
   partners: [];
   sensors: ISelectOptions[];
};

function CadastroEstacoes() {
   const [formValues, setFormValues] = useState<FormValuesProps>(
      {} as FormValuesProps
   );
   const [sensorData, setSensorData] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [errorMessage, setErrorMessage] = useState<string | null>();
   const navigate = useNavigate();

//    function checkUserObjectIsValid(newSensor: FormValuesProps) {
//       if (
//          !newSensor.name ||
//          !newSensor.measurementUnit ||
//          !newSensor.minimum ||
//          !newSensor.maximum ||
//          !newSensor.accuracy
//       ) {
//          return false;
//       }
//       return true;
//    }

   async function getSensorData(){
         try {
              const response = await api.get("/api/Sensors");
              setSensorData(response.data);
         } catch (error) {
              console.log(error)
         }
   }

   const handleSelectChange = (sensorId: string) => {
    const selectedSensor = sensorData.find((sensor: any) => sensor.id === sensorId);

    if (selectedSensor) {
      setFormValues((prevState) => {
        return { ...prevState, sensors: [...prevState.sensors, selectedSensor] };
      });
    }
  };

  const removeSelectedSensor = (sensorId: string) => {
    setFormValues((prevState) => {
      return {
        ...prevState,
        sensors: prevState.sensors.filter((sensor: any) => sensor.id !== sensorId),
      };
    });
  };


   const handleSubmit = async (event: any) => {
      event.preventDefault();
    //   setIsLoading(true);

    //   if (!checkUserObjectIsValid(formValues)) {
    //      setIsLoading(false);
    //      toast.warn("Por favor, preencha todos os campos");
    //      return;
    //   }
    //   setErrorMessage(null);

    //   try {
    //      const response = await api.post("/api/Sensors", {
    //         ...formValues,
    //         isEnabled: true,
    //      });
    //      if (response.status === 201) {
    //         toast.success("Sensor criado com sucesso!!!!");
    //         navigate("/gerenciar-sensores");
    //         setIsLoading(false);
    //      }
    //   } catch (error) {
    //      console.log(error);
    //      setIsLoading(false);
    //   }
    console.log(sensorData)
   };

   useEffect(() => {
        getSensorData();
    }, []);

   return (
      <FormWrapper>
         <header className="flex flex-col items-start gap-2">
            <h2 className="font-medium text-4xl">Cadastro de estações</h2>
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
            title="Nome da sensor"
         />
         <InputFieldset
            type="text"
            id="latitude"
            dispatch={setFormValues}
            state={formValues}
            hasError={false}
            title="Latitude"
         />
         <InputFieldset
            type="text"
            id="longitude"
            dispatch={setFormValues}
            hasError={false}
            state={formValues}
            title="Longitude"
         />
         <InputFieldset
            type="number"
            id="altitudeMSL"
            dispatch={setFormValues}
            hasError={false}
            state={formValues}
            title="Altitude Nível do Mar"
         />
         <InputFieldset
            type="text"
            id="isPrivate"
            dispatch={setFormValues}
            hasError={false}
            state={formValues}
            title="Privada"
         />
         <InputFieldset
            type="text"
            id="token"
            dispatch={setFormValues}
            hasError={false}
            state={formValues}
            title="Token"
         />
         <InputFieldset
            type="text"
            id="status"
            dispatch={setFormValues}
            hasError={false}
            state={formValues}
            title="Status"
         />
         <SelectFieldMultiply
        id="sensorSelect"
        options={sensorData.map((sensor: any) => ({
          label: sensor.name,
          value: sensor.id,
          selected: false,
        }))}
        state={{}}
        dispatch={() => {}}
        onChange={handleSelectChange}
      />
       <div className="selected-sensors">
        {formValues.sensors &&
          formValues.sensors.map((sensor: any) => (
            <div key={sensor.id} className="sensor-item">
              {sensor.name}
              <button
                className="remove-sensor"
                onClick={() => removeSelectedSensor(sensor.id)}
              >
                X
              </button>
            </div>
          ))}
      </div>
         <ActionButton
            onClick={(event) => handleSubmit(event)}
            style="primary"
            title="Cadastrar"
            loadingState={isLoading}
         />

      </FormWrapper>
   );
}

export default CadastroEstacoes;
