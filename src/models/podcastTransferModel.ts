import { Podcast } from "./podcastModel";

export interface PodcastTransferModel {
    statusCode: number,
    body: Podcast[]
}