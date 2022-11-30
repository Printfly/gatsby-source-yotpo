import axios from "axios";

export const getAccessToken = ({ appKey, appSecret, page, pageSize }) => {
  return new Promise((resolve, reject) => {
    axios.post(`https://api.yotpo.com/oauth/token`, {
      client_id: appKey,
      client_secret: appSecret,
      grant_type: "client_credentials",
    }, {
      timeout: 3000,
      headers: {
        accept: 'application/json'
      }
    }).then((response) => {
      resolve(response.data.access_token);
    }).catch((error) => {
      console.log('Get all reviews error', error);
      reject(error);
    });
  });
  /*
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
  */
};

export const allReviews = ({ appKey, accessToken, page, pageSize }) => {
  return new Promise((resolve, reject) => {
    console.log(`getting page ${page}`);
    axios.get(`https://api.yotpo.com/v1/apps/${appKey}/reviews`, {
      params: {
        utoken: accessToken,
        page: page,
        count: pageSize,
      },
      timeout: 10000,
      headers: {
        accept: 'application/json'
      }
    }).then((response) => {
      resolve(response.data.reviews);
    }).catch((error) => {
      console.log('Get all reviews error', error);
      reject(error);
    });
  });
};

export const getCachedData = (assetsUrl) => {
  return new Promise((resolve, reject) => {
    axios.get(`${assetsUrl}/assets/Yotpo/reviews.json`, {
      timeout: 3000,
      headers: {
        accept: 'application/json'
      }
    }).then((response) => {
      resolve(response.data);
    }).catch((error) => {
      console.log('Get cached data error', error);
      reject(error);
    });
  });
}
export const allProductBottomlines = ({ appKey, page, pageSize }) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.yotpo.com/v1/apps/${appKey}/bottom_lines`, {
      params: {
        page: page,
        count: pageSize,
      },
      timeout: 3000,
      headers: {
        accept: 'application/json'
      }
    }).then((response) => { 
      resolve(response.data.response.bottomlines);
    }).catch((error) => {
      console.log('All product bottom line error', error);
      reject(error);
    });
  });
};

export const allSiteBottomlines = ({ appKey, page, pageSize }) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.yotpo.com/products/${appKey}/yotpo_site_reviews/bottomline`, {
      params: {
        page: page,
        count: pageSize,
      },
      timeout: 3000,
      headers: {
        accept: 'application/json'
      }
    }).then((response) => {
      resolve([response.data.response.bottomline]);
    }).catch((error) => {
      console.log('All site bottom line error', error);
      reject(error);
    });
  });
};
