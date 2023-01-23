import { getToken } from "./authManager";

const baseUrl = '/api/video';
const withCommentsUrl = '/api/video/getwithcomments';

export const getAllVideos = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
    })
};

export const getAllVideosWithComments = () => {
    return getToken().then((token) => {
        return fetch(withCommentsUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
    })
}

export const getVideo = (id) => {
    return getToken().then((token) => {
        return fetch(`${withCommentsUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    })
};

export const addVideo = (video) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(video),
        });
    })
};

export const searchVideos = (searchTerms) => {
    return getToken().then((token) => {
        return fetch(`/api/video/search?q=${searchTerms}&sortDesc=true`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => res.json())
    })
}