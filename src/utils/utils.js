export const apiURL = (process.env.NODE_ENV === "development") ? "http://localhost:3000" : "https://vast-bastion-34313.herokuapp.com";

export const getDetectedFaces = (data) => data.outputs[0].data.regions;

export const getBoundingBox = (face) => {
  const { left_col, top_row, right_col, bottom_row } = face;
  const image = document.getElementById('inputimg');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol : left_col * width,
    topRow : top_row * height,
    rightCol : width - (right_col * width),
    bottomRow : height - (bottom_row * height)
  }
}