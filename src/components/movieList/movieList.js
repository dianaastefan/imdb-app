import React, {useEffect,useState} from 'react'
import styles from './movieList.module.css'
import { useParams } from "react-router-dom"
import Cards from '../card/Card'
// import Pagination from './Pagination'

const MovieList = () => {
    const [movieList, setMovieList] = useState([])
    const {type} = useParams();

    // const [currentPage, setCurrentPage]=useState(1);
    // const [postsPerPage]=useState(8);
  
    //   const lastPostIndex= currentPage *postsPerPage;
    //   const firstPostIndex= lastPostIndex -postsPerPage;
    //  const currentPosts= movieList.slice(firstPostIndex,lastPostIndex);

    useEffect(() => {
        getData()
    },[])

    useEffect(() => {
        getData()
    }, [type])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=64569705d85560116922c8b37f5316fa&language=en-US`)
        .then(res => res.json())
        .then(data => setMovieList(data.results))
    }

    return (
        <div className={styles.movieList}>
            <h2 className={styles.listTitle}>{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className={styles.listCards}>
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>
            {/* <Pagination 
      totalPosts = {movieList.length}  
      postsPerPage ={postsPerPage} 
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}/> */}
        </div>
    )
}

export default MovieList