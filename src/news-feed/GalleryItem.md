import React from 'react';
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, FormFeedback, FormGroup, Input, Row } from 'reactstrap';


/*
This component handles the rendering of individual gallery items, including the image, title, likes, comments, etc. 
This abstraction simplifies the Gallery component and improves code reuse.
*/



const GalleryItem = ({ pic, handleComment, handleCommentSubmit, commentValid, commentError, prepareComments, deleteComment, editComment, likes, dislikes, like, dislike }) => {
  return (
    <Card key={pic.title} className="gallery-card mb-4">
      <CardHeader className="text-center" tag="h3">{pic.title}</CardHeader>
      <CardBody>
        <Row>
          <Col>
            <img width="300" height="200" src={pic.image} alt={pic.title} />
            <div className="likes mt-1">
              <ButtonGroup>
                <Button onClick={() => like(pic.title)} color="primary"><i className="fa-solid fa-thumbs-up"></i>{likes[pic.title]}</Button>
                <Button onClick={() => dislike(pic.title)} color="danger"><i className="fa-solid fa-thumbs-down"></i>{dislikes[pic.title]}</Button>
              </ButtonGroup>
            </div>
          </Col>
          <Col>
            <Card className="comments" style={{overflowY: 'scroll', height: '200px'}}>
              <CardHeader tag="h6">Comments</CardHeader>
              <CardBody>
                {prepareComments(pic.title).map(function(comment) {
                  return <figure>
                    <blockquote className='blockquote'>
                      <em>{comment.commentText}</em>&nbsp;&nbsp;
                      <Button onClick={() => deleteComment(comment)} color="danger" size="sm">X</Button>
                      &nbsp;<Button onClick={() => editComment(comment)} color="info" size="sm"><i className="fa-solid fa-pencil"></i></Button>
                    </blockquote>
                    <figcaption className='blockquote-footer'>{comment.author} - {comment.date}</figcaption>
                  </figure>
                })}
              </CardBody>
            </Card>
          </Col>
          <Col>
            <FormGroup>
              <Label>Add Comment</Label>
              <Input { ...commentValid } type="textarea" onChange={(event) => handleComment(pic, event)} />
              <FormFeedback>{commentError[pic.title]}</FormFeedback>
            </FormGroup>
            <Button disabled={!!commentError[pic.title]} className="float-end" color="success" onClick={handleCommentSubmit}>Submit</Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default GalleryItem;


















// import React, { useState } from "react";
// import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";

// const GalleryItem = ({ pic }) => {
//   // State for likes and dislikes count
//   const [likes, setLikes] = useState(0);
//   const [dislikes, setDislikes] = useState(0);

//   // Handlers for like and dislike buttons
//   const handleLike = () => {
//     setLikes(likes + 1);
//   };

//   const handleDislike = () => {
//     setDislikes(dislikes + 1);
//   };

//   return (
//     <Card className="gallery-card mb-4">
//       <CardHeader className="text-center">{pic.title}</CardHeader>
//       <CardBody>
//         <Row>
//           <Col xs="6" sm="4">
//             <img src={pic.image} alt={pic.title} style={{ width: "100%" }} />
//             <div className="mt-2">
//               {/* Like and dislike buttons */}
//               <Button color="primary" onClick={handleLike}>
//                 Like ({likes})
//               </Button>{" "}
//               <Button color="danger" onClick={handleDislike}>
//                 Dislike ({dislikes})
//               </Button>
//             </div>
//           </Col>
//           <Col xs="6" sm="8">
//             {/* Placeholder for Comments Section */}
//             <p>Comments section can be another component here.</p>
//             {/* Implementing comments would involve creating another component that handles displaying and adding comments. */}
//           </Col>
//         </Row>
//       </CardBody>
//     </Card>
//   );
// };



// export default GalleryItem;










