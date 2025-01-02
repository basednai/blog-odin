import { useEditor, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import PropTypes from "prop-types";
import Placeholder from "@tiptap/extension-placeholder";

export const TextEditor = ({setContent}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        // Use a placeholder:
        placeholder: 'Write something …',
      }),
      Color,
      TextStyle,
    ],
    content: 'Test Post from React 2 :)',
  });

  if (!editor) {
    return null;
  }

  async function sendContent() {
    setContent(editor.getHTML())
  }

  return (
    <div className="prose space-y-4">
      <h2 className="text-xl font-semibold">New Post</h2>

      {/* Toolbar Buttons */}
      <div className="mb-4 space-x-2">
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
          <strong className="material-icons text-base text-white">menu</strong>
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
        {/* Color Picker */}
        <button className="rounded-md bg-gray-500 py-2 text-white transition-colors">
          <label className="px-4 py-4">
            Text Color
            <input
              type="color"
              onChange={(event) =>
                editor.chain().focus().setColor(event.target.value).run()
              }
              className="invisible h-0 w-0"
              // value={editor.getAttributes("textStyle").color}
              data-testid="setColor"
            />
          </label>
        </button>

        <button
          className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors"
          onClick={() => editor.chain().focus().unsetColor().run()}
          data-testid="unsetColor"
        >
          Unset color
        </button>
      </div>

      {/* Editor Content */}
      <div className="min-h-[200px] rounded-lg border border-gray-300 bg-white p-4">
        <EditorContent editor={editor} />
      </div>

      <button
        className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-blue-400"
        onClick={sendContent}
      >
        Submit
      </button>
    </div>
  );
};

TextEditor.propTypes = {
  setContent: PropTypes.func
}