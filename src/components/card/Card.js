import React, {useEffect, useState} from 'react'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import styles from './Card.module.css'
import { Link } from "react-router-dom"

const Cards = ({movie}) => {
    const [isLoading, setIsLoading] = useState(true);
    const API_IMG_BASE=process.env.REACT_APP_IMAGE_BASE_URL

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, []) 

    return <>
    {
        isLoading
        ?
        <div className={styles.cards}>
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        :
        <Link to={`/movie/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
            <div className={styles.cards}>
                <img className={styles.cardsImg}src={`${API_IMG_BASE}${movie?movie.poster_path:""}`} alt='img'/>
                <div className={styles.cardsOverlay}>
                    <div className={styles.cardTitle}>{movie?movie.original_title:""}</div>
                    <div className={styles.cardRuntime}>
                        {movie?movie.release_date:""}
                        <span className={styles.cardRating}>{movie?movie.vote_average:""} &#11088;</span>
                    </div>
                    <div className={styles.cardDescription }>{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                </div>
            </div>
        </Link>
    }
    </>
}

export default Cards