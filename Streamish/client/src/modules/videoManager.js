const baseUrl = '/api/video';
const withCommentsUrl = '/api/video/getwithcomments';

export const getAllVideos = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};

export const getAllVideosWithComments = () => {
    return fetch(withCommentsUrl)
        .then(res => res.json())
}

export const getVideo = (id) => {
    return fetch(`${withCommentsUrl}/${id}`).then((res) => res.json());
};

export const addVideo = (video) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(video),
    });
};

export const searchVideos = (searchTerms) => {
    return fetch(`/api/video/search?q=${searchTerms}&sortDesc=true`)
        .then(res => res.json())
}