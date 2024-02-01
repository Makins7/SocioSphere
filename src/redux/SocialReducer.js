const initialState = {
  recentComment: {},
  totalLikes: 0,
  commentsList: [],
  currentUser: {}
}

function SocialReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGOUT_USER':
      return { ...state, currentUser: {} };
    case 'LOGIN_USER':
      return { ...state, currentUser: action.user };
    case 'DELETE_COMMENT':
      const updatedComments = state.commentsList.filter(function(comment) {
        console.log('curr comment in iteration', comment);
        // TODO: Better logic on matching comments
        return comment.commentText !== action.deletedComment.commentText;
      });
      return { ...state, commentsList: updatedComments };
    case 'ADD_LIKE':
      return { ...state, totalLikes: state.totalLikes += 1 };
    case 'ADD_COMMENT':
      // Update the state to add the comment
      return { ...state, recentComment: action.addedComment };
    default:
      return initialState;
  }
};

export default SocialReducer;