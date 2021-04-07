const isProduction = process.env.NODE_ENV === 'production'

export default {
  domains:{
    api: isProduction ? "https://apioverlap.ponsaille.com" : "http://localhost:3000",
    front: isProduction ? "https://overlap.ponsaille.com" : "http://localhost:8080"
  }
}
