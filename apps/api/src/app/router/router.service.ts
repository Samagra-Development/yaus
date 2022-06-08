import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const Hashids = require("hashids");

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  QueryOptions,
  gql,
  ApolloQueryResult,
} from '@apollo/client';
import { getLink, getLinkFromHashID } from './queries';
import { fetch } from 'isomorphic-fetch';

@Injectable()
export class RouterService {
  dbClient: ApolloClient<any>;
  hashids;

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

    this.hashids = new Hashids();
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

  async decodeAndRedirect(code: string): Promise<{url: string, hashid: number}> {
    let hashid = -1;
    try {
      hashid = this.hashids.decode(code)[0];
    } catch (e) {
      hashid = -1;
    }
    if (!hashid) hashid = -1;
    const redirectURL = await getLink(this.dbClient, {
      hashid,
      customHashId: hashid > -1 ? "" : code,
    });
    return {url:redirectURL.link[0].url || '', hashid: hashid};
  }
}
