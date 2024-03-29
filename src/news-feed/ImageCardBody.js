import React from 'react';
import { CardBody, Row, Col } from 'reactstrap';
import ImageCardLikes from './ImageCardLikes';
import ImagesCardComments from './ImagesCardComments';


// ImageCardBody: It correctly receives the necessary props and diligently hands over the required roles to ImageCardLikes and ImagesCardComments.


const ImageCardBody = ({ image, likes, dislikes, like, dislike }) => (
  <CardBody>
    <Row>
      <Col>
        <img width="300" height="200" src={image.image} />
        <ImageCardLikes 
          pictureTitle={image.title}
          likes={likes}
          dislikes={dislikes}
          like={like}
          dislike={dislike}
        />
      </Col>
      <ImagesCardComments image={image} />
    </Row>
  </CardBody>
);



export default ImageCardBody;



