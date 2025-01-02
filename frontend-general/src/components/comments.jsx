import PropTypes from "prop-types";
import { Post } from "./post";

export const Comments = ({ comments }) => {


  return (
    <>
      <div className="container mx-auto w-4/5">
        {comments.map((comment, i) => {
          return (
            <Post
              key={i}
              post={comment}
              showArrow={false}
            />
          );
        })}
      </div>
    </>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};
