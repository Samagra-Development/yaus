import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  QueryOptions,
  gql,
  ApolloQueryResult,
} from '@apollo/client';
import { getLinkFromHashID } from './queries';
import { fetch } from 'isomorphic-fetch';

@Injectable()
export class RouterService {
  dbClient: ApolloClient<any>;

  constructor(private readonly configService: ConfigService) {
    this.dbClient = this.getClient(
      this.configService.get<string>('GRAPHQL_URI'),
      {
        'x-hasura-admin-secret': this.configService.get<string>(
          'HASURA_ADMIN_SECRET'
        ),
        'content-type': 'application/json',
      }
    );
  }

  getClient = (
    uri: string,
    headers: { [key: string]: string }
  ): ApolloClient<any> => {
    return new ApolloClient({
      link: new HttpLink({
        uri: uri,
        headers: headers,
        fetch: fetch,
      }),
      cache: new InMemoryCache(),
    });
  };

  async redirect(hashid: string): Promise<string> {
    const response = await getLinkFromHashID(this.dbClient, {
      hashid: parseInt(hashid),
    });
    return response.link[0].url || '';
  }
}
