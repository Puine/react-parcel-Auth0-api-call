import React from 'react'
import ReactDOM from 'react-dom'

import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();

console.log(`[APP] running in ${process.env.NODE_ENV} mode.`)

ReactDOM.render(
  routes,
  document.getElementById('root')
);
