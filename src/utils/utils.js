export const apiURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://vast-bastion-34313.herokuapp.com";

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
