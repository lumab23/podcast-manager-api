import { PodcastTransferModel } from "../models/podcastTransferModel";
import { repoPodcast } from "../repositories/podcastRepository";
import { StatusCode } from "../utils/statusCode";


export const serviceFilterEpisodesById = async (
    videoId: string | undefined
): Promise<PodcastTransferModel> => {

    let responseFormat : PodcastTransferModel = {
        statusCode : 0,
        body: []
    }

    if (!videoId) {
        return { statusCode: StatusCode.NO_CONTENT, body: [] };
    }
    const data = await repoPodcast();
    const episode = data.find((podcast) => podcast.videoId === videoId);

    responseFormat = {
        statusCode: episode ? StatusCode.OK : StatusCode.NO_CONTENT,
        body: episode ? [episode] : []
    }

    return responseFormat;

}