import { getByTitle } from "@testing-library/react";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

const BASE_URL = "https://yts.mx/api/v2/movie_details.json?movie_id=";
const TEMP = {
  large_cover_image:
    "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
  title: "Rocketry: The Nambi Effect",
  title_long: "Rocketry: The Nambi Effect (2022)",
  year: 2022,
  rating: 8.9,
  runtime: 157,
  genres: ["Action", "Biography", "Drama", "Sci-Fi"],
  description_full:
    "Based on the life of Indian Space Research Organization scientist Nambi Narayanan, who was framed for being a spy and arrested in 1994. Though free, he continues to fight for justice against the officials who falsely implicated him.",
  language: "ta",
};

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();

  const getMovie = async () => {
    const response = await fetch(BASE_URL + id);
    const json = await response.json();
    setLoading(false);
    setMovie(json.data.movie);
    console.log(movie);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Detail Loading...</h1>
      ) : (
        <>
          {movie === undefined ? (
            <div className={styles.movie_detail}>
              <div className={styles.movie_img}>
                <img src={`${TEMP.large_cover_image}`} />
              </div>
              <div className={styles.movie_title}>
                <h1>{TEMP.title}</h1>
                <h3>{TEMP.title_long}</h3>
              </div>
              <div className={styles.movie_etc}>
                <div className={styles.movie_description}>
                  <span>{TEMP.description_full}</span>
                </div>
                <div className={styles.movie_infos}>
                  <span>Year: {TEMP.year}</span>
                  <span>Rating: {TEMP.rating}</span>
                  <span>Runtime: {TEMP.runtime}</span>
                  <span>Language: {TEMP.language}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.movie_detail}>
              <div className={styles.movie_img}>
                <img src={`${movie.large_cover_image}`} />
              </div>
              <div className={styles.movie_title}>
                <h1>{movie.title}</h1>
                <h3>{movie.title_long}</h3>
              </div>
              <div className={styles.movie_etc}>
                <div className={styles.movie_description}>
                  <span>{movie.description_full}</span>
                </div>
                <div className={styles.movie_infos}>
                  <span>Year: {movie.year}</span>
                  <span>Rating: {movie.rating}</span>
                  <span>Runtime: {movie.runtime}</span>
                  <span>Language: {movie.language}</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default Detail;

/*
<div className={styles.movie_detail}>
          <div className={styles.movie_img}>
            <img src={`${TEMP.large_cover_image}`} />
          </div>
          <div className={styles.movie_title}>
            <h1>{TEMP.title}</h1>
            <h3>{TEMP.title_long}</h3>
          </div>
          <div className={styles.movie_etc}>
            <div className={styles.movie_description}>
              <span>{TEMP.description_full}</span>
            </div>
            <div className={styles.movie_infos}>
              <span>Year: {TEMP.year}</span>
              <span>Rating: {TEMP.rating}</span>
              <span>Runtime: {TEMP.runtime}</span>
              <span>Language: {TEMP.language}</span>
            </div>
          </div>
        </div>
        */
