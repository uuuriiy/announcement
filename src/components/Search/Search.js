import React, {useEffect, useState} from 'react';

import {Button, FormControl, TextField} from "@material-ui/core";

import {Announcement} from "../Announcement/Announcement";
import {db} from "../../firebase/firebase";

import "./Search.scss"



const CN = "search"
export const Search = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [searchAnnouncements, setSearchAnnouncements] = useState([]);
    const [load, setLoad] = useState(false);
    const [search, setSearch] = useState('');

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

    const searchAnnouncement = (e) => {
        e.preventDefault();
        const searchAnnouncement = announcements.filter( ({data}) => search.includes(data?.title));
        setSearchAnnouncements(searchAnnouncement);
        setLoad(true);
        setSearch('');
    }

    return (
        <div className={CN}>
            <FormControl>
                <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    required
                    id="standard-name"
                    label="Search"
                />
                <Button
                    onClick={searchAnnouncement}
                    type="submit"
                    variant="contained"
                >
                    Search
                </Button>
            </FormControl>
                {
                    load && (
                        <div className={`${CN}__announcementsContainer`}>
                            {
                                !!searchAnnouncements?.length && searchAnnouncements.map(({id, data}) => (
                                    <Announcement key={id} id={id} data={data}/>
                                ))
                            }
                        </div>
                    )
                }
        </div>
    );
};
