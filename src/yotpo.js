import request from "request";

export const getAccessToken = ({ appKey, appSecret, page, pageSize }) => {
  const options = {
    method: "POST",
    url: `https://api.yotpo.com/oauth/token`,
    json: {
      client_id: appKey,
      client_secret: appSecret,
      grant_type: "client_credentials",
    },
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) reject(error);

      resolve(body.access_token);
    });
  });
};

export const allReviews = ({ appKey, accessToken, page, pageSize }) => {
  const options = {
    method: "GET",
    url: `https://api.yotpo.com/v1/apps/${appKey}/reviews`,
    qs: {
      utoken: accessToken,
      page: page,
      count: pageSize,
    },
    json: true,
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) reject(error);

      resolve(body.reviews);
    });
  });
};

export const allProductBottomlines = ({ appKey, page, pageSize }) => {
  const options = {
    method: "GET",
    url: `https://api.yotpo.com/v1/apps/${appKey}/bottom_lines`,
    qs: {
      page: page,
      count: pageSize,
    },
    json: true,
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) reject(error);

      resolve(body.response.bottomlines);
    });
  });
};

export const allSiteBottomlines = ({ appKey, page, pageSize }) => {
  const options = {
    method: "GET",
    url: `https://api.yotpo.com/products/${appKey}/yotpo_site_reviews/bottomline`,
    qs: {
      page: page,
      count: pageSize,
    },
    json: true,
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) reject(error);

      resolve([body.response.bottomline]);
    });
  });
};
