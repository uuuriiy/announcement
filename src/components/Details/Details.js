import React, {useEffect, useState} from 'react';

import {Button, Card, CardActions, CardContent, makeStyles, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom"

import {Announcement} from "../Announcement/Announcement";
import {db} from "../../firebase/firebase";
import "./Details.scss"



const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: '25px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const CN = "details"
export const Details = ({id, announcement, title}) => {
    const [announcements, setAnnouncements] = useState([]);
    const classes = useStyles();
    const history = useHistory();

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


    return (
        <div className={CN}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.pos} variant="h5" component="h2">
                        {announcement?.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    </Typography>
                    <Typography className={`${CN}__description`} variant="body2" component="p">
                        {announcement?.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Typography color="textSecondary">
                        {new Date(announcement?.date?.toDate()).toUTCString()}
                    </Typography>
                </CardActions>
            </Card>
            <div>
                {
                    !!announcements?.length && announcements?.filter(({id: announcementId, data}) => {
                        let str = data?.title?.split(" ");
                        let str1 = title.split(" ")
                        for (let i = 0; i < str.length; i++) {
                            for (let j = 0; j < str1.length; j++) {
                                if (announcementId !== id && str[i] === str1[j]) {
                                    return data
                                }
                            }
                        }
                    } ).map(({id, data}) => (
                        <Announcement
                            key={id}
                            id={id}
                            data={data}
                        />
                    ))
                }
            </div>
            <div>
                <Button variant="contained" onClick={() => history.goBack()}>
                    Go Back
                </Button>
            </div>
        </div>
    );
};
