"use strict";
console.log('Loaded index.js');
const register = async (data) => {
    const url = 'http://localhost:4300/users/register';
    const response = await fetch(url, {
        method: 'POST',
        body: data,
    });
    const result = await response.json();
    console.log(result);
};
const handleSubmit = (ev) => {
    ev.preventDefault();
    const formElement = ev.target;
    const formData = new FormData(formElement);
    console.log('Submit', formData.get('userName'));
    console.log('Submit', formData.get('avatar'));
    register(formData);
};
const form = document.querySelector('form');
form?.addEventListener('submit', handleSubmit);
