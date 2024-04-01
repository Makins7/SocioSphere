<!-- Original Gallery.js below (before any changes) -->


import React, { useState, useEffect } from 'react';
import { Alert, FormGroup, Label, Input, Card, CardHeader, CardBody, Row, Col, Button, ButtonGroup, FormFeedback } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

/*
  1. useState (State management and component lifecycles)
  2. useEffect
  3. Props
  4. Redux
*/

/* React
 To use a component, you must render it

 <Example></Example> = Example(); // Render

 Example changes to return ['d', 'e', 'f'];
 
 function Example() {
   return ['d', 'e', 'f'];
 }

 How would we show the new results of D E F?

 <Example /> = Example(); Must call the function to get the new results

 For every change to the function's output, we must re-render our component:
 <Example /> = Example();
 Example();
 Example();

*/

const Gallery = () => {

  /* 
    useState() hook: Special function that helps us set state in our component
    Returns an array with 2 elements:
      1. The data you're tracking
      2. A function that sets your data
        - React will re-render your component every time your data changes
  */

  useEffect(function() {
    // Go grab the images from the server
    fetch('http://localhost:3001/gallery', {method: 'GET'})
      .then(async (response) => {
        // Handle a succesful response
        // Get access to the data
        console.log("Successful response", response);
        let imagesFromServer = await response.json(); // Reads the JSON response from the server

        setImages(imagesFromServer);
        setResultsPerPage(imagesFromServer.length);
      })
      .catch((response) => {
        // Error handling
        console.error('Something went wrong with my request', response);
      })
    
    // rest of my code doesn't stop
  }, []) // first render

  const [ images, setImages ] = useState([]);

  const [ resultsPerPage, setResultsPerPage ] = useState(0);

  /* Track comments using state */
  const [ commentsList, setCommentsList ] = useState([]);

  /* Track a single comment */
  const [ comment, setComment ] = useState({});

  /* Track messages */
  const [ message, setMessage ] = useState();

  /* Comment errors */
  const [ commentError, setCommentError ] = useState({});

  /* Track likes */
  const [ likes, setLikes ] = useState({});
  const [ dislikes, setDislikes ] = useState({});

  /* Get the dispatcher */
  const dispatcher = useDispatch();

  const user = useSelector(state => state.currentUser);

  /*
    useEffect() hook: 
      - Triggers upon component side effects
        - Example effect: Component re-renders

    Syntax: Takes two arguments
      1. Callback function: This is your side effect function
      2. Dependencies:
        - [comment, resultsPerPage]: When any of our listed dependencies change
        - []: Only on the very first render
        - null/undefined: Every render
  */

  useEffect(function() {
    if (commentsList.length) setMessage('You have successfully added a comment!');
  }, [commentsList]);

  const handleResultsChange = (event) => {
    // this function gets called every time the dropdown selection changes
    console.log('event is', event);
    const selectedOption = event.target.value;

    // Update the state 'resultsPerPage'
    setResultsPerPage(selectedOption);
  }

  const prepareImages = () => {
    console.log('images while Im preparing', images);
    let stoppingNumber = resultsPerPage;
    if (resultsPerPage > images.length) {
      stoppingNumber = images.length;
    }

    // Loop over the images until we reach the 'resultsPerPage' number
    let imageResults = [];
    for(let index = 0; index < stoppingNumber; index++) {
      imageResults.push(images[index]);
    };
    // console.log('image results', imageResults);
    return imageResults;
  }

  const handleCommentSubmit = () => {
    // Add the entered comment into our list of comments, managed by our state

    /*
      Spread syntax (...): A way of extracting ("spread") information out of an array or object

      let fruits = ['apple', 'banana', 'kiwi'];

      let newFruits = [];
      newFruits.push(fruits[0])
      newFruits.push(fruits[1])

      let newFruits = [ ...fruits, 'strawberry' ];
    */

    let updatedCommentsList = [ ...commentsList, comment ];

    setCommentsList(updatedCommentsList); // add user's comment into list

    // Update the comment as the most recent comment in our Redux Store
    // The dispatcher is responsible for sending our Action to our Store
    dispatcher({
      type: 'ADD_COMMENT', // Must require a "type" property, an identifier for your action
      addedComment: comment // Pass along the added comment
    })
  }

  const handleComment = (pic, event) => {
    let regex = /^(\w|\W){1,20}$/i;

    let userComment = event.target.value; // capture the text from the comment box
    let pictureId = pic.title;

    if (regex.test(userComment)) {
      console.log('User comment is valid!');
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

    // Add my like count to redux
    dispatcher({
      type: 'ADD_LIKE'
    });
  }

  const dislike = (pictureTitle) => {
    let picDislikes = dislikes[pictureTitle] || 0;
    setDislikes(prevState => ({ ...prevState, [pictureTitle]: picDislikes += 1}))
  }

  const deleteComment = (commentToDelete) => {
    console.log('comment to delete', commentToDelete);
    
    const updatedComments = commentsList.filter(function(comment) {
      console.log('curr comment in iteration', comment);
      // TODO: Better logic on matching comments
      return comment.commentText !== commentToDelete.commentText;
    });
    setCommentsList(updatedComments);

    dispatcher({
      type: 'DELETE_COMMENT',
      deletedComment: commentToDelete
    })
  }

  const editComment = (comment) => {

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

        { prepareImages().map(function(pic) {
          const commentValid = commentError[pic.title] ? { invalid: true } : { valid: true };
          return (
            <Card key={pic.title} className="gallery-card mb-4">
              <CardHeader className="text-center" tag="h3">{pic.title}</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <img width="300" height="200" src={pic.image} />
                    <div className="likes mt-1">
                      <ButtonGroup>
                        <Button onClick={() => like(pic.title)} color="primary">
                          <i className="fa-solid fa-thumbs-up"></i>{likes[pic.title]}
                        </Button>
                        <Button onClick={() => dislike(pic.title)} color="danger">
                          <i className="fa-solid fa-thumbs-down"></i>{dislikes[pic.title]}
                        </Button>
                      </ButtonGroup>
                    </div>
                  </Col>
                  <Col>
                    <Card className="comments" style={{overflowY: 'scroll', height: '200px'}}>
                      <CardHeader tag="h6">Comments</CardHeader>
                      <CardBody>
                      {/* Comments List goes here */}
                      {/* Loop over comments */}
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
        }) }
      </CardBody>
    </Card>
  );
};

export default Gallery;




















import React, { useState, useEffect } from 'react';
import { Alert, FormGroup, Label, Input, Card, CardHeader, CardBody, Row, Col, Button, ButtonGroup, FormFeedback } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

/*
  1. useState (State management and component lifecycles)
  2. useEffect
  3. Props
  4. Redux
*/

/* React
 To use a component, you must render it

 <Example></Example> = Example(); // Render

 Example changes to return ['d', 'e', 'f'];
 
 function Example() {
   return ['d', 'e', 'f'];
 }

 How would we show the new results of D E F?

 <Example /> = Example(); Must call the function to get the new results

 For every change to the function's output, we must re-render our component:
 <Example /> = Example();
 Example();
 Example();

*/

const Gallery = () => {

  /* 
    useState() hook: Special function that helps us set state in our component
    Returns an array with 2 elements:
      1. The data you're tracking
      2. A function that sets your data
        - React will re-render your component every time your data changes
  */

  useEffect(function() {
    // Go grab the images from the server
    fetch('http://localhost:3001/gallery', {method: 'GET'})
      .then(async (response) => {
        // Handle a succesful response
        // Get access to the data
        console.log("Successful response", response);
        let imagesFromServer = await response.json(); // Reads the JSON response from the server

        setImages(imagesFromServer);
        setResultsPerPage(imagesFromServer.length);
      })
      .catch((response) => {
        // Error handling
        console.error('Something went wrong with my request', response);
      })
    
    // rest of my code doesn't stop
  }, []) // first render

  const [ images, setImages ] = useState([]);

  const [ resultsPerPage, setResultsPerPage ] = useState(0);

  /* Track comments using state */
  const [ commentsList, setCommentsList ] = useState([]);

  /* Track a single comment */
  const [ comment, setComment ] = useState({});

  /* Track messages */
  const [ message, setMessage ] = useState();

  /* Comment errors */
  const [ commentError, setCommentError ] = useState({});

  /* Track likes */
  const [ likes, setLikes ] = useState({});
  const [ dislikes, setDislikes ] = useState({});

  /* Get the dispatcher */
  const dispatcher = useDispatch();

  const user = useSelector(state => state.currentUser);

  /*
    useEffect() hook: 
      - Triggers upon component side effects
        - Example effect: Component re-renders

    Syntax: Takes two arguments
      1. Callback function: This is your side effect function
      2. Dependencies:
        - [comment, resultsPerPage]: When any of our listed dependencies change
        - []: Only on the very first render
        - null/undefined: Every render
  */

  useEffect(function() {
    if (commentsList.length) setMessage('You have successfully added a comment!');
  }, [commentsList]);

  const handleResultsChange = (event) => {
    // this function gets called every time the dropdown selection changes
    console.log('event is', event);
    const selectedOption = event.target.value;

    // Update the state 'resultsPerPage'
    setResultsPerPage(selectedOption);
  }

  const prepareImages = () => {
    console.log('images while Im preparing', images);
    let stoppingNumber = resultsPerPage;
    if (resultsPerPage > images.length) {
      stoppingNumber = images.length;
    }

    // Loop over the images until we reach the 'resultsPerPage' number
    let imageResults = [];
    for(let index = 0; index < stoppingNumber; index++) {
      imageResults.push(images[index]);
    };
    // console.log('image results', imageResults);
    return imageResults;
  }

  const handleCommentSubmit = () => {
    // Add the entered comment into our list of comments, managed by our state

    /*
      Spread syntax (...): A way of extracting ("spread") information out of an array or object

      let fruits = ['apple', 'banana', 'kiwi'];

      let newFruits = [];
      newFruits.push(fruits[0])
      newFruits.push(fruits[1])

      let newFruits = [ ...fruits, 'strawberry' ];
    */

    let updatedCommentsList = [ ...commentsList, comment ];

    setCommentsList(updatedCommentsList); // add user's comment into list

    // Update the comment as the most recent comment in our Redux Store
    // The dispatcher is responsible for sending our Action to our Store
    dispatcher({
      type: 'ADD_COMMENT', // Must require a "type" property, an identifier for your action
      addedComment: comment // Pass along the added comment
    })
  }

  const handleComment = (pic, event) => {
    let regex = /^(\w|\W){1,20}$/i;

    let userComment = event.target.value; // capture the text from the comment box
    let pictureId = pic.title;

    if (regex.test(userComment)) {
      console.log('User comment is valid!');
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

    // Add my like count to redux
    dispatcher({
      type: 'ADD_LIKE'
    });
  }

  const dislike = (pictureTitle) => {
    let picDislikes = dislikes[pictureTitle] || 0;
    setDislikes(prevState => ({ ...prevState, [pictureTitle]: picDislikes += 1}))
  }

  const deleteComment = (commentToDelete) => {
    console.log('comment to delete', commentToDelete);
    
    const updatedComments = commentsList.filter(function(comment) {
      console.log('curr comment in iteration', comment);
      // TODO: Better logic on matching comments
      return comment.commentText !== commentToDelete.commentText;
    });
    setCommentsList(updatedComments);

    dispatcher({
      type: 'DELETE_COMMENT',
      deletedComment: commentToDelete
    })
  }

  const editComment = (comment) => {

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

        { prepareImages().map(function(pic) {
          const commentValid = commentError[pic.title] ? { invalid: true } : { valid: true };
          return (
            <Card key={pic.title} className="gallery-card mb-4">
              <CardHeader className="text-center" tag="h3">{pic.title}</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <img width="300" height="200" src={pic.image} />
                    <div className="likes mt-1">
                      <ButtonGroup>
                        <Button onClick={() => like(pic.title)} color="primary">
                          <i className="fa-solid fa-thumbs-up"></i>{likes[pic.title]}
                        </Button>
                        <Button onClick={() => dislike(pic.title)} color="danger">
                          <i className="fa-solid fa-thumbs-down"></i>{dislikes[pic.title]}
                        </Button>
                      </ButtonGroup>
                    </div>
                  </Col>
                  <Col>
                    <Card className="comments" style={{overflowY: 'scroll', height: '200px'}}>
                      <CardHeader tag="h6">Comments</CardHeader>
                      <CardBody>
                      {/* Comments List goes here */}
                      {/* Loop over comments */}
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
        }) }
      </CardBody>
    </Card>
  );
};

export default Gallery;

