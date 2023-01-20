import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { addVideo, getAllVideosWithComments } from "../modules/videoManager";


const VideoForm = ({ setVideos }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    const navigate = useNavigate();

    const handleTitleInput = (event) => {
        setTitle(event.target.value);
    }

    const handleDescriptionInput = (event) => {
        setDescription(event.target.value);
    }

    const handleUrlInput = (event) => {
        setUrl(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const video = {
            title: title,
            description: description,
            url: url
        }

        addVideo(video).then((p) => {
            // Navigate the user back to the home route
            navigate("/");
        });

    }


    return (
        <div className="container">
            <h2>Add a Video</h2>
            <Form>
                <FormGroup>
                    <Label htmlFor="title">Title</Label>
                    <Input onChange={handleTitleInput} value={title} type="text" name="title" id="title" required></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <Input onChange={handleDescriptionInput} value={description} type="text" name="description" id="description"></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="url">Video URL</Label>
                    <Input onChange={handleUrlInput} value={url} type="url" name="url" id="url" required></Input>
                </FormGroup>
                <Button onClick={handleSubmit}>Submit</Button>
            </Form>
        </div >
    )
}

export default VideoForm;