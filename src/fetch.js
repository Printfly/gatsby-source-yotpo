import { getAccessToken, allReviews } from './yotpo'

export default async ({ appKey, appSecret }) => {
  console.time(`Fetch Yotpo reviews`)
  console.log(`Starting to fetch reviews from Yotpo`)

  const accessToken = await getAccessToken({
    appKey,
    appSecret,
  })

  const reviews = await pagedGet({
    appKey,
    accessToken,
  })

  console.timeEnd(`Fetch Yotpo reviews`)

  return {
    reviews,
  }
}

async function pagedGet(
  options,
  page = 1,
  pageSize = 100,
  aggregatedResponse = null,
) {
  const reviews = await allReviews({
    ...options,
    page,
    pageSize,
  })

  if (!aggregatedResponse) {
    aggregatedResponse = reviews
  } else {
    aggregatedResponse = aggregatedResponse.concat(reviews)
  }

  if (reviews.length > 0) {
    return pagedGet(options, page + 1, pageSize, aggregatedResponse)
  }

  return aggregatedResponse
}
