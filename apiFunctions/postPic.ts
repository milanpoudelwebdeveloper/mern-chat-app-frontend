import axios from 'axios'

export const postPic = async (
  uri: string | Blob | File | ProgressEvent<FileReader>
) => {
  return await axios.post('http://localhost:8000/api/uploadImage', {
    image: uri,
  })
}
