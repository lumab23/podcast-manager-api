import { IncomingMessage, ServerResponse } from "http";
import { serviceListEpisodes } from "../services/listEpisodesService";
import { serviceFilterEpisodesByPodcastName } from "../services/filterEpisodesByPodcastName";
import { ContentType } from "../utils/content";
import { PodcastTransferModel } from "../models/podcastTransferModel";
import { serviceFilterEpisodesById } from "../services/filterEpisodesById";
import { Podcast } from "../models/podcastModel";
import { serviceAddNewEpisode } from "../services/addEpisode";
import { serviceDeleteEpisode } from "../services/deleteEpisode";


export const getListEpisodes = async (
    req: IncomingMessage, res: ServerResponse
) => {
    const content: PodcastTransferModel = await serviceListEpisodes();

    res.writeHead(content.statusCode, {"Content-type": ContentType.JSON});
    res.write(JSON.stringify(content.body))
    res.end();
}


export const getFilterEpisodes = async(
    req: IncomingMessage, 
    res: ServerResponse
) => {

    
    const content: PodcastTransferModel = await serviceFilterEpisodesByPodcastName(req.url);


    res.writeHead(content.statusCode, {"Content-type": ContentType.JSON});
    res.write(JSON.stringify(content.body))
    res.end();
}

export const getEpisodeById = async (
    req: IncomingMessage,
    res: ServerResponse
) => {

    const url = new URL(req.url!, `http://${req.headers.host}`);
    const videoId = url.searchParams.get("videoId") || "";
    const content: PodcastTransferModel = await serviceFilterEpisodesById(videoId);

    res.writeHead(content.statusCode, {"Content-type": ContentType.JSON});
    res.write(JSON.stringify(content.body));
    res.end();
    
}


export const addEpisode = async (
    req: IncomingMessage,
    res: ServerResponse
) => {

    let body = "";

    req.on("data", (chunk) =>  {
        body += chunk.toString();
    });

    req.on("end", async () => {
        const newEpisode: Podcast = JSON.parse(body);
        const content: PodcastTransferModel = await serviceAddNewEpisode(newEpisode);

        res.writeHead(content.statusCode, {"Content-type": ContentType.JSON});
        res.write(JSON.stringify(content.body));
        res.end();
    });

}

export const deleteEpisode = async (
    req: IncomingMessage,
    res: ServerResponse
) => {

    const url = new URL(req.url!, `http://${req.headers.host}`);
    let videoId = url.searchParams.get("videoId") || "";

    const content: PodcastTransferModel = await serviceDeleteEpisode(videoId);

    res.writeHead(content.statusCode, { "Content-Type": ContentType.JSON });
    res.write(JSON.stringify(content.body));
    res.end();

}