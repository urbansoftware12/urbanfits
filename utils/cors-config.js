import Cors from 'cors'

const cors = Cors({
    methods: ['POST', 'GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS'],
    origin: ["https://st.urbanfits.ae", "https://admin.urbanfits.ae", "http://localhost:3001", "http://localhost:3000"]
    // origin: "*"
})

const CorsMiddleware = (req, res) => {
    return new Promise((resolve, reject) => {
        cors(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default CorsMiddleware