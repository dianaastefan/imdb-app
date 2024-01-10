import React, {useState, useEffect} from 'react'
import styles from './Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const Home = () => {
    const [ popularMovies, setPopularMovies ] = useState([])

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=64569705d85560116922c8b37f5316fa&language=en-US")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    }, [])

    return (
        <>
            <div className={styles.poster}>
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                                <div className={styles.posterImage}>
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt='poster'/>
                                </div>
                                <div className={styles.posterImageOverlay}>
                                    <div className={styles.posterImageTitle}>{movie ? movie.original_title: ""}</div>
                                    <div className={styles.posterImageRunTime}>
                                        {movie ? movie.release_date : ""}
                                        <span className={styles.posterImageRating}>
                                            {movie ? movie.vote_average :""}
                                            <FontAwesomeIcon icon={faStar} />{" "}
                                        </span>
                                    </div>
                                    <div className={styles.posterImageDescription}>{movie ? movie.overview : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <MovieList />
            </div>
        </>
    )
}

export default Home