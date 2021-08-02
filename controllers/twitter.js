import Twitter from 'twitter-lite';

const twitterUser = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
});

let app;

(async function() {
    let response = await twitterUser.getBearerToken();
    app = new Twitter({
        bearer_token: response.access_token,
    });
})();

export const getTweets = async (req, res) => { 

    const { symbol } = req.query;

    try { 
        let response = await app.get(`/search/tweets`, {
            q: symbol,
            lang: "en",       
            count: 15,       
        });
        let tweets = [];
        for (let tweet of response.statuses) {
            tweets.push({ name: tweet.user.screen_name, text: tweet.text });
        }
        res.status(200).json({ tweets })
    } catch (error) { 
        res.status(500).json({ message: error.message });
        console.log(error);
    }

}
