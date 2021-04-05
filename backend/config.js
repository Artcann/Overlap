const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  port: process.env.PORT || 3000,
  mail: {
    email: process.env.GMAIL_MAIL,
    pass: process.env.GMAIL_PASS
  },
  domains:{
    api: isProduction ? "https://apioverlap.ponsaille.com" : "http://localhost:3000",
    front: isProduction ? "https://overlap.ponsaille.com" : "http://localhost:8080"
  }
}
