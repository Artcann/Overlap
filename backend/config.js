const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  port: process.env.PORT || 3000,
  mail: {
    email: process.env.GMAIL_MAIL,
    pass: process.env.GMAIL_PASS
  },
  domains:{
    api: isProduction ? "https://api.overlap-bde.fr" : "http://localhost:3000",
    front: isProduction ? "https://super.overlap-bde.fr" : "http://localhost:8080"
  }
}
