var request = require('request');

exports.sourceNodes = async ({ boundActionCreators }, { apiKey, productResolver }) => {
  if(!apiKey) {
    console.log('\nMake sure options has apiKey');
    process.exit(1);
  }

  const { createNode } = boundActionCreators;

  // Site Reviews
  request.get(
    `https://api.yotpo.com/v1/widget/${appKey}/products/yotpo_site_reviews/reviews.json?per_page=50&page=1`,
    function(error, response, body) {
      var data = JSON.parse(body);
      data.response.reviews.forEach(review => createNode(
        Object.assign(
          review,
          {
            id: review.id,
            parent: `__SOURCE__`,
            children: [],
            internal: {
              type: `SiteReview`,
              contentDigest: crypto
                .createHash(`md5`)
                .update(JSON.stringify(review))
                .digest(`hex`)
            }
          }
        )
      ));
    }
  )

  // Product Reviews
  if(!productResolver) {
    productResolver.forEach(product => {
      request.get(
        `https://api.yotpo.com/v1/widget/${appKey}/products/${product}/reviews.json`,
        function(error, response, body) {
          var data = JSON.parse(body);
          data.response.reviews.forEach(review => createNode(
            Object.assign(
              review,
              {
                id: review.id,
                parent: `__SOURCE__`,
                children: [],
                internal: {
                  type: `ProductReview`,
                  contentDigest: crypto
                    .createHash(`md5`)
                    .update(JSON.stringify(review))
                    .digest(`hex`)
                }
              }
            )
          ));
        }
      )
    })
  }

  return;
};

var request = require('request');
