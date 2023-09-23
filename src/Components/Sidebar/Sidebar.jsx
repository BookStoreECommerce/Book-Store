import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
return <>
<div className="row">

    <div className="col-4">
    <nav className="navbarr navbarr-expand d-flex flex-column align-item-start p-3 active-nav" id="sidebar">
        <h3 className="navbarr-brand text-light my-4">
            <div>User Profile</div>
        </h3>

        <ul className="list-group">
            <Link className="list-group-item active" aria-current="true" to=''><i className="fa-solid fa-user"></i> User info</Link>
            <Link className="list-group-item" to="favourites"><i className="fa-solid fa-heart"></i> Favourites</Link>
            <Link className="list-group-item" to="settings"><i className="fa-solid fa-gear"></i> Settings</Link>
        </ul>
    </nav>
        </div>
        <div className="col-8">
            <Outlet></Outlet>
            </div>
    </div>

</>
}

export default Sidebar;