import gql from 'graphql-tag';

export const getLastLink = (client, variables) =>
  client.query({
    query: gql`
      query getLastLink {
        link(limit: 1, order_by: { hashid: desc }) {
          id
          user
          url
          tags
          hashid
          clicks
        }
      }
    `,
    variables,
  });

export const getTemplateFromID = (client, variables) =>
  client.query({
    query: gql`
      query getTemplateByID($templateID: uuid) {
        template(where: { id: { _eq: $templateID } }) {
          text
        }
      }
    `,
    variables,
  });

export const getLinkFromHash = (client, variables) =>
  client.query({
    query: gql`
      query getTemplateByID($templateID: uuid) {
        template(where: { id: { _eq: $templateID } }) {
          text
        }
      }
    `,
    variables,
  });

export const getLinkFromHashID = async (client, variables) => {
  return client
    .query({
      query: gql`
        query getLinkFromHashID($hashid: Int) {
          link(where: { hashid: { _eq: $hashid } }) {
            url
            hashid
            customHashId
          }
        }
      `,
      variables,
    })
    .then((response) => response.data)
};

export const getLinkFromHashIdOrCustomHashId = async (client, variables) => {
  return client
    .query({
      query: gql`
        query getLinkFromHashIdOrCustomHashId($hashid: Int, $customHashId: String) {
          link(where: { hashid: { _eq: $hashid }, _or: {customHashId: { _eq: $customHashId }}}) {
            url
            hashid
            customHashId
          }
        }
      `,
      variables,
    })
    .then((response) => response.data)
};

export const getLink = async (client, variables) => {
  return client
    .query({
      query: gql`
        query getLink($hashid: Int, $customHashId: String!) {
          link(
            where: {
              _or: [
                { customHashId: { _eq: $customHashId } }
                { hashid: { _eq: $hashid } }
              ]
            }
          ) {
            url
            hashid
            customHashId
            id
          }
        }
      `,
      variables,
    })
    .then((response) => {
      return response.data;
    })
};

export const getLinkFromCustomHash = async (client, variables) => {
  return client
    .query({
      query: gql`
        query getLinkFromHashID($customHashId: String) {
          link(where: { customHashId: { _eq: $customHashId } }) {
            url
            hashid
            customHashId
          }
        }
      `,
      variables,
    })
    .then((response) => response.data)
};

export const insertLink = (client, variables) =>
  client.mutate({
    mutation: gql`
      mutation addNewLink(
        $url: String
        $userID: uuid
        $project: uuid
        $customHashId: String
      ) {
        insert_link(
          objects: {
            url: $url
            user: $userID
            project: $project
            customHashId: $customHashId
          }
          on_conflict: {
            export constraint: link_user_project_url_customHashId_key
            update_columns: user
          }
        ) {
          returning {
            clicks
            hashid
            id
            project
            tags
            url
            user
            customHashId
          }
        }
      }
    `,
    variables,
  });

export const getUniqueLinkID = (client, variables) =>
  client
    .query({
      query: gql`
        query getUniqueLink($url: String, $user: uuid, $project: uuid) {
          link(
            where: {
              _and: [
                { url: { _eq: $url } }
                { user: { _eq: $user } }
                { project: { _eq: $project } }
              ]
            }
          ) {
            hashid
          }
        }
      `,
      variables,
    })
    .then((res) => {
      return res.data.link[0].hashid;
    });

    export const updateClicks = (client, variables) => {
      client
        .mutate({
          mutation: gql`
            mutation udpateClicks($hashid: Int, $customHashId: String) {
              update_link(
                where: { hashid: { _eq: $hashid }, _or: { customHashId: { _eq: $customHashId } } }
                _set: { clicks: $clicks }
              ) {
                returning {
                  clicks
                }
              }
            }
          `,
          variables,
        })
        .then((res) => {
          console.log(res);
        })
    };

export const incrementClicks = (client, variables) => {
  client
    .mutate({
      mutation: gql`
        mutation udpateClicks($hashid: Int) {
          update_link(
            where: { hashid: { _eq: $hashid } }
            _inc: { clicks: 1 }
          ) {
            returning {
              clicks
            }
          }
        }
      `,
      variables,
    })
    .then((res) => {
      console.log(res);
    })
};

export const updateCustomHashClicks = (client, variables) => {
  client
    .mutate({
      mutation: gql`
        mutation updateClicks($id: uuid) {
          update_link(where: { id: { _eq: $id } }, _inc: { clicks: 1 }) {
            returning {
              clicks
            }
          }
        }
      `,
      variables,
    })
    .then((res) => {})
};

export const updateCustomId = async (client, variables) => {
  return client
    .mutate({
      mutation: gql`
        mutation update_custom_id($hashid: Int, $customhash: String) {
          update_link(
            where: { hashid: { _eq: $hashid } }
            _set: { customHashId: $customhash }
          ) {
            returning {
              customHashId
            }
          }
        }
      `,
      variables,
    })
    .then((res) => {
      console.log('REs', typeof JSON.stringify(res.data.update_link.returning));
      return res.data.update_link.returning;
    })
};
