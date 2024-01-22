
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import styles from './Movie.module.css';
import 'swiper/css';
import 'swiper/css/navigation';


const API_IMG_BASE = process.env.REACT_APP_IMAGE_BASE_URL;
const Cast = ({ cast }) => {
  return (
    
    <div style={{ width: '100%', padding: '20px' }}>
      <h2>Cast</h2>
      <Swiper 
        spaceBetween={50}
        slidesPerView={5}
        navigation={true}
        modules={[Navigation]}>
        {cast && cast.cast
          ? cast.cast.map((actor) => (
              <SwiperSlide key={actor.id} className={styles.swiper}>
                {actor.profile_path && (
                  <div className={styles.castImg}>
                    <img
                      src={`${API_IMG_BASE}${actor.profile_path}`}
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
    </div>
  );
};

export default Cast;
