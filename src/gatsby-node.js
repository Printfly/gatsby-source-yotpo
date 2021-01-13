import createNodeHelpers from "gatsby-node-helpers";
import fetchData from "./fetch";

const nodeHelpers = createNodeHelpers({ typePrefix: "Yotpo" });
const { createNodeFactory, generateNodeId } = nodeHelpers;

export const sourceNodes = async (
  { boundActionCreators: { createNode } },
  pluginOptions
) => {
  if (!pluginOptions.appKey) {
    console.log("\nMake sure options has appKey");
    process.exit(1);
  }

  if (!pluginOptions.appSecret) {
    console.log("\nMake sure options has appSecret");
    process.exit(1);
  }

  const { reviews, productBottomlines, siteBottomlines } = await fetchData({
    appKey: pluginOptions.appKey,
    appSecret: pluginOptions.appSecret,
  });

  await Promise.all(
    reviews.map(async (review) => {
      const type =
        review.sku === "yotpo_site_reviews" ? "SiteReview" : "ProductReview";
      const Node = createNodeFactory(type, async (node) => {
        node.dataString = JSON.stringify(node.data);

        return node;
      });

      if (review.sku) {
        const data = {
          id: review.id,
          title: review.title,
          content: review.content,
          score: review.score,
          productIdentifier: review.sku.toLowerCase(),
          sentiment: review.sentiment,
          votesUp: review.votes_up,
          votesDown: review.votes_down,
          name: review.name,
          email: review.email,
          reviewerType: review.reviewer_type,
          createdAt: review.created_at,
          updatedAt: review.updated_at,
        };

        const node = await Node(data);
        createNode(node);
      }
    }),
    productBottomlines.map(async (bottomline) => {
      const type = "ProductBottomline";
      const Node = createNodeFactory(type, async (node) => {
        node.dataString = JSON.stringify(node.data);

        return node;
      });

      const data = {
        id: bottomline.domain_key,
        score: bottomline.product_score,
        totalReviews: bottomline.total_reviews,
        productIdentifier: bottomline.domain_key.toLowerCase(),
      };

      const node = await Node(data);
      createNode(node);
    }),
    siteBottomlines.map(async (bottomline) => {
      const type = "SiteBottomline";
      const Node = createNodeFactory(type, async (node) => {
        node.dataString = JSON.stringify(node.data);

        return node;
      });

      const data = {
        id: "SiteBottomline",
        score: bottomline.average_score,
        totalReviews: bottomline.total_reviews,
      };

      const node = await Node(data);
      createNode(node);
    })
  );

  return;
};
