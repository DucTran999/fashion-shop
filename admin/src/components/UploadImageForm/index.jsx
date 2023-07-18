import React, { useState, useEffect } from "react";

import API_URL from "../../api/endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import classNames from "classnames/bind";
import style from "./UploadImageForm.module.scss";
const cx = classNames.bind(style);

const UploadAndDisplayImage = ({ parentGetImageList }) => {
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);
  const [message, setMessage] = useState();

  const axiosPrivate = useAxiosPrivate();

  // Upload file to server
  const callApiUploadImg = async (payload) => {
    try {
      const res = await axiosPrivate.post(
        `${API_URL.uploads}/product-gallery`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage(res.data.message);
    } catch (error) {
      if (!error?.response) {
        setMessage("Server not response!");
      } else {
        setMessage(error.response.data.message);
      }
    }
  };

  const handleUploadImages = (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("proImages", image);
    });
    callApiUploadImg(formData);
  };

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];

    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);

    parentGetImageList(images);
    // eslint-disable-next-line
  }, [images]);

  const onImageChange = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <>
      <form
        onSubmit={(e) => handleUploadImages(e)}
        className={cx("upload-img-form-wrap")}
        encType="multipart/form-data"
      >
        <input
          className={cx("browse-btn")}
          type="file"
          accept="image/*"
          multiple
          onChange={onImageChange}
        />
        <div className={cx("img-gallery")}>
          {imageURLS.map((imageSrc, idx) => (
            <div key={idx} className={cx("img-gallery__item")}>
              <img src={imageSrc} alt="not fount" width={"200px"} />
            </div>
          ))}
        </div>
        {images.length > 0 && (
          <input type="submit" value="Upload" className={cx("submit-btn")} />
        )}
      </form>
      <div>Upload Image: {message}</div>
    </>
  );
};

export default UploadAndDisplayImage;
