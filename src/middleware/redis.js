/* eslint-disable no-undef */
const redis = require("redis");
const redis_url = process.env.REDIS_URL || null;
const client = redis.createClient(redis_url);
const _ = require("lodash");
const helper = require("../helper/response");

module.exports = {
  hitCacheAllProduct: (req, res, next) => {
    client.get("data", function (err, result) {
      if (result !== null) {
        const data = JSON.parse(result);
        const page = parseInt(req.query.page) || 1;
        const searchkey = req.query.search || "";
        const sortBy = req.query.sortBy || "id";
        const sortkey = req.query.sort || "ASC";

        //pagination
        const limit = parseInt(req.query.limit) || 15;
        const offset = (page - 1) * limit;
        const endPage = page * limit;

        //sort
        // //sort
        const sort = _.orderBy(data, [sortBy], [sortkey]);
        // redis data
        let redisData = sort;
        // search
        if (searchkey !== null) {
          const search = sort.filter((e) =>
            e.name.toLowerCase().includes(searchkey.toLowerCase())
          );
          redisData = search;
        }
        let total = data.length;
        const prevPage = page === 1 ? 1 : page - 1;
        const nextPage = page === total ? total : page + 1;
        let pageDetail = {
          total: Math.ceil(total),
          per_page: limit,
          current_page: page,
          totalPage: Math.ceil(total / limit),
          nextLink: `http://localhost:4000${req.originalUrl.replace(
            "page=" + page,
            "page=" + nextPage
          )}`,
          prevLink: `http://localhost:4000${req.originalUrl.replace(
            "page=" + page,
            "page=" + prevPage
          )}`,
        };
        res.send({
          message: "get data from redis",
          status: 200,
          success: true,
          pageDetail,
          data: redisData.slice(offset, endPage), //data di paginasi di sini
        });
        // helper.responsePagination(res, "OK", 200, false, pageDetail, data);
        console.log("cek data from redis");
      } else {
        next();
      }
    });
  },

  hitCacheProductId: (req, res, next) => {
    const id = req.params.id;
    client.get(`product/${id}`, function (err, data) {
      // Reply is null when the key is missing
      if (data !== null) {
        const result = JSON.parse(data);
        console.log("result redis get");
        return helper.response(res, "Data from redis", result);
      }

      next();
    });
  },
  clearRedisProduct: (req, res, next) => {
    client.del("data");
    next();
  },
  clearRedisProductById: (req, res, next) => {
    const id = req.params.id;
    client.del(`product/${id}`);
    next();
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
