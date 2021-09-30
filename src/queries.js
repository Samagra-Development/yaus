import gql from "graphql-tag";

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

export const getLinkFromHashID = (client, variables) =>
  client
    .query({
      query: gql`
        query getLinkFromHashID($hashid: Int) {
          link(where: { hashid: { _eq: $hashid } }) {
            url
          }
        }
      `,
      variables,
    })
    .then((response) => {
      return response.data.link[0].url;
    })
    .catch((e) => {
      console.log(e);
      return null;
    });

export const insertLink = (client, variables) =>
  client.mutate({
    mutation: gql`
      mutation addNewLink($url: String, $userID: uuid, $project: uuid) {
        insert_link(objects: { url: $url, user: $userID, project: $project }) {
          returning {
            clicks
            hashid
            id
            project
            tags
            url
            user
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
    .then((res) => {})
    .catch((e) => {});
};
