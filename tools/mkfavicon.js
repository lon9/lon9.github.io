const fs = require('fs');
const axios = require('axios');
const toIco = require('to-ico');

const main = async () =>  {
  let res = await axios.get(`https://api.github.com/users/${process.env.USER_NAME}`);
  res = await axios.get(res.data.avatar_url, {
    responseType: 'arraybuffer',
    headers: {
      'ContentType': 'image/png'
    },
    params: {
      's': '256'
    }
  }).catch((err) => console.error(err));
  const files = [Buffer.from(res.data)];
  const buf = await toIco(files, {
    resize: true
  });
  fs.writeFileSync('static/favicon.ico', buf, 'binary');
}

main();