import React from "react";
const Form = ({ getPlayers }) => (
    <form
        onSubmit={(e) => {
            e.preventDefault();
            getPlayers(e);
        }}
        style={{ marginBottom: "2rem" }}>
        <input
            className="form__input"
            type="text"
            name="playerName"
            placeholder="Press Enter to search"
        />
        <button className="form__button">Search</button>
    </form>
);
export default Form;
