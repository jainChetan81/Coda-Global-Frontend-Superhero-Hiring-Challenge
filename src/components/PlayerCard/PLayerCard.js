import React from "react";

export default function NewsCard(props) {
    const image = `https://source.unsplash.com/300x2${props.index + 10}`;
    return (
        <div className="col-md-4" style={{ marginBottom: "2rem" }}>
            <div className="newss__box">
                <img
                    className="newss__box-img"
                    src={image}
                    alt={`300x2${props.index + 10}`}
                />
                <div className="news__text">
                    <h5 className="newss__title">
                        {props.item.item.headline[0].length < 20
                            ? `${props.item.item.headline[0]}`
                            : `${props.item.item.headline[0].substring(
                                  0,
                                  55
                              )}...`}
                    </h5>
                    <p className="newss__subtitle">
                        Publisher :{" "}
                        <span>{props.item.story["author-name"]}</span>
                    </p>
                </div>
                <span className="videoSidebar__button"></span>
            </div>
        </div>
    );
}
