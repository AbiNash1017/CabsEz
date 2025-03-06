import React, { useContext, useEffect, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

//this highorder function will accept a childern
const UserProtectWrapper = ({
    children
}) => {

    //instred of depending on the user context we will use the token from local storage to check if the user is logged in or not
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { user, setUser } = useContext(userDataContext)
    const [isLoading, setIsLoading] = useState(true)


    //here the useEffect hook will be used to check if the user is logged in or not so that if the user is logged in the particular childern will be rendered elses the user will be redirected to the login page
    useEffect(() => {

        if (!token) {
            navigate('/login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data.user)
                setIsLoading(false)
            }
        }).catch(err => {
            console.log(err)
            localStorage.removeItem('token')
            navigate('/login')
        })
    }, [token]
    );
    //here 
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    //here we will use the useContext hook to get the user data from the user context
    return (
        <div>{children}</div>
    )
}

export default UserProtectWrapper