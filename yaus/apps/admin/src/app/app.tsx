import * as React from 'react';
import { Admin, Resource, DataProvider, ListGuesser } from 'react-admin';
import buildHasuraProvider from 'ra-data-hasura';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';

import { createBrowserHistory as createHistory } from 'history';
const history = createHistory();

const createApolloClient = async () => {
  console.log(process.env)
  return new ApolloClient({
    // uri: 'http://localhost:15003/v1/graphql',
    uri: `${process.env.NX_HASURA_URL}`,
    cache: new InMemoryCache(),
    headers: {
      "x-hasura-admin-secret": `${process.env.NX_HASURA_GRAPHQL_ADMIN_SECRET}`,
      // "x-hasura-admin-secret": 'adminSuperSecret',
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
      <Resource name="link" list={ListGuesser} />
      </Admin>
  )
};

export default App;
