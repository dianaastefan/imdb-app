import React, {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Movie.module.css';
import { useParams } from "react-router-dom";
import { Navigation } from 'swiper/modules';


const Movie = () => {
    const [currentMovieDetail, setMovie] = useState()
    const [cast, setCast] =useState([])
    const [directors, setDirectors]= useState([])
    const { id } = useParams()

    useEffect(() => {
        getData()
        console.log(currentMovieDetail)
        window.scrollTo(0,0)
    },[])

    
    const getData = async () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=64569705d85560116922c8b37f5316fa&language=en-US`)
        .then(res => res.json())
        .then(data => setMovie(data))
    }

    const getCast = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=64569705d85560116922c8b37f5316fa&language=en-US`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setCast(data);
            
            const directors = data.crew.filter(credit => credit.job === 'Director');
            setDirectors(directors);
        } catch (error) {
            console.error('Error fetching cast:', error.message);
            
        }
    };

    useEffect(() => {
        getCast();
        
        window.scrollTo(0, 0);
    }, []); 


    

    return (
        <div className={styles.movie}>
            <div className={styles.movieIntro}>
                <img className={styles.movieBackdrop} src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} alt="img"/>
            </div>
            <div className={styles.movieDetail}>
                <div className={styles.movieDetailLeft}>
                    <div className={styles.moviePosterBox}>
                        <img className={styles.moviePoster} src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} alt="img"/>
                    </div>
                </div>
                <div className={styles.movieDetailRight}>
                    <div className={styles.movieDetailRightTop}>
                        <div className={styles.movieName}>{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className={styles.movieTagLine}>{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className={styles.movieRating}>
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
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

            <h2>Cast</h2>
                <>
                <Swiper navigation={true} modules={[Navigation]} className={styles.swiper}>
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
        
                </Swiper>
                </>
{/* nu mergeeee */}
<Swiper
  spaceBetween={10}
  navigation={true}
   modules={[Navigation]}
>
  {cast && cast.cast
    ? cast.cast.map((actor) => (
        <SwiperSlide key={actor.id} className={styles.swiper}>
          {actor.profile_path && (
            <div className={styles.castImg}>
              <img
                src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                alt={`${actor.name}'s profile`}
              />
            </div>
          )}

          <p className={styles.castName}>{actor.name}</p>
          <p className={styles.castName}>AS {actor.character}</p>
        </SwiperSlide>
      ))
    : ''}
</Swiper>

         

            <div className={styles.cast}>              

                <div className={styles.castMap}>

                {
                  cast && cast.cast
                     ?
                  cast.cast.map(actor =>(
                         <div key={actor.id} className={styles.castInfo}>
                             {actor.profile_path && (
                            <div className={styles.castImg}>
                            <img
                               src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} 
                               alt={`${actor.name}'s profile`}
                            />
                            </div>

                        )}
                        
                     <p className={styles.castName}>{actor.name}</p>
                     <p className={styles.castName}>AS {actor.character}</p>
                   
                    </div>
                                )) : ""
                            }
           
             </div>
            </div>

            <div>
        <h2>Crew</h2>
        <>
            {directors.map(director => (
                <p key={director.id}> Director : {director.name}</p>
            ))}
        </>
    </div>
            
           
        </div>
    )
}

export default Movie