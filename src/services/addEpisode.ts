import path from "path";
import fs from "fs/promises"; 
import { PodcastTransferModel } from "../models/podcastTransferModel";
import { Podcast } from "../models/podcastModel";
import { repoPodcast } from "../repositories/podcastRepository";
import { StatusCode } from "../utils/statusCode";

const podcastPathData = path.join(__dirname, "../repositories/podcasts.json");

export const serviceAddNewEpisode = async (
    newEpisode: Podcast
): Promise<PodcastTransferModel> => {

    let responseFormat: PodcastTransferModel = {
        statusCode: 0,
        body: []
    };

    try {
        const data = await repoPodcast();
        const episodeExists = data.some((episode) => episode.videoId === newEpisode.videoId);

        if (episodeExists) {
            responseFormat = {
                statusCode: StatusCode.CONFLICT,
                body: []
            };

            return responseFormat;
        }

        data.push(newEpisode);
        await fs.writeFile(podcastPathData, JSON.stringify(data, null, 2)); 

        responseFormat = {
            statusCode: StatusCode.CREATED,
            body: [newEpisode]
        }

    } catch (error) {
        console.error("Error adding new episode: ", error);
        responseFormat = {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: []
        }
    }

    return responseFormat;
}