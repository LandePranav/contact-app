import React from "react";
import user from "../images/user.jpg" ;
import { Link, useLocation} from "react-router-dom";

export default function ContactDetail(props) {
    const location = useLocation();
    const {id, name, email} = location.state ;

    if(!id){
        return <div>Loading ......</div> ;
    }

    return(
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description"> ID : {id} <br/>Email : {email} </div>
                </div>
                <div>
                    <Link to="/">
                    <button className="ui button blue center">Back to List</button>
                    </Link>
                    </div>
            </div>
        </div>
    );
}