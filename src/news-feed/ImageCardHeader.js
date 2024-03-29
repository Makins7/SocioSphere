import React from 'react';
import { CardHeader } from 'reactstrap';


// The ImageCardHeader component takes a title as props and renders an h3 tag with the image title inside a centered card header.


const ImageCardHeader = ({ title }) => (
  <CardHeader className="text-center" tag="h3">{title}</CardHeader>
);


export default ImageCardHeader;


