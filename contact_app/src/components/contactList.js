import React ,{useRef} from "react";
import ContactCard from "./contactCard";
import {Link} from "react-router-dom" ;

export default function ContactList (props) {

    const inputEl = useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    const renderContactList = props.contacts.map((contact) =>{
        return(
            <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}/>
        );
    });

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    };

    return(
        <div className="main" style={{marginTop:"45px",position:"relative"}}>
            <h2>
                Contact List    
                <Link to="/add ">
                    <button className="ui button blue right">    Add Contact</button>
                </Link>
                
            </h2>

            <div className="ui search">
                <div className="ui icon input">
                    <input ref={inputEl} type="text" placeholder="search contact" className="prompt" value={props.term} onChange={getSearchTerm}/>
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">
                {renderContactList.length >0 ? renderContactList : "No contact available !" }
            </div>
        </div>
        
    )
}