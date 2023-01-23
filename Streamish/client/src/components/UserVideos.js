import { useState, useEffect } from "react";
import { getAllVideosWithComments } from "../modules/videoManager";
import { useParams } from "react-router-dom";
import Video from "./Video";


const UserVideos = () => {
    const [videos, setVideos] = useState([]);
    const { id } = useParams();

    const getVideosByUser = () => {
        getAllVideosWithComments().then(videos => {
            const userVideos = videos.filter(video => video.userProfileId === parseInt(id));
            setVideos(userVideos);
        });
    }

    useEffect(() => {
        getVideosByUser();
    }, []);

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    {videos.map((video) => (
                        <Video video={video} key={video.id} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default UserVideos;