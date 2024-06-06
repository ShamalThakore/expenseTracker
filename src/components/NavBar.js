import React, {useState} from 'react';
import propsTypes from 'prop-types';

export default function NavBar(props){

    const [text, updatetext] = useState(props.title+ `-` +props.age);

    const textUpperCase = () => {
        let textUppercase = text.toUpperCase();
        updatetext(textUppercase)
    }

    const setTestvalue = (event) => {
        updatetext(event.target.value)
    }

    const textLowerCase = () => {
        let textlowercase = text.toLowerCase();
        updatetext(textlowercase)
    }
    return(
        <>
           <div className="container text-center mt-4">
                <div className="mb-3">
                    <textarea className="form-control" rows="7" value={text} onChange={setTestvalue}></textarea>
                </div>

                <button type="button" className="btn btn-outline-primary" onClick={textUpperCase}>Upper Text</button>&nbsp;
                <button type="button" className="btn btn-outline-secondary" onClick={textLowerCase}>Lower Text</button>&nbsp;
                <button type="button" className="btn btn-outline-success">Success</button>&nbsp;
                <button type="button" className="btn btn-outline-danger">Danger</button>&nbsp;
                <button type="button" className="btn btn-outline-warning">Warning</button>&nbsp;
                <button type="button" className="btn btn-outline-info">Info</button>&nbsp;
                <button type="button" className="btn btn-outline-light">Light</button>&nbsp;
                <button type="button" className="btn btn-outline-dark">Dark</button>&nbsp;
           </div>
        </>

    );
}

NavBar.propsType = {
    title:propsTypes.string,
    age:propsTypes.number
}

// NavBar.defaultProps = {
//     title:'vaibhav',
//     age:25
// }