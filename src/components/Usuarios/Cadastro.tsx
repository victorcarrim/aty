import { useState } from "react";
import { useNavigate } from "react-router-dom";
import videoLogin from "/src/assets/videoLogin.mp4";
import api from "../../services/Api";
import { toast } from "react-toastify";
import FormWrapper from "../FormWrapper";
import InputFieldset from "../InputFieldset";
import ActionButton from "../ActionButton";
import RadiosInputsFieldset, { IRadioOptions } from "../RadioInputsFieldset";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

interface IFormValues {
   name: string;
   email: string;
   password: string;
   passwordRepeat: string;
   type: number;
   role: string;
}

const Cadastro = () => {
   const [formValues, setFormValues] = useState<IFormValues>({} as IFormValues);
   const [errorMessage, setErrorMessage] = useState<string | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

   const navigate = useNavigate();

   const userTypesOptions: IRadioOptions[] = [
      {
         label: "Pessoa física",
         value: 10,
         cheack: false
      },
      {
         label: "Instituição privada",
         value: 20,
         cheack: false
      },
      {
         label: "Instituição pública",
         value: 30,
         cheack: false
      },
      {
         label: "Outros",
         value: 40,
         cheack: false
      },
   ];

   function checkUserObjectIsValid(user: IFormValues) {
      console.log(user);
      if (!user.name || !user.email || !user.password || !user.passwordRepeat) {
         return false;
      }
      return true;
   }

   async function handleSubmit() {
      setIsLoading(true);
      if (checkUserObjectIsValid(formValues) === false) {
         setErrorMessage("Preencha todos os campos do formulário");
         setIsLoading(false);
         return null;
      }

      if (!passwordRegex.test(formValues.password)) {
         setErrorMessage("Senha muito fraca");
         setIsLoading(false);
         return null;
      }
      if (formValues.password !== formValues.passwordRepeat) {
         setErrorMessage("As senhas não são iguais");
         setIsLoading(false);
         return null;
      }

      setErrorMessage(null);

      try {
         const {passwordRepeat, ...NewForm} = formValues;
         NewForm.role = "User"
         const response = await api.post("/api/Users", NewForm);
         if (response.status === 201) {
            toast.success("Usuário cadastrado com sucesso!!!");
            setIsLoading(false);
            navigate("/");
         }
      } catch (error) {
         toast.error("Usuário não pode ser criado!!!");
         setIsLoading(false);
      }
   }

   return (
      <main className="relative h-screem w-screen overflow-hidden">
         <video
            src={videoLogin}
            autoPlay
            loop
            muted
            className="h-screen w-screen object-cover"
         />

         <FormWrapper onSubmit={handleSubmit}>
            <header className="flex flex-col items-start gap-2">
               <h2 className="font-medium text-4xl">Cadastre-se</h2>
               <p className="font-normal text-base text-blackColor/60 max-w-[30ch]">
                  Preencha o formulário abaixo com as suas informações de
                  cadastro.
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
               <InputFieldset
                  type="password"
                  id="password"
                  state={formValues}
                  dispatch={setFormValues}
                  hasError={false}
                  title="Senha"
                  toggleVisibility
               />
               <InputFieldset
                  type="password"
                  id="passwordRepeat"
                  state={formValues}
                  dispatch={setFormValues}
                  hasError={false}
                  toggleVisibility
                  title="Repita a senha"
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
               title="Cadastrar"
               onClick={handleSubmit}
               loadingState={isLoading}
               style="primary"
            />
            <hr className="w-full border-none outline-none block h-[0.5px] bg-slate-500/10 my-2" />
            <p className="text-center text-slate-800">
               Já possui conta?
               <a
                  className="ml-1 text-buttonLogin hover:text-blue-700 hover:cursor-pointer"
                  onClick={() => navigate("/")}
                  target={"_blank"}
               >
                  Faça Login
               </a>
            </p>
         </FormWrapper>
      </main>
   );
};

export default Cadastro;
