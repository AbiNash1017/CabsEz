import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        //
        if (!token) {
            navigate('/captainlogin')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            //willaccept the responce and if the ststus is 200 then it will set to captain and render the children
        }).then(response => {
            if (response.status === 200) {
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        })
            //if there is any error then it will redirect to captain login page
            .catch(err => {

                localStorage.removeItem('token')
                navigate('/captainlogin')
            })
    }, [token])



    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }



    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper