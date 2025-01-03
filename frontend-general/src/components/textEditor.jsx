import { useEditor, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import PropTypes from "prop-types";
import Placeholder from "@tiptap/extension-placeholder";
import { useParams, useNavigate } from "react-router-dom";

export const TextEditor = ({ setContent, editContent }) => {
  const { postId } = useParams();
  let navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        // Use a placeholder:
        placeholder: "Write something …",
      }),
      Color,
      TextStyle,
    ],
    content: editContent || "Enter text here :)",
  });

  if (!editor) {
    return null;
  }

  async function sendContent() {
    setContent(editor.getHTML());
  }

  async function draftContent() {
    const fetchData = async () => {
      const data = await fetch(`/api/post/${postId}/draft`, {
        method: "PUT",

        body: JSON.stringify({ content: editor.getHTML() }),
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });
      const json = await data.json();

      return json;
    };

    fetchData()
      .then((data) => {
        navigate(`/post/${data.id}`);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
          <div className="prose space-y-4">
        {/* Toolbar Buttons */}
        <div className="mb-4 space-x-2 space-y-3">
          {/* Bold Button */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`rounded-md px-4 py-2 text-white transition-colors ${editor.isActive("bold") ? "bg-blue-500" : "bg-gray-500"} hover:bg-blue-400`}
          >
            <strong className="text-white">B</strong>
          </button>

          {/* Italic Button */}
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`rounded-md px-4 py-2 text-white transition-colors ${editor.isActive("italic") ? "bg-blue-500" : "bg-gray-500"} hover:bg-blue-400`}
          >
            <em>I</em>
          </button>

          {/* Underline Button */}
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`rounded-md px-4 py-2 text-white transition-colors ${editor.isActive("underline") ? "bg-blue-500" : "bg-gray-500"} hover:bg-blue-400`}
          >
            <u>U</u>
          </button>

          {/* Heading Buttons */}
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`rounded-md px-4 py-2 text-white transition-colors ${editor.isActive("heading", { level: 1 }) ? "bg-green-500" : "bg-gray-500"} hover:bg-green-400`}
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`rounded-md px-4 py-2 text-white transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-green-500" : "bg-gray-500"} hover:bg-green-400`}
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`rounded-md px-4 py-2 text-white transition-colors ${editor.isActive("heading", { level: 3 }) ? "bg-green-500" : "bg-gray-500"} hover:bg-green-400`}
          >
            H3
          </button>
          {/* Bullet Button */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`rounded-md px-4 py-2 text-white transition-colors ${editor.isActive("bold") ? "bg-blue-500" : "bg-gray-500"} hover:bg-blue-400`}
          >
            <strong className="material-icons text-base text-white">
              format_list_bulleted
            </strong>
          </button>

          {/* List Button */}
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`rounded-md px-4 py-2 text-white transition-colors ${editor.isActive("bold") ? "bg-blue-500" : "bg-gray-500"} hover:bg-blue-400`}
          >
            <strong className="material-icons text-base text-white">
              menu
            </strong>
          </button>
          {/* HR Button */}
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={`rounded-md px-4 py-2 text-white transition-colors ${editor.isActive("bold") ? "bg-blue-500" : "bg-gray-500"} hover:bg-blue-400`}
          >
            <strong className="text-base text-white">Horizontal Rule</strong>
          </button>
          {/* Blockquote Button */}
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`rounded-md bg-gray-500 px-4 py-2 text-white transition-colors ${editor.isActive("blockquote") ? "is-active" : ""}`}
          >
            Toggle blockquote
          </button>
        </div>

        {/* Editor Content */}
        <div className="min-h-[200px] rounded-lg border border-gray-300 bg-white p-4">
          <EditorContent editor={editor} />
        </div>

        <div className="flex gap-4">
          <button
            className="rounded-md bg-blue-400 px-4 py-2 text-white transition-colors hover:bg-gray-500"
            onClick={sendContent}
          >
            Submit
          </button>
          <button
            className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-blue-400"
            onClick={draftContent}
          >
            Draft
          </button>
        </div>
      </div>
    </>
  );
};

TextEditor.propTypes = {
  setContent: PropTypes.func,
  setDraft: PropTypes.func,
  editContent: PropTypes.string,
};
