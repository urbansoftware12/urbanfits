import axios from "axios"

const uploadImage = async (file, fileKey) => {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/S3/signed-url?file_key=${fileKey}`)
        await axios.put(data.uploadUrl, file)
        return '/' + fileKey
    } catch (error) { console.log(error); }
}
export default uploadImage