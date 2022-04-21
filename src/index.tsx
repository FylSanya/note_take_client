import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const handleKeyDown = (event: any) => {
    event.preventDefault();
    let charCode = String.fromCharCode(event.which).toLowerCase();
    console.log(event.metaKey)

    if ((event.ctrlKey || event.metaKey) && charCode === 's') {
        alert("CTRL+S Pressed");
    } else if ((event.ctrlKey || event.metaKey) && charCode === 'c') {
        alert("CTRL+C Pressed");
    } else if ((event.ctrlKey || event.metaKey) && charCode === 'v') {
        alert("CTRL+V Pressed");
    }
}


const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);


rootElement.addEventListener("onkeydown", (event) => {  // doesn't work
    handleKeyDown(event)
    console.log(event)
})

root.render(
    <App/>,
);
