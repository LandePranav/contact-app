import React from "react";
import user from "../images/user.jpg" ;
import { Link} from "react-router-dom";

export default function ContactCard(props) {
    const {id , name , email} = props.contact;
    const data = props.contact ;

    return(
        <div className="item">
            <img className="ui avatar image " src={user} alt="user" />
                <div className="content">
                    <Link to={`/contact/${id}`} state={data}>
                    <div className="header"> 
                        {name}
                    </div> 
                    <div>
                        {email}
                    </div>
                    </Link>
                </div>
                <i className="trash alternate outline icon right" style={{color:"red",marginTop:"7px",marginLeft:"10px"}}
                onClick={()=>props.clickHandler(id)}></i>
                <Link to={`/edit`} state={data} >
                <i className="edit alternate outline icon right" style={{color:"red",marginTop:"7px"}}
                ></i>
                </Link>
            </div>
    )
}

