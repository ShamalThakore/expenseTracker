import React, { useState,useContext } from 'react';  // ✅ added useState import
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Inputs/inpute';
import { validateEmail } from '../../utils/helper'; // ✅ adjust path to where helper.js is
import ProfilePhotoSelector from "../../components/Inputs/profilePhotoSelector";
import { UserContext } from '../../context/UserContext'; // ✅ added UserContext import

import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths'; // ✅ adjust path to where apiPaths.js is

import uploadImage from '../../utils/uploadImage'; // ✅ adjust path to where imageUpload.js is


const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext); // ✅ added UserContext import
    const navigate = useNavigate();

    // Handle Sign Up Form Submit

    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageUrl = '';

        if (!fullName) {
            setError("Please enter your name")
            return;
        }

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

        setError("")

        //SignUp API Call

        try {
            // If a profile picture is selected, upload it
            if (profilePic) {
                const imgUploadResponse = await uploadImage(profilePic);
                profileImageUrl = imgUploadResponse.imageUrl || ""; // Assuming the response contains the image URL
            }

            console.log('SignUp request payload:', {
                fullName,
                email,
                password,
                profileImageUrl,
            });

            // Proceed with registration
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            });

            const { token, user } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }
        }
        catch (error) {
            // Handle error response
            console.error('SignUp error response:', error.response?.data || error.message);
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <AuthLayout>
            <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
                <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                    join us today by entering your details below.
                </p>

                <form onSubmit={handleSignUp}>

                    <ProfilePhotoSelector image= {profilePic} setImage={setProfilePic} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            value={fullName}
                            onChange={({target}) => setFullName(target.value)}
                            label="Full Name"
                            placeholder="John"
                            type="text"
                        />

                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email Address"
                            placeholder="john@example.com"
                            type="text"
                        />

                        <div className='col-span-2'>
                            <Input
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                label="Password"
                                placeholder="********"
                                type="password"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

                    <button
                        type="submit"
                        className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                    >
                        SIGN UP
                    </button>

                    <p className='text-[13px] text-slate-800 mt-3'> Already have an account ? {""}
                        <Link className='front medium text-primary underline' to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>

    )
}
    
export default SignUp