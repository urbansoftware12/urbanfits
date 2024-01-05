const ifExists = (data, return_type) => {
    if (data) return data
    if (return_type === false) return false
    if (return_type !== false) return return_type
    else return ""
}
export default ifExists