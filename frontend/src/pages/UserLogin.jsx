import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext';
import axios from 'axios';

const UserLogin = () => {
    //two way binding for email and password to get the values from the user
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    const { user, setUser } = useContext(userDataContext);
    const submitHandler = async (e) => {

        e.preventDefault();
        //we create a user object to send to the API
        const UserData = {
            email: email,
            password: password
        };

        //sending the data to the backend through axios post
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, UserData);

        //if the response status is 201 then navigate to the login page since the user is registered
        if (response.status === 200) {
            // here we get the data from the response
            const data = response.data;
            //we set the user data to the user context
            setUser(data.user);

            //there might be a secnario that the user after loging in he refreshes the page and to avoid the tresure to login again dure to reload or refresh we will sve the token in the local storage
            localStorage.setItem('token', data.token);

            //Once the user is registered , we navigate or redirect to then navigate to the home page
            navigate('/home');
        }

        setEmail('');
        setPassword('');

    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <img className='w-20 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
            <div>
                <form onSubmit={(e => { submitHandler(e) })}>
                    <h3 className='text-lg mb-2'>What's your email</h3>
                    <input
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base-300'
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        type="email"
                        placeholder='example@email.com' />
                    <h3 className='text-lg mb-2'>Enter password</h3>
                    <input
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base-300'
                        required
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        type="password"
                        placeholder='P@ssw0rd' />
                    <button className='w-full bg-black text-white py-3 rounded font-semibold'>Login</button>
                    <div>
                        <p className='text-center mt-5 font-400'>Don't have an account?
                            <Link className='text-blue-500 ml-2' to={'/signup'} >create an account</Link></p>
                    </div>
                </form>

            </div>
            <div className='mt-5'>
                <Link to={'/captainlogin'} className='w-full flex items-center justify-center bg-[#154a87] text-white py-3 rounded font-semibold'>Sign in as Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin