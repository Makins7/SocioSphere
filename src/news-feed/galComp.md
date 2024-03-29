import React, { useState, useEffect } from 'react';
import { Alert, FormGroup, Label, Input, Card, CardHeader, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import GalleryItem from './GalleryItem';

const GalleryComponent = () => {
  const [ images, setImages ] = useState([]);
  const [ resultsPerPage, setResultsPerPage ] = useState(0);
  const [ commentsList, setCommentsList ] = useState([]);
  const [ comment, setComment ] = useState({});
  const [ message, setMessage ] = useState();
  const [ commentError, setCommentError ] = useState({});
  const [ likes, setLikes ] = useState({});
  const [ dislikes, setDislikes ] = useState({});
  const dispatcher = useDispatch();
  const user = useSelector(state => state.currentUser);

  useEffect(function() {
    fetch('http://localhost:3001/gallery', {method: 'GET'})
      .then(async (response) => {
        console.log("Successful response", response);
        let imagesFromServer = await response.json(); 
        setImages(imagesFromServer);
        setResultsPerPage(imagesFromServer.length);
      })
      .catch((response) => {
        console.error('Something went wrong with my request', response);
      })
  }, []);

  useEffect(function() {
    if (commentsList.length) setMessage('You have successfully added a comment!');
  }, [commentsList]);

  const handleResultsChange = (event) => {
    const selectedOption = event.target.value;
    setResultsPerPage(selectedOption);
  }

  const prepareImages = () => {
    let stoppingNumber = resultsPerPage;
    if (resultsPerPage > images.length) {
      stoppingNumber = images.length;
    }

    let imageResults = [];
    for(let index = 0; index < stoppingNumber; index++) {
      imageResults.push(images[index]);
    };
    return imageResults;
  }

  const handleCommentSubmit = () => {
    let updatedCommentsList = [ ...commentsList, comment ];
    setCommentsList(updatedCommentsList); 

    dispatcher({
      type: 'ADD_COMMENT', 
      addedComment: comment 
    })
  }

  const handleComment = (pic, event) => {
    let regex = /^(\w|\W){1,20}$/i;
    let userComment = event.target.value; 
    let pictureId = pic.title;
    if (regex.test(userComment)) {
      let updatedComment = {
        commentText: userComment,
        picture: pictureId,
        date: new Date().toLocaleDateString(),
        author: user.username
      }
      setComment(updatedComment);
      setCommentError({ [pictureId]: '' });
    } else {
      setCommentError({ [pictureId]: 'Needs to be between 1 and 20 characters' });
    }
  }

  const prepareComments = (pictureTitle) => {
    const foundComments = commentsList.filter(function(comment) {
      return comment.picture === pictureTitle;
    });
    return foundComments;
  }

  const like = (pictureTitle) => {
    let picLikes = likes[pictureTitle] || 0;
    setLikes(prevState => ({ ...prevState, [pictureTitle]: picLikes += 1}));
    dispatcher({
      type: 'ADD_LIKE'
    });
  }

  const dislike = (pictureTitle) => {
    let picDislikes = dislikes[pictureTitle] || 0;
    setDislikes(prevState => ({ ...prevState, [pictureTitle]: picDislikes += 1}))
  }

  const deleteComment = (commentToDelete) => {
    const updatedComments = commentsList.filter(function(comment) {
      return comment.commentText !== commentToDelete.commentText;
    });
    setCommentsList(updatedComments);

    dispatcher({
      type: 'DELETE_COMMENT',
      deletedComment: commentToDelete
    })
  }

  const editComment = (comment) => {
    //Edit logic
  }

  return (
    <Card>
      <CardHeader>News Feed Gallery</CardHeader>
      <CardBody>
        <FormGroup>
          <Label>Results per page</Label>
          <Input type="select" onChange={handleResultsChange} >
            <option value={images.length}>All</option>
            <option>3</option>
            <option>5</option>
            <option>10</option>
          </Input>
        </FormGroup>

        <p>Showing: {resultsPerPage} Results</p>

        {message && <Alert>{message}</Alert>}

        {prepareImages().map((pic) => 
          <GalleryItem 
            key={pic.title}
            pic={pic}
            handleComment={handleComment}
            handleCommentSubmit={handleCommentSubmit}
            commentValid={commentValid}
            commentError={commentError}
            prepareComments={prepareComments}
            deleteComment={deleteComment}
            editComment={editComment}
            likes={likes}
            dislikes={dislikes}
            like={like}
            dislike={dislike}
          />
        )}
      </CardBody>
    </Card>
  );
}

export default GalleryComponent;