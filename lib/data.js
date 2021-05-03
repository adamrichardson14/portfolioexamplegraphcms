import { gql, GraphQLClient } from "graphql-request";

const endpoint = "https://api-eu-central-1.graphcms.com/v2/cko71v4sny8f901z1axdbc1u9/master";

const graphQLClient = new GraphQLClient(endpoint);

export const getPostsAndPortfolio = async () => {
  const query = gql`
    {
      portfolios(first: 3, orderBy: date_DESC) {
        title
        tags
        slug
        description
        date
        coverImage {
          url
          width
          height
        }
      }
      posts(first: 3, orderBy: date_DESC) {
        title
        slug
        description
        date
        tags
        author {
          name
          image {
            url
            width
            height
          }
        }
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getPortfolioItems = async () => {
  const query = gql`
    {
      portfolios(orderBy: date_DESC) {
        title
        tags
        slug
        description
        date
        coverImage {
          url
          width
          height
        }
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getPosts = async () => {
  const query = gql`
    {
      posts(orderBy: date_DESC) {
        title
        slug
        description
        date
        tags
        author {
          name
          image {
            url
            width
            height
          }
        }
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getPortfolioItem = async (slug) => {
  const query = gql`
    query getPortfolio($slug: String!) {
      portfolios(where: { slug: $slug }) {
        title
        tags
        slug
        description
        date
        coverImage {
          url
          width
          height
        }
        content
      }
    }
  `;

  const variables = {
    slug,
  };

  return await graphQLClient.request(query, variables);
};

export const getPortfolioSlugs = async () => {
  const query = gql`
    {
      portfolios {
        slug
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getBlogSlugs = async () => {
  const query = gql`
    {
      posts {
        slug
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getPost = async (slug) => {
  const query = gql`
    query getPost($slug: String!) {
      posts(where: { slug: $slug }) {
        title
        slug
        description
        date
        content
        tags
        author {
          name
          image {
            url
            width
            height
          }
        }
      }
    }
  `;

  const variables = {
    slug,
  };

  return await graphQLClient.request(query, variables);
};
