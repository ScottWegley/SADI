import { parse } from 'node-html-parser';
import fetch from 'node-fetch';
import { Colors } from 'discord.js';
import { config } from 'dotenv';
import { makeLog } from '../utils/ColorfulConsole.js';
let lastTitle = '';
config();
const youtubeAPIkey = process.env.SADI_YOUTUBE_KEY;
const notifChannelID = process.env.YTNOTIF_ID;
const authorID = process.env.AUTHOR_ID;
async function ludwigLiveCheck(client) {
    try {
        const today = new Date();
        if (today.getUTCHours() <= 11 || today.getUTCHours() >= 20) { //Between Noon and 3am PST
            const youtubeURLbase = `https://www.googleapis.com/youtube/v3/videos?key=${youtubeAPIkey}&part=liveStreamingDetails,snippet&id=`;
            const c = {
                live: false,
                configured: false,
                vid: '',
                title: '',
                thumbnail: '',
                scheduledStartTime: '',
                actualStartTime: ''
            };
            const canonicalURL = parse(await (await fetch(`https://www.youtube.com/@ludwig/live`))?.text())?.querySelector('link[rel=canonical]')?.getAttribute('href') || "";
            c.live = false;
            c.configured = canonicalURL?.includes('/watch?v=') || false;
            if (c.configured) {
                c.vid = canonicalURL.match(/(?<==).*/)[0];
                const data = await fetch(youtubeURLbase + c.vid).then(response => response.json());
                if (data.error) {
                    console.error(data);
                    process.exit(1);
                }
                const i = data.items.pop();
                c.title = i.snippet.title;
                c.thumbnail = i.snippet.thumbnails.standard.url;
                c.scheduledStartTime = i.liveStreamingDetails.scheduledStartTime;
                c.live = i.liveStreamingDetails.hasOwnProperty('actualStartTime');
                if (c.live) {
                    c.actualStartTime = i.liveStreamingDetails.actualStartTime;
                    if (lastTitle != c.title) {
                        console.log(c);
                        lastTitle = c.title;
                        client.channels.cache.get(notifChannelID).send({
                            embeds: [
                                {
                                    color: Colors.Red,
                                    title: `Ludwig is Live - ${c.title}`,
                                    url: "https://www.youtube.com/@ludwig/live",
                                    image: {
                                        url: c.thumbnail
                                    },
                                    description: `<@${authorID}>`
                                },
                            ]
                        });
                    }
                }
            }
            else {
                makeLog("No Ludwig Stream Scheduled");
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
export { ludwigLiveCheck };
