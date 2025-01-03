import PropTypes from "prop-types";
import { Post } from "./post";
import { dateTimeSort } from "../utils/date-sort";

export const Comments = ({ comments }) => {


  return (
    <>
      <div className="container mx-auto w-4/5">
        {dateTimeSort(comments).map((comment, i) => {
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
