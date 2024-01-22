import React, {useEffect,useState, useCallback} from 'react';
import styles from './movieList.module.css';
import { useParams } from "react-router-dom";
import { fetchData } from '../../utils/Fetcher';
import Cards from '../card/Card';

const MovieList = () => {

    const [movieList, setMovieList] = useState([])
    const {type} = useParams();

      const getData = useCallback(async () => {
        try {
        const data = await fetchData(type ? type : 'popular');
        setMovieList(data.results);
      } catch (error) {
      
      console.error('Error fetching data:', error.message);
    }
  }, [type]);

      useEffect(() => {
        getData();
      }, [getData]);

    return (
        <div className={styles.movieList}>
            <h2 className={styles.listTitle}>{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className={styles.listCards}>
                {
                    movieList.map(movie => (
                        <Cards key={movie.id} movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList