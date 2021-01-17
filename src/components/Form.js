import React from "react";
const Form = (props) => (
    <form
        onSubmit={(e) => {
            e.preventDefault();
            props.getNews(e);
        }}
        style={{ marginBottom: "2rem" }}>
        <input
            className="form__input"
            type="text"
            name="news"
            placeholder="Press Enter to search"
        />
        <button className="form__button">Search</button>
    </form>
);
export default Form;
