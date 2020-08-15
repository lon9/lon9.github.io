const fs = require('fs')
const axios = require('axios')
const toIco = require('to-ico')
const sharp = require('sharp')

const main = async () => {
  let res = await axios.get(
    `https://api.github.com/users/${process.env.USER_NAME}`
  )
  res = await axios
    .get(res.data.avatar_url, {
      responseType: 'arraybuffer',
      headers: {
        ContentType: 'image/png',
      },
      params: {
        s: '256',
      },
    })
    .catch((err) => console.error(err))

  const img = await sharp(Buffer.from(res.data)).png().toBuffer()
  const buf = await toIco([img], {
    resize: true,
  })
  fs.writeFileSync('static/favicon.ico', buf, 'binary')
}

main()
