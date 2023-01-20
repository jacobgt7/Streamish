import React, { useEffect, useState } from "react";
import Video from './Video';
import { getAllVideos, getAllVideosWithComments, searchVideos } from "../modules/videoManager";
import { FormGroup, Form, Input, Button } from "reactstrap";
import VideoForm from "./VideoForm";

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [searchText, setSearchText] = useState("");

    // const getVideos = () => {
    //     getAllVideos().then(videos => setVideos(videos));
    // };

    const getVideosWithComments = () => {
        getAllVideosWithComments().then(videos => setVideos(videos));
    }

    useEffect(() => {
        getVideosWithComments();
    }, []);

    const handleSearchButton = (event) => {
        event.preventDefault();

        searchVideos(searchText).then(videos => setVideos(videos));
    }

    const handleSearchInput = (event) => {
        setSearchText(event.target.value)
    }

    return (
        <>
            <div className="container">
                <Form>
                    <FormGroup>
                        <Input onChange={handleSearchInput} type="text" name="search" id="search" />
                        <Button onClick={handleSearchButton}>Search</Button>
                    </FormGroup>
                </Form>
                <div className="row justify-content-center">
                    {videos.map((video) => (
                        <Video video={video} key={video.id} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default VideoList;