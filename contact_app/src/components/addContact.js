import React from "react";
import { Link} from "react-router-dom";
import "./Fadeeffect.css" ;

class AddContact extends React.Component {
    
    state = {name:"",email:""};

    final = () => {
        const fadeContainer = document.getElementById("fadeContainer");
        const fadeText = document.getElementById("fadeText");

        if(fadeContainer && fadeText)
        {
            fadeText.textContent = "Contact created Successfully !";
            fadeContainer.classList.add('fading');
        
            setTimeout(()=> {
                fadeText.textContent = "";
                fadeContainer.classList.remove('fading') ;
            },5000);
        }

    };

    // constructor(props) {
    //     super(props);
    // }

    add = (e) =>{
        e.preventDefault() ;
        if(this.state.name ==="" || this.state.email === "")
        {
            alert("Both fields are needed !");
            return ;
        }

        this.props.addContactHandler(this.state);
        this.setState({name:"",email:""});
        //console.log(this.props);
        
    }

    render() {
        
        return(
            <div className="ui main">
                <h2>Add Contacts</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name='name' value={this.state.name || ""} placeholder="Arun"
                        onChange={(e) => this.setState({name:e.target.value})} ></input>
                        <label>Email</label>
                        <input type="email" name="email" value={this.state.email || ""} placeholder="x@gmail.com"
                        onChange={(e) => this.setState({email:e.target.value})}></input>
                        <input type="submit" value="Add" className="ui button blue"></input>
                        <br/>
                        <Link to="/">
                            <button className="ui button blue right">Contact List</button>
                        </Link>
                    </div>
                </form>
                <div id="fadeContainer" className="fade">
                    <span id="fadeText"></span>
                </div>
            </div>
        );
    }
}

export default AddContact ;