import React from 'react';

const CurrentUserContext = React.createContext({
    name: '',
    about: '',
    avatar: '',
    _id: '',});
export default CurrentUserContext;
