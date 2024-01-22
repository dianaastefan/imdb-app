// Crew.js
import React from 'react';
import styles from './Movie.module.css';

const Crew = ({ directors, producers, writers }) => {
  return (
    <div className={styles.crewList}>
      <h2>Crew</h2>
      <div className={styles.crew}>
        {directors.map((director) => (
          <p key={director.id}> Director: {director.name}</p>
        ))}

        {producers.map((producer) => (
          <p key={producer.id}> Producer: {producer.name}</p>
        ))}

        {writers.map((writer) => (
          <p key={writer.id}> Screenplay: {writer.name}</p>
        ))}
      </div>
    </div>
  );
};

export default Crew;
