import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import videoLogin from "/src/assets/videoLogin.mp4";
import api from "../../services/Api";
import { toast } from "react-toastify";
import InputFieldset from "../InputFieldset";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "../ActionButton";
import FormWrapper from "../FormWrapper";

interface IFormValues {
   email: string;
   password: string;
}

function Login() {
   const [formValues, setFormValues] = useState<IFormValues>({} as IFormValues);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const navigate = useNavigate();

   useEffect(() => {
      const user = localStorage.getItem("user");

      if (user !== null) {
         navigate("/dashboard");
      }
   }, []);

   async function logon() {
      setIsLoading(true);
      try {
         const response = await api.post("api/Authentication", formValues);
         localStorage.setItem("user", response.data.token);
         setIsLoading(false);
         navigate("/dashboard");
      } catch (error: any) {
         if (error.response?.status === 404) {
            toast.error("Email ou senha inválido!");
         }
         setIsLoading(false);
      }
   }

   return (
      <main className="relative h-screen w-screen overflow-hidden">
         <video
            src={videoLogin}
            autoPlay
            loop
            muted
            className="h-screen w-screen object-cover "
         />
         <FormWrapper>
            <header className="flex flex-col items-start gap-2">
               <div className="flex items-center gap-1 mb-4">
                  <FontAwesomeIcon
                     icon={faGamepad}
                     size="4x"
                     color="rgb(25 118 210)"
                  />
                  <h1 className="text-buttonLogin text-xl font-semibold pl-4">
                     ATY
                  </h1>
               </div>
               <h2 className="font-medium text-4xl">Entrar</h2>
               <p className="font-normal text-base text-blackColor/60 max-w-[30ch]">
                  Preencha o formulário abaixo com as suas informações de login.
               </p>
            </header>
            <div className="w-full flex flex-col items-start gap-4">
               <InputFieldset
                  title="E-mail"
                  type="email"
                  id="email"
                  state={formValues}
                  dispatch={setFormValues}
                  hasError={formValues?.email?.includes("@")}
               />
               <InputFieldset
                  title="Senha"
                  id="password"
                  dispatch={setFormValues}
                  state={formValues}
                  hasError={formValues?.password !== ""}
                  type="password"
                  toggleVisibility={true}
               />
               <div className="mt-1"/>
               <ActionButton
                  title="Entrar"
                  style="primary"
                  onClick={logon}
                  loadingState={isLoading}
               />
               <div className="flex items-center gap-2 w-full">
                  <hr className="border-none outline-none block h-[0.5px] bg-slate-500/10 flex-1 my-2" />
                  <p className="text-sm text-slate-600">ou</p>
                  <hr className="border-none outline-none block h-[0.5px] bg-slate-500/10 flex-1 my-2" />
               </div>
               <ActionButton
                  title="Criar uma conta"
                  style="secondary"
                  onClick={() => navigate("/cadastro")}
               />
            </div>
         </FormWrapper>
      </main>
   );
}

export default Login;
