import React, { useState, useEffect } from 'react';
import { Container } from '../../styles/GlobalStyles';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Form, ProfilePicture, Title } from './styled';
import { toast } from 'react-toastify';
import { isDate } from 'validator';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Movie({ match }) {
  const id = get(match, 'params.id', null);
  const [imdbId, setImdbId] = useState('');
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [trailerLink, setTrailerLink] = useState('');
  const [genres, setGenres] = useState([]);
  const [genresToAdd, setGenresToAdd] = useState([]);
  const [poster, setPoster] = useState('');
  const [backdrops, setBackdrops] = useState([]);
  const [backdropsToAdd, setBackdropsToAdd] = useState([]);
  const [foto, setFoto] = useState('');

  // loading
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/movies/${id}`);
        const Foto = get(data, 'poster', '');
        setFoto(Foto);
        // console.log(data);
        setImdbId(data.imdbId);
        setTitle(data.title);
        setPoster(data.poster);
        setTrailerLink(data.trailerLink);
        setReleaseDate(data.releaseDate);
        setBackdrops(data.backdrops);
        setGenres(data.genres);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.erros', []);

        if (status === 400)
          errors.map((error) => toast.error('Filme não encontrado'));

        history.push('/');
      }
    }

    getData();
  }, [id]);

  const addGenre = (e) => {
    e.preventDefault();
    genres.push(genresToAdd);
    setGenresToAdd('');
  };

  const addBackdrops = (e) => {
    e.preventDefault();
    backdrops.push(backdropsToAdd);
    setBackdropsToAdd('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formError = false;

    if (imdbId.length < 3) {
      formError = true;
      toast.warning('imdbId precisar ter no minimo 3 caracteres');
    }

    if (title.length < 3 || title.length > 255) {
      formError = true;
      toast.warning(
        'Titulo precisar ter no minimo 3 caracteres e no maximo 255'
      );
    }

    if (isDate(releaseDate)) {
      formError = true;
      toast.warning('Data Invalida');
    }

    if (trailerLink.length < 3) {
      formError = true;
      toast.warning('Link do trailer precisar ter no minimo 3 caracteres');
    }

    if (genres.length < 1) {
      formError = true;
      toast.warning('Adicione pelo menos um genero ao filme');
    }

    if (poster.length < 3) {
      formError = true;
      toast.warning('Link do poster precisar ter no minimo 3 caracteres');
    }

    if (backdrops.length < 1) {
      formError = true;
      toast.warning('Adicione ao menos uma imagem de fundo');
    }

    if (formError) return;

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/movies/${id}`, {
          imdbId,
          title,
          releaseDate,
          trailerLink,
          genres,
          backdrops,
          poster,
        });
        toast.success('filme editado com sucesso!');
      } else {
        const { data } = await axios.post(`/movies`, {
          imdbId,
          title,
          releaseDate,
          trailerLink,
          genres,
          backdrops,
          poster,
        });
        toast.success('filme criado com sucesso!');
        history.push(`/movie/${imdbId}/edit`);
      }
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.erros', []);
      const data = get(err, 'response.data', {});

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('erro desconhecido');
      }

      if (status === 401) {
        dispatch(actions.loginFailure);
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? 'Editar filme' : 'Novo filme'}</Title>

      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={title} /> : <FaUserCircle size={180} />}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={imdbId}
          onChange={(e) => setImdbId(e.target.value)}
          placeholder="Id Imdb"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titulo do filme"
        />
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          placeholder="Data de lançamento"
        />
        <input
          type="text"
          value={trailerLink}
          onChange={(e) => setTrailerLink(e.target.value)}
          placeholder="Link do trailer"
        />
        <input
          type="text"
          value={genresToAdd}
          onChange={(e) => setGenresToAdd(e.target.value)}
          placeholder="Generos"
        />
        <button className="add__to__array" onClick={addGenre}>
          Adicionar {genres.length}
        </button>
        <input
          type="text"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          placeholder="Link poster"
        />
        <input
          type="text"
          value={backdropsToAdd}
          onChange={(e) => setBackdropsToAdd(e.target.value)}
          placeholder="Imagens promocionais"
        />
        <button
          className="add__to__array"
          style={{ marginBottom: '6px' }}
          onClick={addBackdrops}
        >
          Adicionar {backdrops.length}
        </button>

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Movie.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
