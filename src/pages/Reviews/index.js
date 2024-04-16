import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Title, Form, ReviewsList, SecondTitle } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/fa';
export default function Reviews({ match }) {
  const id = get(match, 'params.id', '');

  const [isLoading, setIsLoading] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);
  const [foto, setFoto] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [coment, setComent] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/movies/${id}`);
        setFoto(get(data, 'backdrops[0]', ''));
        setReviews(get(data, 'reviewIds', []));
        setTitle(get(data, 'title', ''));
        setIsLoading(false);
      } catch (err) {
        toast.error('Erro ao obter imagem');
        setIsLoading(false);
        history.push('/');
      }
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let formError = false;

    if (coment.length < 10) {
      formError = true;
      toast.warn('O seu comentario deve ter pelo menos 20 caracteres');
    }
    if (formError) return;

    try {
      await axios.post('/reviews', { reviewBody: coment, imdbId: id });
      toast.success('Comentario adicionado com sucesso');
      setComent('');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const errors = get(err, 'response.data.erros', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('erro desconhecido');
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Reviews</Title>
      <SecondTitle>{title}</SecondTitle>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="foto">
          <img src={foto} alt="FOTO" />
        </label>
        <textarea
          id="review"
          rows={5}
          cols={55}
          placeholder="Deixe sua opinião"
          value={coment}
          onChange={(e) => setComent(e.target.value)}
        />
        <button
          type="submit"
          onClick={() => {
            setReviews([...reviews, { reviewBody: coment, imdbId: id }]);
          }}
        >
          Comentar
        </button>
      </Form>
      <ReviewsList>
        {reviews.map((review) => (
          <li key={review.id}>
            <FaUser className="user" size={12}></FaUser>
            {review.body}
          </li>
        ))}
      </ReviewsList>
    </Container>
  );
}

Reviews.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
