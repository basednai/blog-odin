import PropTypes from "prop-types";
import { formatDate } from "../utils/date-formatter";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser'

export const Post = ({ post }) => {


    const [fDate, fTime] = formatDate(post.createdAt);
    const user = post.author?.username || "deleted";

    let navigate = useNavigate()
    const toPost = () => navigate(`/post/${post.id}`)


  return (
    <>
      <div className=" my-5 rounded border p-3 text-center" onClick={toPost}>
        <div className="text-left">
          <div className="font-semibold">
            {user && "@"}
            {user}
          </div>
          <div className="text-xs">
            {fTime} {fDate}
          </div>
        </div>
        <div className="text-left py-2 prose">{parse(post.content)}</div>
        <div className="text-left flex gap-x-2">
                  <span className="material-icons text-s">forum</span>

        {post.comments.length}
        </div>
      </div>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

