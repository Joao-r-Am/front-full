import React, { useEffect, useState } from 'react';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { MovieContainer, MovieBackdrop, NewMovie } from './styled';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

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

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, imdbId) => {
    try {
      setIsLoading(true);
      await axios.delete(`/movies/${imdbId}`);
      e.target.parentElement.remove();
      setIsLoading(false);
    } catch (err) {
      const errors = get(err, 'response.data.error', []);
      const status = get(err, 'response.status', 0);
      // errors.map((error) => toast.error(error));
      if (status === 401) {
        toast.error('Faça login');
      } else {
        toast.error('Erro ao excluir o filme');
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Movies</h1>
      <NewMovie to="/movie/">Novo Filme</NewMovie>
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
            <span>{movie.title}</span>

            <Link to={`/movie/${movie.imdbId}/edit`}>
              <FaEdit size={16}></FaEdit>
            </Link>
            <Link
              onClick={handleDeleteAsk}
              to={`/movie/${movie.imdbId}/delete`}
            >
              <FaWindowClose size={16}></FaWindowClose>
            </Link>
            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, movie.imdbId)}
            />
          </div>
        ))}
      </MovieContainer>
    </Container>
  );
}
