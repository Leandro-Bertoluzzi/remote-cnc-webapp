import { ChangeEvent, useState, useEffect } from 'react';
import { useRouter } from "next/router";
import apiRequest from '../services/apiService';
import { setJwtToken } from '../services/storage';

export default function Login() {
    // Hooks for state variables
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();
    const callbackUrl = (router.query?.callbackUrl as string) ?? "/";

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleUploadClick = () => {
        const data = {
            "email": email,
            "password": password
        }

        apiRequest('users/login', 'POST', data, true)
            .then((response) => {
                console.log(response);
                setJwtToken(response.data.token);
                router.push(callbackUrl);
            })
            .catch((err) => console.error(err));
    };

    return (
        <section className="relative bg-gradient-gray2 overflow-hidden">
        <div className="relative z-10 container mx-auto px-4">
          {/* <img className="mx-auto mb-40" src="gradia-assets/logos/gradia-name-black.svg" alt="" /> */}
          <div className="flex flex-wrap">
            <div className="w-full p-6">
              <div className="md:max-w-xl text-center mx-auto">
                <h2 className="mb-4 font-heading font-bold text-gray-900 text-6xl sm:text-7xl">Identificación de usuario</h2>
                <p className="mb-11 text-lg text-gray-500">¡Bienvenido!</p>
                <div className="flex flex-wrap max-w-md mx-auto mb-5">
                  <div className="w-full p-2">
                    <input onChange={handleEmailChange} className="w-full px-5 py-3.5 text-gray-500 placeholder-gray-500 bg-white outline-none focus:ring-4 focus:ring-indigo-500 border border-gray-200 rounded-lg" type="text" placeholder="Email address" name="email" />
                  </div>
                  <div className="w-full p-2">
                    <input onChange={handlePasswordChange} className="w-full px-5 py-3.5 text-gray-500 placeholder-gray-500 bg-white outline-none focus:ring-4 focus:ring-indigo-500 border border-gray-200 rounded-lg" type="password" placeholder="Password" name="password" />
                  </div>
                  <div className="w-full p-2">
                    <div className="group relative">
                      <div className="absolute top-0 left-0 w-full h-full group-hover:opacity-50 rounded-lg transition ease-out duration-300"></div>
                      <button onClick={handleUploadClick} className="p-1 w-full font-heading font-medium text-base text-white overflow-hidden rounded-md">
                        <div className="relative py-4 px-9 bg-sky-400 overflow-hidden rounded-md">
                          <div className="absolute top-0 left-0 transform -translate-y-full group-hover:-translate-y-0 h-full w-full bg-gray-900 transition ease-in-out duration-500"></div>
                          <p className="relative z-10">Enviar</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-base text-gray-600">
                  <span>¿No tiene cuenta?</span>
                  <a className="text-blue-900 hover:text-blue-400" href="#"> Contáctenos</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}
