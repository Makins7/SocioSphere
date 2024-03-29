/*
This component handles the rendering of individual gallery items, including the image, title, likes, comments, etc. 
This abstraction simplifies the Gallery component and improves code reuse.
*/



import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";



const GalleryItem = ({ pic }) => {

  return (
    <Card className="gallery-card mb-4">

      <CardHeader className="text-center">{pic.title}</CardHeader>

      <CardBody>
        <Row>
          <Col>
            <img src={pic.image} alt={pic.title} style={{ width: '100%' }}/>
            {/* Implement Like and dislike buttons here */}
          </Col>

          <Col>
            {/* Comments section can be another component */}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};



export default GalleryItem;


