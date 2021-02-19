export const apiURL = "https://vast-bastion-34313.herokuapp.com";

export const ImgSrc = (user) => {
  return `data:image/(png|jpg);base64,${arrayBufferToBase64(user.profileimage.data)}`
}
const arrayBufferToBase64 = ( buffer ) => {
    let binary = '';
    let bytes = new Uint8Array( buffer );
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa(binary);
  }
export default arrayBufferToBase64;