import React from "react";
import { Octokit } from "octokit";
import { Endpoints } from "@octokit/types";
import { InputFormData } from "../Interfaces/Interfaces"

const octokit = new Octokit({
});

export type searchCodeParameters = Endpoints["GET /search/code"]["parameters"];
export type searchCodeResponse = Endpoints["GET /search/code"]["response"];

export const CreateParamaters = (data: InputFormData): searchCodeParameters => {
    let qString = `q=${data.phrase}+user:${data.user}`;
    if (data.language !== "") {
        qString += `+language:${data.language}`;
    }
    return { q: qString, per_page: data.perPage, page: data.page };
}

export const GetSearchCodeData = async (param: searchCodeParameters, setResponseError: React.Dispatch<React.SetStateAction<string>>) => {
    try {
        const response = await octokit.request('GET /search/code', param)
        if (response.status === 200) {
            setResponseError("")
            return response;
        }
    }
    catch (err: any) {
        if (err.message === "Validation Failed: {\"message\":\"Must include at least one user, organization, or repository\",\"resource\":\"Search\",\"field\":\"q\",\"code\":\"invalid\"}")
            setResponseError("User name not found");
        else {
            setResponseError(err.message);
        }

    }
}