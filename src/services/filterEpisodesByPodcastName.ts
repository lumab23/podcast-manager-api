import { repoPodcast } from "../repositories/podcastRepository";
import { PodcastTransferModel } from "../models/podcastTransferModel";
import { StatusCode } from "../utils/statusCode";


export const serviceFilterEpisodesByPodcastName = async (
    podcastName: string | undefined
): Promise<PodcastTransferModel> => {

    // interface de retorno
    let responseFormat : PodcastTransferModel = {
        statusCode : 0,
        body : []
    }

    try {
        const url = new URL(podcastName!, `http://localhost`);
        const queryString = url.searchParams.get("p") || "";
    
        const data = await repoPodcast(queryString);
        const podcastsFiltered = data.filter(podcast => 
            podcast.podcastName.toLowerCase() === queryString.toLowerCase()
        )
    
        // verifica se tem conteúdo
        responseFormat.statusCode = podcastsFiltered.length !== 0 ? StatusCode.OK : StatusCode.NO_CONTENT;
        responseFormat.body = podcastsFiltered;

    } catch (e) {
        console.error("Error filtering podcasts by name: ", e);
        responseFormat.statusCode = StatusCode.INTERNAL_SERVER_ERROR;
        responseFormat.body = [];
    }
    
    
    return responseFormat;
}
