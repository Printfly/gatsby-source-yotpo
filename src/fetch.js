import { getAccessToken, allReviews, allBottomlines } from './yotpo'

export default async ({ appKey, appSecret }) => {
  console.time(`Fetch Yotpo reviews`)
  console.log(`Starting to fetch reviews from Yotpo`)

  const accessToken = await getAccessToken({
    appKey,
    appSecret,
  })

  const reviews = await pagedGet(allReviews, {
    appKey,
    accessToken,
  })

  const bottomlines = await pagedGet(allBottomlines, {
    appKey,
    accessToken,
  })

  console.timeEnd(`Fetch Yotpo reviews`)

  return {
    reviews,
    bottomlines,
  }
}

async function pagedGet(
  method,
  options,
  page = 1,
  pageSize = 100,
  aggregatedResponse = null,
) {
  const reviews = await method({
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
    return pagedGet(method, options, page + 1, pageSize, aggregatedResponse)
  }

  return aggregatedResponse
}
