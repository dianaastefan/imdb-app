import React from 'react';
import { useParams } from 'react-router-dom';
import MovieFetcher from '../../utils/MovieFetcher';
import MovieDetail from './MovieDetail';
import Cast from './Cast';
import Crew from './Crew';

const Movie = () => {
  const { id } = useParams();

  return (
    <MovieFetcher id={id}>
      {({ currentMovieDetail, cast, directors, producers, writers }) => (
        <div>
          <MovieDetail currentMovieDetail={currentMovieDetail} />
          <Cast cast={cast} />
          <Crew directors={directors} producers={producers} writers={writers} />
        </div>
      )}
    </MovieFetcher>
  );
};

export default Movie;
