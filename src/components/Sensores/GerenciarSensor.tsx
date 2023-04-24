import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/Api";
import Swal from "sweetalert2";
import { text } from "stream/consumers";
import Navbar from "../Navbar/Navbar";
import FormWrapper from "../FormWrapper";
import InputFieldset from "../InputFieldset";
import ActionButton from "../ActionButton";

interface Props {
    id: string
};

type FormValuesProps = {
    name: string;
    measurementUnit: string;
    minimum: string;
    maximum: string;
    accuracy: string;
 };

function GerenciarSensor(props : Props){

    const [formValues, setFormValues] = useState<FormValuesProps>({} as FormValuesProps);
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
    const navigate = useNavigate();

    async function getDataUser(){
        const response = await api.get(`/api/Sensors/${props.id}`);
        setFormValues(response.data);;
    }

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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoadingUpdate(true);

        if (!checkUserObjectIsValid(formValues)) {
            setIsLoadingUpdate(false);
            toast.warn("Por favor, preencha todos os campos");
            return;
        }
        setErrorMessage(null);

        try {
            const response = await api.put(`/api/Sensors/${props.id}`, {
               ...formValues
            });
            if (response.status === 200) {
               toast.success("Sensor atualizado com sucesso!!!!");
               navigate("/gerenciar-sensores");
               setIsLoadingUpdate(false);
            }
         } catch (error) {
            console.log(error);
            setIsLoadingUpdate(false);
         }
    }

    const handleDelete = async (e: any) => {
        e.preventDefault();
        setIsLoadingDelete(true);
        Swal.fire({
            title: "Deletar um sensor",
            text: "Você deseja deletar esse sensor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, deletar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if(result.isConfirmed){
                try {
                    const response = await api.delete(`/api/Sensors/${props.id}`)
                    if(response.status === 204){
                        toast.success('Deletado!!');
                        navigate('/gerenciar-sensores')
                        setIsLoadingDelete(false);
                    }
                } catch (error) {
                    console.log(error);
                    setIsLoadingDelete(false);
                }
            }
            if(result.dismiss){
                setIsLoadingDelete(false);
            }
        })
      }

    

    useEffect(() => {
        getDataUser()
    },[])

    return(
        <FormWrapper>
         <header className="flex flex-col items-start gap-2">
            <h2 className="font-medium text-4xl">Editar sensor</h2>
            <p className="font-normal text-base text-blackColor/60 max-w-[30ch]">
               Preencha o formulário abaixo para editar o sensor.
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
            title="Atualizar"
            loadingState={isLoadingUpdate}
         />

        <ActionButton
            onClick={(event) => handleDelete(event)}
            style="tertiary"
            title="Deletar"
            loadingState={isLoadingDelete}
         />
      </FormWrapper>
    )
}

export default GerenciarSensor;