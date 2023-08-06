import { useCallback, useEffect, useRef } from "react";
import { BsUpload } from "react-icons/bs";
import "../utils/dropzone.css";

let counter = 0;

const Dropzone = ({ setUploadedFiles }) => {
  const dropzoneRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!counter) {
      counter += 1;
      const classNames = dropzoneRef.current.className.split(" ");
      classNames.push("dropzone-drag-over");
      dropzoneRef.current.className = classNames.join(" ");
    }
  }, []);
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDragLeave = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.relatedTarget === dropzoneRef.current.parentElement) {
        counter = 0;
        const classNames = dropzoneRef.current.className.split(" ");
        dropzoneRef.current.className = classNames.filter((value) => value !== "dropzone-drag-over").join(" ");
      }
    },
    [dropzoneRef]
  );
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      counter = 0;
      const classNames = dropzoneRef.current.className.split(" ");
      dropzoneRef.current.className = classNames.filter((value) => value !== "dropzone-drag-over").join(" ");
      Array.from(e.dataTransfer.files).forEach((file) => {
        setUploadedFiles((prev) => {
          if (prev.map((value) => value.name).includes(file.name)) return prev;
          else {
            return [...prev, file];
          }
        });
      });
    },
    [setUploadedFiles]
  );
  const handleClick = useCallback((e) => {
    fileInputRef.current.click();
  }, []);

  useEffect(() => {
    dropzoneRef.current.addEventListener("dragenter", handleDragEnter);
    dropzoneRef.current.addEventListener("dragover", handleDragOver);
    dropzoneRef.current.addEventListener("dragleave", handleDragLeave);
    dropzoneRef.current.addEventListener("drop", handleDrop);
    dropzoneRef.current.addEventListener("click", handleClick);
  }, [handleDragEnter, handleDragOver, handleDragLeave, handleDrop, handleClick]);

  return (
    <>
      <div
        ref={dropzoneRef}
        className="w-1/2 h-24 bg-gray-100 rounded-lg mt-4 flex items-center justify-center space-x-4 border-2 border-dashed hover:border-green-700 transition cursor-pointer"
      >
        <BsUpload />
        <p>파일 업로드</p>
      </div>
      <input
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple={true}
        type={"file"}
        onChange={(e) => {
          Array.from(e.target.files).forEach((file) => {
            setUploadedFiles((prev) => {
              if (prev.map((value) => value.name).includes(file.name)) return prev;
              else {
                return [...prev, file];
              }
            });
          });
        }}
      />
    </>
  );
};

export default Dropzone;
