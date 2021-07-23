/* eslint-disable no-undef */
const redis = require("redis");
const redis_url = process.env.REDIS_URL || null;
const client = redis.createClient(redis_url);
const helper = require("../helper/response");

module.exports = {
  hitCacheAllProduct: (req, res, next) => {
    client.keys("*", function (err, result) {
      console.log(result, "tc");
      client.mget(["pageDetail", "data"], function (err, result) {
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
