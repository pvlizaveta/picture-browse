import React, { useEffect, useState } from "react";
import axios from "axios";
import Photos from "./Photos";
import "./PictureBrowse.css";
import AddFavorites from "./AddFavorites";
import RemoveFavorites from "./RemoveFavorites";

export default function PictureBrowse(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyWord);
  let [favorites, setFavorites] = useState([]);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState(null);

  function handlePexelsResponse(response) {
    setPhotos(response.data.photos);
  }
  function search() {
    let pexelsApiKey =
      "563492ad6f9170000100000197f6ff9d6da8465e9b501c5ed1b157f4";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=60`;
    axios
      .get(pexelsApiUrl, {
        headers: { Authorization: `Bearer ${pexelsApiKey}` },
      })
      .then(handlePexelsResponse);
  }
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function load() {
    setLoaded(true);
    search();
  }

  useEffect(() => {
    const pictureFavorites = JSON.parse(
      localStorage.getItem("picture-browse-favorites")
    );
    if (pictureFavorites) {
      setFavorites(pictureFavorites);
    }
  }, []);

  function saveToLocalStorage(items) {
    localStorage.setItem("picture-browse-favorites", JSON.stringify(items));
  }

  function addFavoritePicture(picture) {
    const newFavoriteList = [...favorites, picture];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  const removeFavoritePicture = (picture) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.id !== picture.id
    );
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  if (loaded) {
    return (
      <div className="Photos">
        <section>
          <div className="Forms">
            <form onSubmit={handleSubmit}>
              <div className="Searching">
                <div className="row">
                  <div className="col-6">
                    <input
                      className="search"
                      type="search"
                      autoFocus="on"
                      autoComplete="off"
                      onChange={handleKeywordChange}
                      defaultValue={props.defaultKeyWord}
                    />
                  </div>
                  <div className="col-3">
                    <input
                      type="submit"
                      className="SubmitButton"
                      value="Search"
                      size="10"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>

        <div className="row d-flex align-items-center mt-4 mb-4">
          <div className="col"></div>
          <div className="row">
            <h1>Favorites</h1>
            <Photos
              photos={favorites}
              handleFavoritesClick={removeFavoritePicture}
              favoriteComponent={RemoveFavorites}
            />
          </div>
        </div>
        <Photos
          photos={photos}
          handleFavoritesClick={addFavoritePicture}
          favoriteComponent={AddFavorites}
        />
      </div>
    );
  } else {
    load();
    return "Loading";
  }
}
