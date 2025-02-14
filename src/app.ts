import * as http from "http";
import { addEpisode, deleteEpisode, getEpisodeById, getFilterEpisodes, getListEpisodes } from "./controllers/podcastsController";
import { Routes } from "./routes/routes";
import { HttpMethod } from "./utils/httpMethods";

export const app = async (
    req: http.IncomingMessage, res: http.ServerResponse
) => {

    const baseUrl = req.url?.split("?")[0];

    if (req.method === HttpMethod.GET && baseUrl === Routes.LIST) {
        await getListEpisodes(req, res);
    }

    if (req.method === HttpMethod.GET && baseUrl === Routes.PODCAST ) {
        await getFilterEpisodes(req, res);
    }

    if (req.method === HttpMethod.GET && baseUrl === Routes.EPISODE) {
        await getEpisodeById(req, res);
    }

    if (req.method === HttpMethod.POST && baseUrl === Routes.ADD_EPISODE) {
        await addEpisode(req, res);
    }

    if (req.method === HttpMethod.DELETE && baseUrl === Routes.DELETE_EPISODE) {
        await deleteEpisode(req, res);
    }

}