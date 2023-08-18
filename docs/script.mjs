// import { Types } from "ably/promises";
// import * as Ably from "ably/promises";

(async () => {
    const optionalClientId = "mCWdHA.ttJ1BA:Gm7qL08ea0E8XFuY4CkAwxJZGaI2JuHKR56azpB3SGU"; // When not provided in authUrl, a default will be used.
    const ably = new window.Ably.Realtime.Promise({ authUrl: `/api/ably-token-request?clientId=${optionalClientId}` });

    const channel = ably.channels.get("proxy-reverse");

    await channel.subscribe((msg) => {
        console.log("Ably message received", msg);
        document.getElementById("response").innerHTML += "<br />" + JSON.stringify(msg);
    });
})();

export { };
