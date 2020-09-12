import React from 'react';
import {AuthenticationProvider} from './AuthenticationProvider';
import Routes from './Routes';
import {addUser} from '../dao/UserDao';

export default function Provider()
{

    console.disableYellowBox = true;
    return(
        <AuthenticationProvider>

            {/* Routes chính là tham số children của AuthenticationProvider */}
            <Routes/>

        </AuthenticationProvider>
    );


}