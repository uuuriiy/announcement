import React from 'react';

import bgImg from "../../assets/bgImg.jpg"

import "./Home.scss"
import {Button} from "@material-ui/core";
import {routes} from "../../constants";
import {NavLink} from "react-router-dom";

const CN = "home"
export const Home = () => {
    return (
        <div className={CN} style={{backgroundImage: `url(${bgImg})`}}>
            <div className={`${CN}__buttonContainer`}>
                <NavLink to={routes.announcements}>
                    <Button variant="contained" color="primary">
                        Announcements
                    </Button>
                </NavLink>
            </div>
        </div>
    );
};
