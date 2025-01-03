import PropTypes from "prop-types";
import { formatDate } from "../utils/date-formatter";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { userCheck } from "../utils/userIdFromJWT";

export const Post = ({ post }) => {
  const [fDate, fTime] = formatDate(post.createdAt);
  const user = post.author?.username || "deleted";

  let navigate = useNavigate();
  const toPost = () => navigate(`/post/${post.id}`);
  const toEdit = (e) => {
    e.stopPropagation();
    navigate(`/post/edit/${post.id}`);
  };
  const { postId } = useParams();
  const parentArrow = postId && post.type == "comment" && post.id == postId;
  const toParent = (e) => {
    e.stopPropagation();
    navigate(`/post/${post.parentId}`);
  };

  const deletePost = async (e) => {
    e.stopPropagation();
    console.log("deleting");

    const postDelete = await fetch(`/api/post/${post.id}/delete`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      method: "DELETE",
    });

    const res = await postDelete.body;
    console.log(res.body);

    navigate(-2);
  };

  const deleteConfirmation = () => document.getElementById("my_modal_1").showModal();


  return (
    <>
      <div
        className="my-5 rounded border p-3 text-center duration-200 hover:-translate-y-2"
        onClick={toPost}
      >
        <div className="text-left">
          <div className="flex justify-between">
            <div className="font-semibold">
              {user && "@"}
              {user}
            </div>
            {parentArrow && (
              <button onClick={toParent} className="material-icons">
                arrow_upward
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
          {userCheck(post.authorId) && (
            <div className="flex-0 flex items-center gap-3">
              <div className="text-xs">
                {post.publish ? "published" : "draft"}
              </div>
              <button className="material-icons" onClick={toEdit}>
                edit_note
              </button>
              {postId == post.id && (
                <button onClick={deleteConfirmation} className="material-icons">
                  delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">
            Are you sure you want to delete?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-blue-400 text-white">Close</button>
              <button onClick={deletePost} className="btn bg-red-600 text-white">Delete Post</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  showArrow: PropTypes.bool,
};
