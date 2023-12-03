import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function EditContact(props) {
  const location = useLocation();
  const { id, name, email } = location.state;

  const [info, setInfo] = useState({
    id: id,
    name: name,
    email: email,
  });

  const update = (e) => {
    e.preventDefault();
    if (info.name === "" || info.email === "") {
      alert("Both fields are needed !");
      return;
    }
    props.updateContactHandler(info);
    setInfo({id: "", name: "", email: "" }); // Preserve other properties
  };

  return (
    <div className="ui main">
      <h2>Edit Contacts</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={info.name || ""}
            placeholder="Arun"
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={info.email || ""}
            placeholder="x@gmail.com"
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
          />
          <input type="submit" value="Update" className="ui button blue" />
          <br />
          <Link to="/">
            <button className="ui button blue right">Contact List</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
