import React, { useState, useContext, useEffect, useRef } from "react";
import { EmailFP } from "src/recoil/initState";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import axios from "axios";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const history = useNavigate();
  const [, setEmailFP] = useRecoilState(EmailFP);
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://www.socialnetwork.somee.com/api/auth/sendPinforgotPassword",
        {
          email,
        }
      );
      console.log(response);
      setEmailFP(email);
      history("/verify1");
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <div className="h-[100vh] bg-white">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Forgot Password
          </h2>

          <div className="space-y-8">
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
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

            <button
              onClick={handleSubmit}
              className="py-3 px-5 text-sm bg-[#15536e] font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Send message
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ForgotPassword;
