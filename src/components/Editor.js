import React, { useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const toolbarOptions = [
  // custom button values
  [{ size: ["small", false, "large", "huge"] }],
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["clean"], // remove formatting button
  ["link", "video", "image"],
];
const Editor = ({ content, setContent, readOnly }) => {
  const quillRef = useRef(null);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  function imageHandler() {
    const tooltip = this.quill.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;
    tooltip.save = function () {
      const range = this.quill.getSelection(true);
      const value = this.textbox.value;
      if (value) {
        this.quill.insertEmbed(range.index, "image", value, "user");
      }
    };

    tooltip.hide = function () {
      tooltip.save = originalSave;
      tooltip.hide = originalHide;
      tooltip.hide();
    };
    tooltip.edit("image");
    tooltip.textbox.placeholder = "Image URL";
  }

  return (
    <ReactQuill
      forwardedRef={quillRef}
      theme={readOnly ? "bubble" : "snow"}
      value={content}
      onChange={setContent}
      readOnly={readOnly}
      modules={modules}
    />
  );
};

export default Editor;
