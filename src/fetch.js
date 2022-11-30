import {
  getCachedData
} from "./yotpo";

export default async (assetsUrl) => {
  console.time(`Fetch Yotpo reviews`);
  console.log(`Starting to fetch reviews from Yotpo using AU's fork of gatsby-source-yotpo`);

  const data = await getCachedData(assetsUrl);

  console.timeEnd(`Fetch Yotpo reviews`);

  return data;
};

async function pagedGet(
  method,
  options,
  page = 1,
  pageSize = 1000,
  aggregatedResponse = null
) {
  const reviews = await method({
    ...options,
    page,
    pageSize,
  });

  if (!aggregatedResponse) {
    aggregatedResponse = reviews;
  } else {
    aggregatedResponse = aggregatedResponse.concat(reviews);
  }

  if (reviews.length > 0) {
    return pagedGet(method, options, page + 1, pageSize, aggregatedResponse);
  }

  return aggregatedResponse;
}
