import React, {useContext} from 'react';

import {NavLink} from "react-router-dom";

import logo from "../../assets/headerLogo.jpg"
import {HeaderContext} from "../../context";

import "./Header.scss"


const CN = 'header'
export const Header = () => {
    const headerLinks = useContext(HeaderContext);
    return (
        <div className={CN}>
            <div>
                <img className={`${CN}__logo`} src={logo} alt="logo"/>
            </div>
            <ul>
                {
                    !!headerLinks.length &&
                    headerLinks.map(({id, to, label}) => (
                        <li key={id}>
                            <NavLink to={to}>
                                {label}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};
