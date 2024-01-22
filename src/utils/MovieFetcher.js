import React, { useState, useEffect, useMemo } from 'react';

const MovieFetcher = ({ id, children }) => {
    const API_KEY = useMemo(() => process.env.REACT_APP_API_KEY, []);
  const API_URL = useMemo(() => process.env.REACT_APP_API_URL, []);

  const [currentMovieDetail, setMovie] = useState();
  const [cast, setCast] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${API_URL}${id}?api_key=${API_KEY}&language=en-US`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    const getCast = async () => {
      try {
        const response = await fetch(`${API_URL}${id}/credits?api_key=${API_KEY}&language=en-US`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setCast(data);

        const directors = data.crew.filter((credit) => credit.job === 'Director');
        const producers = data.crew.filter((credit) => credit.job === 'Executive Producer');
        const writers = data.crew.filter((credit) => credit.job === 'Screenplay');
        setDirectors(directors);
        setProducers(producers);
        setWriters(writers);
      } catch (error) {
        console.error('Error fetching cast:', error.message);
      }
    };

    getData();
    getCast();
  }, [id,API_KEY, API_URL]);

  return (
    <div>
      {children({ currentMovieDetail, cast, directors, producers, writers })}
    </div>
  );
};

export default MovieFetcher;
