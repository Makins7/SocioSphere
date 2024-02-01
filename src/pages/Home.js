import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';

function Home() {

  // Access the state from Redux
  const recentComment = useSelector(function(state) {
    // grab what you need from the state
    return state.recentComment;
  });

  const totalLikes = useSelector(function(state) {
    // grab what you need from the state
    return state.totalLikes;
  });

  return (
    <div>
      <Card id="my-container" data-target="1" className="social-networking-container">
        <CardHeader className="text-center" tag="h1">View Recent Activity</CardHeader>
        <CardBody className="text-center">
          { /* Show most recent comment and how many likes in a day */}
          <section>
            <p>Most Recent Comment:</p>
            <figure>
              <blockquote className='blockquote'><em>{recentComment.commentText}</em></blockquote>
              <figcaption className='blockquote-footer'>{recentComment.date}</figcaption>
            </figure>

            <p>Total Likes:</p>
            <p>{totalLikes}</p>
          </section>
        </CardBody>
      </Card>
    </div>
  );
}

// export { Title, Home }; // explicit export, must be called by name when importing
export default Home; // implicit, doesn't care about the name of your import
