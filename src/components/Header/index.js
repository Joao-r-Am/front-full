import React from 'react';
import { Nav } from './styles';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux';

export default function Header() {
  const botaoClicado = useSelector((state) => state.botaoClicado);

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/login">
        <FaUserAlt size={24} />
      </Link>
      <Link to="/aloo">
        <FaSignInAlt size={24} />
      </Link>
      {botaoClicado ? 'Clicado' : 'Não clicado'}
    </Nav>
  );
}
