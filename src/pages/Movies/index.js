import React, { useEffect, useState } from 'react';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { MovieContainer, MovieBackdrop } from './styled';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../../components/Loading';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/movies');
      setMovies(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Movies</h1>
      <MovieContainer>
        {movies.map((movie) => (
          <div key={String(movie.id)}>
            <MovieBackdrop>
              {get(movie, 'backdrops[0]', '') ? (
                <img src={movie.backdrops[0]} />
              ) : (
                <FaUserCircle size={36} />
              )}
            </MovieBackdrop>
            <span>{movie.title}:</span>
            <span>{movie.releaseDate}</span>
            <Link to={`/movie/${movie.imdbId}/edit`}>
              <FaEdit size={16}></FaEdit>
            </Link>
            <Link to={`/movie/${movie.imdbId}/delete`}>
              <FaWindowClose size={16}></FaWindowClose>
            </Link>
          </div>
        ))}
      </MovieContainer>
    </Container>
  );
}
