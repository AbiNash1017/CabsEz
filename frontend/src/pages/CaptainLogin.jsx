import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { captain, setCaptain } = React.useContext(CaptainDataContext);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const captain = {
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

        if (response.status == 200) {
            const data = response.data

            setCaptain(data.captain)
            localStorage.setItem('token', data.token)
            navigate('/captainhome')
        }
        setEmail('');
        setPassword('');

    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>

            <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="logo" />
            
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
                        <p className='text-center mt-5 font-400'>Join the Fleet!
                            <Link className='text-blue-500 ml-2' to={'/CaptainSignup'} >create an account</Link></p>
                    </div>
                </form>

            </div>
            <div className='mt-5'>
                <Link to={'/login'} className='w-full flex items-center justify-center bg-[#1eb24d] text-white py-3 rounded font-semibold'>Sign in as User</Link>
            </div>
        </div>
    )
}

export default CaptainLogin