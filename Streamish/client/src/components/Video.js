import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const Video = ({ video }) => {
    return (
        <Card >
            <p className="text-left px-2">Posted by: <Link to={`/users/${video.userProfile.id}`} >{video.userProfile.name}</Link></p>
            <CardBody>
                <iframe className="video"
                    src={video.url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen />

                <p>
                    <strong><Link to={`/videos/${video.id}`}>{video.title}</Link></strong>
                </p>
                <p>{video.description}</p>
                {video.comments?.map(
                    comment => <p key={comment.id} >Comment: "{comment.message}"</p>
                )}
            </CardBody>
        </Card>
    );
};

export default Video;