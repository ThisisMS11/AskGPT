const asyncHandler = require('./asyncHandler');
// const redis = require('redis');

const errorResponse = require('../utils/ErrorHandler')
const { promisify } = require('util');

// const client = redis.createClient();
const Redis = require("ioredis");
const redis = new Redis();


exports.Setcomments = asyncHandler(async (req, res, next) => {
    const postID = req.params.postId;
    const key = `comments?postID=${postID}`;

    // !if postID is not found the user is not allowed 
    if (!postID) { next(new errorResponse('PostID not found', 404)) }

    try {
        // const value = await getAsync("passion");
        // console.log(value);

        // redis.set("passion","coding");

        redis.get(key, (err, reply) => {
            if (err) {
                console.error('redis error :- ',error);
            }

            if (reply != null) {
                console.log("cache hit right");
                res.json(JSON.parse(reply));
            }else{
                next();
            }
        });

    } catch (error) {
        res.json(error);
        // { next(new errorResponse('something went wrong', 404)) }
    }

})
