import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './Movie.module.css'

const API_IMG_BASE = process.env.REACT_APP_IMAGE_BASE_URL;

const MovieDetail = ({ currentMovieDetail }) => {
  return (
    <div className={styles.movie}>
        <div className={styles.movieIntro}>
                <img className={styles.movieBackdrop} src={`${API_IMG_BASE}${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} alt="img"/>
            </div>
      <div className={styles.movieDetail}>
        <div className={styles.movieDetailLeft}>
                    <div className={styles.moviePosterBox}>
                        <img className={styles.moviePoster} src={`${API_IMG_BASE}${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} alt="img"/>
                    </div>
                </div>
                <div className={styles.movieDetailRight}>
                    <div className={styles.movieDetailRightTop}>
                        <div className={styles.movieName}>{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className={styles.movieTagLine}>{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className={styles.movieRating}>
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <FontAwesomeIcon icon={faStar} />{" "}
                            <span className={styles.movieVoteCount}>{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className={styles.movieRunTime}>{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className={styles.movieReleaseDate}>{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className={styles.movieGenres}>
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className={styles.movieGenre} id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className={styles.movieDetailRightBottom}>
                        <div className={styles.synopsisText}>Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>
            </div>
            <div className={styles.movieLinks}>
                <div className={styles.movieHeading}>Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage}  style={{textDecoration: "none"}}><p><span className={styles.movieHButton}>Homepage</span></p> </a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} style={{textDecoration: "none"}}><p><span className={styles.movieButton}>IMDb</span></p></a>
                }
            </div>
      </div>
  
  );
};

export default MovieDetail;
