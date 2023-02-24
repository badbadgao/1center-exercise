import * as React from 'react';
import ProfileImgPlaceHolder from 'assets/images/profileplaceholder.png';
import { useState, useEffect } from 'react';

const imageType = /image\/(png|jpg|jpeg)/i;

interface IImageLoaderProps {
  imgFileDataURL: string;
  setImgFileDataURL: (dataURL: string) => void;
}

const ImageLoader = ({ imgFileDataURL, setImgFileDataURL }: IImageLoaderProps): JSX.Element => {
  const [imgFile, setImgFile] = useState<File>();
  useEffect(() => {
    let fileReader: FileReader;
    let isCancel = false;
    if (imgFile) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target?.result && !isCancel) {
          setImgFileDataURL(e.target?.result as string);
        }
      };
      fileReader.readAsDataURL(imgFile);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [imgFile]);

  return (
    <div className="userProfile__imgupload">
      <img className="userProfile__img" src={imgFileDataURL || ProfileImgPlaceHolder} alt="profil-image" />
      <input
        accept="image/*"
        type="file"
        id="imgInp"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file?.type.match(imageType)) {
            console.error('Image type is not valid');
            return;
          }
          setImgFile(file);
        }}
      />
    </div>
  );
};

export default ImageLoader;
