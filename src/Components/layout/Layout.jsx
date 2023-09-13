import React from 'react'
import { Outlet } from 'react-router-dom'
import { Register } from '../Register/Register'



export default function Layout() {
    return (
        <>
            <Register/>
            <Outlet></Outlet>
        </>
    )
}
