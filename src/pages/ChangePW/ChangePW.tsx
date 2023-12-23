import React, { useState, useContext, useEffect, useRef } from "react";
import { EmailFP } from "src/recoil/initState";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import axios from "axios";
const ChangePW = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://www.socialnetwork.somee.com/api/auth/changePasswordForgotpassword",
        {
          email,
          password,
        }
      );
      console.log(response);

      history("/login");
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <div className="h-[100vh] bg-white">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Change PassWord
          </h2>

          <div className="space-y-8">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@flowbite.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Your New Password
              </label>
              <input
                type="password"
                id="pw"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@flowbite.com"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="py-3 px-5 text-sm bg-[#15536e] font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Change
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePW;
