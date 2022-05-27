const gql = require("graphql-tag");

const getLastLink = (client, variables) =>
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

const getTemplateFromID = (client, variables) =>
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

const getLinkFromHash = (client, variables) =>
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

const getLinkFromHashID = async (client, variables) => {
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
    .catch((e) => {
      return null;
    });
};

const getLink = async (client, variables) => {
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
    .catch((e) => {
      console.log(e);
      return null;
    });
};

const getLinkFromCustomHash = async (client, variables) => {
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
    .catch((e) => null);
};

const insertLink = (client, variables) =>
  client.mutate({
    mutation: gql`
    mutation addNewLink($url: String, $userID: uuid, $project: uuid, $customHashId: String) {
      insert_link(objects: {url: $url, user: $userID, project: $project, customHashId: $customHashId}, on_conflict: {constraint: link_user_project_url_customHashId_key, update_columns: user}) {
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

const getUniqueLinkID = (client, variables) =>
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

const updateClicks = (client, variables) => {
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
    .catch((e) => {
      console.log(e);
    });
};
const updateCustomHashClicks = (client, variables) => {
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
    .then((res) => { })
    .catch((e) => {
      console.log(e);
    });
};

const updateCustomId = async (client, variables) => {
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
      console.log("REs", typeof JSON.stringify(res.data.update_link.returning));
      return res.data.update_link.returning;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
};

module.exports = {
  updateClicks,
  updateCustomHashClicks,
  updateCustomId,
  getLastLink,
  getLink,
  getLinkFromCustomHash,
  getLinkFromHashID,
  getTemplateFromID,
  getUniqueLinkID,
  insertLink,
};
