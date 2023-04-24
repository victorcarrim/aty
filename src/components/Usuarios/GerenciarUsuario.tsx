import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/Api";
import Swal from "sweetalert2";
import FormWrapper from "../FormWrapper";
import InputFieldset from "../InputFieldset";
import ActionButton from "../ActionButton";
import RadiosInputsFieldset, { IRadioOptions } from "../RadioInputsFieldset";
import SelectField, { ISelectOptions } from "../SelectInput";

interface Props {
    userId: string
}

interface IFormValues {
    name: string;
    email: string;
    password: string;
    passwordRepeat: string;
    type: number;
    role: string;
    isEnabled: boolean;
 }

function GerenciarUsuario(props : Props){

    const [formValues, setFormValues] = useState<IFormValues>({} as IFormValues);
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
    const navigate = useNavigate();

    const userTypesOptions: IRadioOptions[] = [
        {
           label: "Pessoa física",
           value: 10,
           cheack: formValues.type === 10 ? true : false
        },
        {
           label: "Instituição privada",
           value: 20,
           cheack: formValues.type === 20 ? true : false
        },
        {
           label: "Instituição pública",
           value: 30,
           cheack: formValues.type === 30 ? true : false
        },
        {
           label: "Outros",
           value: 40,
           cheack: formValues.type === 40 ? true : false
        },
     ];

     const selectOptions: ISelectOptions[] = [
      { label: "Administrador", value: "Admin", selected: formValues.role === "Admin" ? true : false },
      { label: "Usuário", value: "User", selected: formValues.role === "User" ? true : false },
    ];

    async function getDataUser(){
        const response = await api.get(`/api/Users/${props.userId}`);
        setFormValues(response.data)
    }

    const handleUpdate = async (e: any, enabled: boolean) => {
        e.preventDefault();
        setIsLoadingUpdate(true);
        const usuario = {
            id: props.userId,
            name: formValues.name,
            email: formValues.email,
            role: formValues.role,
            type: formValues.type,
            isEnabled: enabled
        }
        const response = await api.put('/api/Users', usuario)
        if(response.status === 200){
            setIsLoadingUpdate(false);
            toast.success('Usuário atualizado com sucesso!!!');
            navigate('/gerenciar-usuarios');
        }
      };

      const handleUpdatePassword = async (e: any) => {
        e.preventDefault()
        Swal.fire({
            title: 'Digite a nova senha',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Atualizar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: async (password) => {
              const usuario = {
                email: formValues.email,
                password: password
              }

              try {
                const response = await api.put(`/api/Users/Password`, usuario)
                return response
              } catch (error) {
                Swal.showValidationMessage('Senha não autorizada!!!')
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((response) => {
            if (response.isConfirmed) {
              Swal.fire({
                title: `Senha Atualizada`,
              })
            }
          })

      }

      const handleDelete = async () => {
         setIsLoadingDelete(true);
        Swal.fire({
            title: "Deletar um usuário",
            text: "Você deseja deletar esse usuário?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, deletar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if(result.isConfirmed){
                const response = await api.delete(`/api/Users/${props.userId}`)
                if(response.status === 204){
                    toast.success('Deletado!!');
                    setIsLoadingDelete(false);
                    navigate('/gerenciar-usuarios')
                }
            }
        })
      }

    

    useEffect(() => {
        getDataUser();
    },[])

    return(
        <div>
           <FormWrapper onSubmit={handleUpdate}>
            <header className="flex flex-col items-start gap-2">
               <h2 className="font-medium text-4xl">Atualizar usuário</h2>
               <p className="font-normal text-base text-blackColor/60 max-w-[30ch]">
                  Preencha o formulário abaixo para atualizar o usuário.
               </p>
            </header>
            <div>
               {errorMessage && (
                  <span className="text-red-500 text-sm">{errorMessage}</span>
               )}
            </div>
            <div className="w-full flex flex-col items-start gap-4">
               <InputFieldset
                  type="text"
                  id="name"
                  state={formValues}
                  dispatch={setFormValues}
                  title="Nome completo"
                  hasError={false}
               />
               <InputFieldset
                  type="text"
                  id="email"
                  state={formValues}
                  dispatch={setFormValues}
                  hasError={false}
                  title="E-mail"
               />
               <SelectField
                  id="role"
                  options={selectOptions}
                  state={formValues}
                  dispatch={setFormValues}
               />
            </div>

            <h2 className="font-medium text-xl">Tipo de usuário</h2>
            <RadiosInputsFieldset
               options={userTypesOptions}
               state={formValues}
               dispatch={setFormValues}
               id="type"
            />
            <ActionButton
               title="Atualizar Usuário"
               onClick={(event) => handleUpdate(event, true)}
               loadingState={isLoadingUpdate}
               style="primary"
            />
            <ActionButton
               title="Atualizar Senha"
               onClick={handleUpdatePassword}
               loadingState={isLoadingUpdate}
               style="quaternary"
            />
            {formValues.isEnabled == true ?
                <ActionButton
                    title="Desativar Usuário"
                    onClick={(event) => handleUpdate(event, false)}
                    loadingState={isLoadingUpdate}
                    style="secondary"
                /> 
                : 
                <ActionButton
                    title="Ativar Usuário"
                    onClick={(event) => handleUpdate(event, true)}
                    loadingState={isLoadingUpdate}
                    style="secondary"
                />

        }
            <ActionButton
               title="Deletar Usuário"
               onClick={handleDelete}
               loadingState={isLoadingDelete}
               style="tertiary"
            />
         </FormWrapper>

       </div>
    )
}

export default GerenciarUsuario