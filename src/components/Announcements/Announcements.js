import React, {useEffect, useState} from 'react';

import firebase from "firebase";
import {Button, FormControl, Modal, TextField} from "@material-ui/core";

import img from "../../assets/modalImage.jpg"
import {getModalStyle, useStyles} from "../../constants";
import {Announcement} from "../Announcement/Announcement";
import {db} from "../../firebase/firebase";
import "./Announcements.scss"


const CN = "announcements"
export const Announcements = ({match: {path}, history}) => {
    const [open, setOpen] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    useEffect(() => {
        db.collection('announcements')
            .orderBy('date', 'desc')
            .onSnapshot(snapshot => {
                setAnnouncements(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
            })
    }, []);

    const addAnnouncement = (e) => {
        e.preventDefault();

        db.collection('announcements').add({
            title,
            description,
            date: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => setOpen(false))
    }

    const onSelectAnnouncement = (id) => {
        history.push(`${path}/${id}`);
    };

    return (
        <div className={CN}>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div style={modalStyle} className={classes.paper}>
                    <form className={`${CN}__form`}>
                        <center>
                            <img
                                className={`${CN}__img`}
                                src={img}
                                alt="logo"
                            />
                        </center>
                        <FormControl>
                            <TextField
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                id="standard-name"
                                label="Title"
                            />
                            <TextField
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                id="standard-surname"
                                label="Description"
                            />
                            <Button
                                onClick={addAnnouncement}
                                type="submit"
                                variant="contained"
                            >
                                Add Announcement
                            </Button>
                        </FormControl>
                    </form>
                </div>
            </Modal>
            <h2>
                Announcements
            </h2>
            <div className={`${CN}__buttonContainer`}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Add Announcement
                </Button>
            </div>
            <div>
                {
                    !!announcements?.length && announcements?.map(({id, data}) => (
                        <Announcement
                            key={id}
                            id={id}
                            data={data}
                            onSelectAnnouncement={onSelectAnnouncement}
                        />
                    ))
                }
            </div>
        </div>
    );
};
