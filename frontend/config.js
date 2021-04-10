const isProduction = process.env.NODE_ENV === 'production'

export default {
  domains:{
    api: isProduction ? "https://api.overlap-bde.fr" : "http://localhost:3000",
    front: isProduction ? "https://super.overlap-bde.fr" : "http://localhost:8080"
  }
}
