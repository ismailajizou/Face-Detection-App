export const apiURL = (process.env.NODE_ENV === "development") ? "http://localhost:3000" : "https://vast-bastion-34313.herokuapp.com";

export const calculateFaceLocation = (data) => {
  return data.outputs[0].data.regions[0].region_info.bounding_box;
}

export const getBoundingBox = (face) => {
  const image = document.getElementById('inputimg');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol : face.left_col * width,
    topRow : face.top_row * height,
    rightCol : width - (face.right_col * width),
    bottomRow : height - (face.bottom_row * height)
  }
}