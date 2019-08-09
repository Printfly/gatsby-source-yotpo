# gatsby-source-yotpo

This plugin allows you to access your Yotpo reviews and ratings through Gatsby's GraphQL queries. 

## Usage

```
yarn add gatsby-source-yotpo
```

Add the plugin to your `gatsby-config.js` using the "App Key" and "Secret Key" credentials from [your store settings in Yotpo](https://yap.yotpo.com/#/header/account_settings/store_settings):

    plugins: [
      {
        resolve: "gatsby-source-yotpo",
        options: {
          appKey: "YOTPO_APP_KEY",
          appSecret: "YOTPO_SECRET_KEY",
        },
      }
    ]

## Querying for Data

In your page queries, you can query for data like so:

```graphql
{
  reviews: allYotpoProductReview {
    nodes {
      productIdentifier
      score
      sentiment
      votesUp
      votesDown
      title
      name
      email
      reviewerType
      content
    }
  }
  
  ratings: allYotpoProductBottomline {
    nodes {
      productIdentifier
      totalReviews
      score
    }
  }
}
```

For a full list of fields and descriptions of each, see the [Yotpo documentation](https://apidocs.yotpo.com/reference#introduction).
