// https://tech.meituan.com/hunt-sdk-practice.html
// https://help.aliyun.com/document_detail/60288.html?spm=a2c4g.11186623.6.564.iZAErV
//
function SystemInfo () {

}

function GlobalErrorMonitor () {

}

function PerfMonitor () {

}

function APIMonitor () {

}

function getOS () {
  const os = navigator.platform
  const userAgent = navigator.userAgent
  if (!os) return 'Other'
  const osIs = type => os.indexOf(type) > -1
  const winIs = type => userAgent.indexOf(type) > -1

  if (osIs('Win')) {
    if (winIs('Windows 8')) {
      return 'Win8'
    } else if (winIs('Windows NT 6.1') || winIs('Windows 7')) {
      return 'Win7'
    } else if (winIs('Windows NT 6.0')) {
      return 'WindowsVista'
    } else if (winIs('Windows NT 5.2')) {
      return 'Win2003'
    } else if (winIs('Windows NT 5.1')) {
      return 'WinXP'
    } else if (winIs('Windows NT 5.0')) {
      return 'Win2000'
    } else {
      return 'Other'
    }
  } else if (osIs('Mac')) {
    return 'Mac'
  } else if (osIs('X11')) {
    return 'Unix'
  } else if (osIs('Linux')) {
    return 'Linux'
  }
  return 'Other'
}

function getUserExplorer (userAgent) {
  var info = ''
  var tempArray = ''
  if (/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)) {
    tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent)
    info += tempArray[1] + tempArray[2]
  } else if (/MSIE \d+\.\d+/.test(userAgent)) {
    tempArray = /MS(IE) (\d+\.\d+)/.exec(userAgent)
    info += tempArray[1] + tempArray[2]
  } else if (/[Cc]hrome\/\d+/.test(userAgent)) {
    tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent)
    info += tempArray[1] + tempArray[2]
  } else if (/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)) {
    tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(userAgent)
    info += tempArray[3] + tempArray[1]
  } else if (/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)) {
    tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent)
    info += tempArray[1] + tempArray[2]
  } else {
    info += 'unknown'
  }
  return info
}

module.exports = {
  getUserExplorer
}