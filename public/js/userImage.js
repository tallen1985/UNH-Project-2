var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: 'hokdebgd8',
    uploadPreset: 'userImage',
  },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      console.log('Done! Here is the image info: ', result.info);
      updateUserImage(result.info.url);
    }
  }
);

const updateUserImage = async (url) => {
  const sendUrl = await fetch('/api/user/image-upload', {
    method: 'POST',
    body: JSON.stringify({ url }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (sendUrl.ok) {
    console.log('successfully Sent');
  } else {
    console.log('error');
  }
  document.location.reload();
};

document.getElementById('upload_widget').addEventListener(
  'click',
  function () {
    myWidget.open();
  },
  false
);
