import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    //two way binding for email and password to get the values from the user
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});
    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            email: email,
            password: password
        });
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