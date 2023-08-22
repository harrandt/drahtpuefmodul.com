import { apiClient } from "./api-client"
import {VersionDetails} from "@oh/shared/models"
import { route } from "./util";
export const getVersions = (): Promise<VersionDetails> => {
    return apiClient.get<VersionDetails>(route('version')).then((response) => response.data);
};