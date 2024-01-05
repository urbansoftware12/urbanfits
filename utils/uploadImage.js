import axios from "axios"

const uploadImage = async (file, fileName, folder) => {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/S3/signed-url?folder=${folder}&fileName=${fileName}`)
        await axios.put(data.uploadUrl, file)
        return `/${folder}/${fileName}`
    } catch (error) { console.log(error); }
}
export default uploadImage