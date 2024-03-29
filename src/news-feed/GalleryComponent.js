import React from "react";
import useFetchGallery from "../hooks/useFetchGallery";
import ImageCard from "./ImageCard";
import { Card, CardHeader, CardBody, Alert } from "reactstrap";


// GalleryComponent: This is the main component that sets up the layout for your gallery.


const GalleryComponent = () => {
  const { images, resultsPerPage, error } = useFetchGallery();

  if (error) {
    return <Alert color="danger" role="alert"> Error: {error.message}</Alert>;
  }

  return (
    <Card>
      <CardHeader role="heading" aria-level="1">News Feed Gallery</CardHeader>
      <CardBody role="region" aria-labelledby="gallery-region">
        <p id="gallery-region">Showing: {resultsPerPage} Results</p>
        {images.map(pic => (
          <ImageCard key={pic.id} image={pic}/>
        ))}
      </CardBody>
    </Card>
  );
};

export default GalleryComponent;







