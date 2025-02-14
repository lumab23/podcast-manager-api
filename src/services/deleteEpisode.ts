import fs from "fs/promises"
import path from "path";
import { PodcastTransferModel } from "../models/podcastTransferModel";
import { repoPodcast } from "../repositories/podcastRepository";
import { StatusCode } from "../utils/statusCode";

const episodePathData = path.join(__dirname, "../repositories/podcasts.json");

export const serviceDeleteEpisode = async (
    videoId: string | undefined
) : Promise<PodcastTransferModel> => {

    let responseFormat: PodcastTransferModel = {
        statusCode: 0,
        body: []
    }

    try {
        const data = await repoPodcast();
        const updatedEpisodes = data.filter((episode) => episode.videoId !== videoId);

        if (data.length === updatedEpisodes.length) {
            responseFormat = {
                statusCode: StatusCode.NOT_FOUND,
                body: []
            };

            return responseFormat;
        }

        await fs.writeFile(episodePathData, JSON.stringify(updatedEpisodes, null, 2));

        responseFormat = {
            statusCode: StatusCode.OK,
            body: []
        }

    } catch (error) {
        console.error("Error deleting new episode: ", error);
        responseFormat = {
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            body: []
        }
    }

    return responseFormat;

}