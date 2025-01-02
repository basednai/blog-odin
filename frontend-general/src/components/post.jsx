import PropTypes from "prop-types";
import { formatDate } from "../utils/date-formatter";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

export const Post = ({ post, showArrow }) => {
  const [fDate, fTime] = formatDate(post.createdAt);
  const user = post.author?.username || "deleted";

  let navigate = useNavigate();
  const toPost = () => navigate(`/post/${post.id}`);
  const toEdit = (e) => {
    e.stopPropagation()
    navigate(`/post/edit/${post.id}`)
  };
  const toParent = (e) => {
    e.stopPropagation();
    navigate(`/post/${post.parentId}`);
  };

  return (
    <>
      <div
        className="my-5 rounded border p-3 text-center duration-200 hover:-translate-y-2"
        onClick={toPost}
      >
        <div className="text-left">
          <div className="flex">
            <div className="font-semibold">
              {user && "@"}
              {user}
            </div>
            {showArrow && post.type == "comment" && (
              <button className="material-icons ml-auto" onClick={toParent}>
                arrow_back
              </button>
            )}
          </div>
          <div className="text-xs">
            {fTime} {fDate}
          </div>
        </div>
        <div className="prose py-2 text-left">{parse(post.content)}</div>
        <div className="flex gap-x-2 text-left">
          <div className="flex flex-1 gap-1">
            <span className="material-icons">forum</span>
            {post.comments.length}
          </div>
          <div className="flex-0 flex gap-3 items-center">
            <div className="text-xs">
              {post.publish ? "published" : "draft"}
            </div>
            <button className="material-icons" onClick={toEdit}>edit_note</button>
            <button className="material-icons">delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  showArrow : PropTypes.bool
};
