/* eslint-disable no-undef */
const redis = require("redis");
const redis_url = process.env.REDIS_URL || null;
const client = redis.createClient(redis_url);
const helper = require("../helper/response");

module.exports = {
  hitCacheAllProduct: (req, res, next) => {
    // const page = parseInt(req.query.page) || 0;
    // const search = req.query.search || "";
    // const sortBy = req.query.sortBy || "id";
    // const sort = req.query.sort || "ASC";
    // const limit = parseInt(req.query.limit) || 15;
    // const offset = (page - 1) * limit;
    client.keys("*", function (err, result) {
      console.log(result, "tc");
      client.mget(["pageDetail", `data`], function (err, result) {
        // let total = result[0];
        // const prevPage = page === 1 ? 1 : page - 1;
        // const nextPage = page === total ? total : page + 1;
        // let pageDetail = {
        //   total: Math.ceil(total),
        //   per_page: limit,
        //   current_page: page,
        //   totalPage: Math.ceil(total / limit),
        //   nextLink: `http://localhost:4000${req.originalUrl.replace(
        //     "page=" + page,
        //     "page=" + nextPage
        //   )}`,
        //   prevLink: `http://localhost:4000${req.originalUrl.replace(
        //     "page=" + page,
        //     "page=" + prevPage
        //   )}`,
        // };
        if (result[0] !== null && result[1] !== null) {
          const pageDetail = JSON.parse(result[0]);
          const data = JSON.parse(result[1]);
          helper.responsePagination(
            res,
            "redis nih",
            200,
            false,
            pageDetail,
            data
          );
        } else {
          next();
        }
      });
    });
  },
};

// };
// }

// client.mget("pageDetail data", function (err, pageDetail, data) {
// if (null) {
//   const result = JSON.parse(pageDetail);
//   helper.responsePagination(res, "OK", 200, false, result, res);
// } else {
//   next();
// }
// });
// if (data === undefined) {
// client.get("data", function (err, data) {
//   if (data !== null) {
//     const result = JSON.parse(data);
//
//   } else {
//     next();
//   }
// });
// }
//   next();
//   // }
// },
// hitCacheProductId:(req, res, next) => {
//   const id = req.params.idsaya
//   client.get(`product/${id}`, function (err, data) {
//     // reply is null when the key is missing
//     if (data !== null) {
//       const result = JSON.parse(data)
//       console.log('data cache di hit');
//       return helpers.response(res, result, 200)
//     } else {
//       next()
//     }
//   });
// }
// clearRedisProduct: (req, res, next) => {
//   client.del("");
//   next();
// },
// getCached: (req, res, next) => {
//   const { redis_key } = req.headers;
//   client.get(redis_key, function (err, reply) {
//     if (err) {
//       helper.response(res, 404, err);
//     }
//     if (reply == null) {
//       next();
//     } else {
//       const result = JSON.parse(data);
//       helpers.response(res, result, 200);
//     }
//   });
// },
// caching: (key, data) => {
//   client.set(key, JSON.stringify(data));
// },
// delCache: (key) => {
//   client.del(key);
// },
