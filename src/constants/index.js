import {makeStyles} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid"

export const routes = {
    home: '/home',
    announcements: '/announcements',
    search: '/search',
    announcementsDetails: '/announcements-details'
}

export function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export const links = [
    {
        id: uuidv4(),
        label: 'Home',
        to: '/home'
    },
    {
        id: uuidv4(),
        label: 'Announcements',
        to: '/announcements'
    },
    {
        id: uuidv4(),
        label: 'Search',
        to: '/search'
    }
];
