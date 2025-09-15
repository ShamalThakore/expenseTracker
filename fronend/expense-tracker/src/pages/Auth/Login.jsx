import React, { useState,useContext } from 'react';  // ✅ added useState import
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Inputs/inpute';
import { validateEmail } from '../../utils/helper'; // ✅ adjust path to where helper.js is

import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths'; // ✅ adjust path to where apiPaths.js is
import { UserContext } from '../../context/UserContext'; // ✅ added UserContext import

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);


    const {updateUser} = useContext(UserContext); // ✅ added UserContext import

    const navigate = useNavigate();
    
    // Handle login function
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.")
            return;
        }

        if (!password) {
            setError("Please enter the password")
            return;
        }
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        setError("");

        //Login API Call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });
            const { token, user } = response.data;

            if (token) {    
                localStorage.setItem("token", token);
                updateUser(user)
                navigate("/dashboard");
            }

        } catch (error) {
            // Handle error response
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    }
    
    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Please enter your details to log in
                </p>
                
                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="john@example.com"
                        type="text"
                    />
                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="********"
                        type="password"
                    />
                    
                    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

                    <button
                        type="submit"
                        className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                    >
                        Login
                    </button>

                    <p className='text-[13px] text-slate-800 mt-3'> Don't have an account ? {""}
                        <Link className='front medium text-primary underline' to="/signup">Sing Up</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;
