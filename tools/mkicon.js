const axios = require('axios')
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
        s: '1024',
      },
    })
    .catch((err) => console.error(err))
  await sharp(Buffer.from(res.data))
    .resize(1024)
    .png()
    .toFile('static/icon.png', (err, info) => {
      if (err) console.error(err)
    })
}

main()
