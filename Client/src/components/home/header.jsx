import classes from './header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import React from 'react';
import axios from 'axios'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router';

const Header = () => {
    const navigate = useNavigate();
    // const [open, setOpen] = useState(false);

    // const handleClose = () => {
    //     setOpen(false);
    // }

    // const handleClick = () => {
    //     setOpen(!open);
    // }
    const auth = useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl(null);
        navigate('/panel')
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClose2 = () => {
        localStorage.setItem('token', null);
        auth.setUser(null);
        setAnchorEl(null)
        navigate('/')
    }

    return (
        <div className={classes.header}>
            <img className={classes.image1} src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"></img>
            <div className={classes.search}>
                <input className={classes.input} placeholder="Search your question"></input>
                <div className={classes.searchIcon}>
                    <FontAwesomeIcon className={classes.icon} icon={faSearch} />
                </div>
            </div>
            <img className={classes.image2} src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80" onClick={handleClick}></img>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleClose1}>Profile</MenuItem>
                {auth.user && <MenuItem onClick={handleClose2}>Logout</MenuItem>}
            </Menu>
        </div>
    )
}

export default Header;