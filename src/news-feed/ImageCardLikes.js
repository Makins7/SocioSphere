import React from 'react';
import { ButtonGroup, Button } from 'reactstrap';


// ImageCardLikes: This component provides the logic and layout for displaying likes and dislikes.


const ImageCardLikes = ({ pictureTitle, likes, dislikes, like, dislike }) => (
  <div className="likes mt-1">
    <ButtonGroup>
      <Button onClick={() => like(pictureTitle)} color="primary">
        <i className="fa-solid fa-thumbs-up"></i>{likes[pictureTitle]}
      </Button>
      <Button onClick={() => dislike(pictureTitle)} color="danger">
        <i className="fa-solid fa-thumbs-down"></i>{dislikes[pictureTitle]}
      </Button>
    </ButtonGroup>
  </div>
);



export default ImageCardLikes;



