import axios from "axios";

const apiInstance = axios.create({});

export const apiConnector = (method, url, bodyData,  headers, params ) => {
    return apiInstance({
        method:method,
        url:url,
        data:bodyData ? bodyData : null,
        header:headers ? headers : null,
        params: params ? params : null,
    })
}