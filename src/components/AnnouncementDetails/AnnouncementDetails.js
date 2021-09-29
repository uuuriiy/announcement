import React, {useEffect, useState} from 'react';
import {db} from "../../firebase/firebase";
import {Details} from "../Details/Details";

import "./AnnouncementDetails.scss"

const CN = "announcementDetails"
export const AnnouncementDetails = ({match: {params: {id}}}) => {
    const [announcements, setAnnouncements] = useState([]);

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
            {
                !!announcements?.length && announcements?.map(({id: announcementId, data}) => {
                    if (announcementId === id) {
                        return (
                            <Details id={id} announcement={data} title={data?.title}/>
                        )
                    }
                })
            }
        </div>
    );
};
