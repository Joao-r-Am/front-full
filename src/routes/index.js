import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';
import Login from '../pages/Login';
import Movie from '../pages/Movie';
import Movies from '../pages/Movies';
import Register from '../pages/Register';
import Reviews from '../pages/Reviews';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Movies} isClosed={false} />
      <MyRoute exact path="/movie/:id/edit" component={Movie} isClosed />
      <MyRoute exact path="/movie/" component={Movie} isClosed />
      <MyRoute exact path="/reviews/:id" component={Reviews} isClosed />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
