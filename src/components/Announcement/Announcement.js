import React, {useState} from 'react';

import firebase from "firebase";
import {Button, FormControl, Modal, TextField} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {useParams} from "react-router-dom"

import {db} from "../../firebase/firebase";
import img from "../../assets/modalImage.jpg";
import {getModalStyle, useStyles} from "../../constants";

import "./Announcement.scss"


const CN = "announcement"
export const Announcement = ({id, data: {title, date}, onSelectAnnouncement}) => {
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [open, setOpen] = useState(false);
    const style = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const {id: paramsId} = useParams();

    const updateAnnouncement = (e) => {
        e.preventDefault();

        db.collection('announcements').doc(id).update({
            title: updatedTitle,
            description: updatedDescription,
            date: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => setOpen(false))

        setUpdatedTitle('');
        setUpdatedDescription('')
    }

    const onSelectAnnouncementHandler = () => {
        onSelectAnnouncement && onSelectAnnouncement(id);
    }

    const deleteAnnouncement = () => {
        db.collection('announcements')
            .doc(id)
            .delete()
    }

    return (
        <div className={CN}>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div style={modalStyle} className={style.paper}>
                    <form className={`${CN}__form`}>
                        <center>
                            <img
                                className={`${CN}__img`}
                                src={img}
                                alt="logo"
                            />
                        </center>
                        <FormControl className="place__BuyingForm">
                            <TextField
                                value={updatedTitle}
                                onChange={(e) => setUpdatedTitle(e.target.value)}
                                required
                                id="standard-name"
                                label="Title"
                            />
                            <TextField
                                value={updatedDescription}
                                onChange={(e) => setUpdatedDescription(e.target.value)}
                                id="standard-surname"
                                label="Description"
                            />
                            <Button
                                onClick={updateAnnouncement}
                                type="submit"
                                variant="contained"
                            >
                                Update Announcement
                            </Button>
                        </FormControl>
                    </form>
                </div>
            </Modal>
            <List className={style.root}>
                <ListItem>
                    <ListItemText
                        primary={title}
                        secondary={new Date(date?.toDate()).toUTCString()}
                    />
                </ListItem>
            </List>
            <div className={`${CN}__buttonsContainer`}>
                <Button onClick={() => setOpen(true)}>
                    Edit
                </Button>
                {
                    !paramsId && (
                        <Button  onClick={onSelectAnnouncementHandler}>
                            Details
                        </Button>
                    )
                }
                <Button onClick={deleteAnnouncement}>
                    Delete
                </Button>
            </div>
        </div>
    );
};
