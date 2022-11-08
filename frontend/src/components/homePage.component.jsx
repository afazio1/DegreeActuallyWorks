import './homePage.styles.scss'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function HomePage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function testLogin() {
        axios.post(props.link + "/attemptlogin",{
            GTID: "GeorgeBurdell3"
        }).then(res => console.log(res));
    }
    return(
        <div className='background'>
            <div className='wrapper'>
            <form action="submit" onSubmit={testLogin}>
                <input type="text" name='username' placeholder='Username' onChange={event => setUsername(event.target.value)} />
                <input type="text" name='password' placeholder='Password' onChange={event => setPassword(event.target.value)} />
            </form>
            </div>
        </div>
    );
}

export default HomePage
