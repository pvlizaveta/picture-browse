import React from "react";
import "./Photos.css";

export default function Photos(props) {
  const FavoriteComponent = props.favoriteComponent;
  if (props.photos) {
    return (
      <section className="Photos">
        <div className="row">
          {props.photos.map(function (photo, index) {
            return (
              <div
                className="image-container d-flex justify-content-start col-3"
                key={index}
              >
                <img
                  src={photo.src.portrait}
                  className="img-fluid"
                  alt="pictures"
                />
                <div
                  onClick={() => props.handleFavoritesClick(photo)}
                  className="overlay d-flex align-items-center"
                >
                  <FavoriteComponent />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  } else {
    return null;
  }
}
///<a href={photo.src.original} target="_blank" rel="noreferrer">  </a>
