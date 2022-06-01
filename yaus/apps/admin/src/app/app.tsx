import * as React from 'react';
import { Admin, Resource, DataProvider, ListGuesser } from 'react-admin';
import buildHasuraProvider from 'ra-data-hasura';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';

import { createBrowserHistory as createHistory } from 'history';
import Links from './components/Dashboard/Links';
const history = createHistory();

const createApolloClient = async () => {
  return new ApolloClient({
    uri: `${process.env.NX_HASURA_URL}`,
    cache: new InMemoryCache(),
    headers: {
      "x-hasura-admin-secret": `${process.env.NX_HASURA_GRAPHQL_ADMIN_SECRET}`,
    },
  });
};
const App = () => { 
  const [dataProvider, setDataProvider] = useState({});

  useEffect(() => {
      const buildDataProvider = async () => {

          const apolloClient = await createApolloClient();

          const hasuraDataProvider = await buildHasuraProvider({
              client: apolloClient
          });
          setDataProvider(() => hasuraDataProvider);
      }
      buildDataProvider();
  }, []);


  return (
      <Admin 
          dataProvider={dataProvider as DataProvider} 
          title="Hasura Dashboard"
          dashboard={Dashboard}
          history={history}
      >
      <Resource name="link" list={Links} />
      </Admin>
  )
};

export default App;
