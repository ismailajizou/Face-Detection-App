export const apiURL = "https://vast-bastion-34313.herokuapp.com";


export const calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimg');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol : clarifaiFace.left_col * width,
    topRow : clarifaiFace.top_row * height,
    rightCol : width - (clarifaiFace.right_col *width),
    bottomRow : height - (clarifaiFace.bottom_row * height)
  }
}

export const ImgSrc = (user) => {
  return `data:image/(png|jpg);base64,${arrayBufferToBase64(user.profileimage.data)}`
}

export const arrayBufferToBase64 = ( buffer ) => {
    let bytes = new Uint8Array( buffer );
    return btoa(
      bytes.reduce((data, byte) => data + String.fromCharCode(byte), '')
   );
}
