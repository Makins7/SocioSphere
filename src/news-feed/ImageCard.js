import React from 'react';
import { Card } from 'reactstrap';
import ImageCardHeader from './ImageCardHeader';
import ImageCardBody from './ImageCardBody';


// ImageCard: This component includes ImageCardHeader, ImageCardBody, ImageCardLikes, and ImageCardComments. It's tasked with the layout and logic for individual images in the gallery



const ImageCard = ({ image, comments, handleComment, handleCommentSubmit, commentError, like, dislike }) => (
  <Card key={image.title} className="gallery-card mb-4">
    <ImageCardHeader title={image.title} />

    <ImageCardBody
      image={image}
      comments={comments}
      handleComment={handleComment}
      handleCommentSubmit={handleCommentSubmit}
      commentError={commentError}
      like={like}
      dislike={dislike}
    />
  </Card>
);

export default ImageCard;
