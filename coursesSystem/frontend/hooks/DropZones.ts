"use client";

import { useCallback } from "react";

import { useDropzone } from "react-dropzone";

const useVideoDropZone = () => {
  const onDrop = useCallback((acceptedFiles: any) => {}, []);
  const dropzoneProps = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mkv", ".mp4"],
    },
    maxFiles: 1,
  });

  return {
    getVideoRootProps: dropzoneProps.getRootProps,
    getVideoInputProps: dropzoneProps.getInputProps,
    isVideoDragActive: dropzoneProps.isDragActive,
    acceptedVideoFiles: dropzoneProps.acceptedFiles,
  };
};

const useImageDropZone = () => {
  const onDrop = useCallback((acceptedFiles: any) => {}, []);
  const dropzoneProps = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpeg"],
    },
    maxFiles: 1,
  });

  return {
    getImageRootProps: dropzoneProps.getRootProps,
    getImageInputProps: dropzoneProps.getInputProps,
    isImageDragActive: dropzoneProps.isDragActive,
    acceptedImageFiles: dropzoneProps.acceptedFiles,
  };
};

export { useVideoDropZone, useImageDropZone };
