const userAgentTxt = require('./useragent')
const getUserExplorer = require('./index').getUserExplorer

userAgentTxt.split(/\n/).forEach(function (item) {
  if (item.trim()) {
    console.log(getUserExplorer(item))
  }
})