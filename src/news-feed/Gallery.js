import React from "react";
import useFetchGallery from "../hooks/useFetchGallery";
import GalleryItem from "./GalleryItem";
import { Card, CardHeader, CardBody, Alert } from "reactstrap";



const Gallery = () => {
  const { images, resultsPerPage, error } = useFetchGallery();

  if (error) {
    return <Alert color="danger"> Error: {error.message}</Alert>;
  }

  return (
    <Card>
      <CardHeader>News Feed Gallery</CardHeader>
      <CardBody>
        <p>Showing: {resultsPerPage} Results</p>
        {images.map(pic => (
          <GalleryItem key={pic.title} pic={pic}/>
        ))}
      </CardBody>
    </Card>
  );
};



export default Gallery;

