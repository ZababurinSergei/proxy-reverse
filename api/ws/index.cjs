const dotenv = require('dotenv');
const Ably = require('ably/promises');

dotenv.config();

module.exports.handler = async function handler (event, context) {
    const optionalClientId = 'mCWdHA.ttJ1BA:Gm7qL08ea0E8XFuY4CkAwxJZGaI2JuHKR56azpB3SGU'; // When not provided in authUrl, a default will be used.
    const ably = new Ably.Realtime(optionalClientId);
    const channel = ably.channels.get('proxy-reverse');

    channel.publish("hello world from server", { message: "Hello world!" });

    return {
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({})
    };
};