/**
 * 标题 页面白屏时间
 * 描述
 * 创建日期 2017/6/20 下午1:18
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */


function whiteScreenTime () {
  var timing = performance.timing
  return timing.domLoading - timing.navigationStart
}

console.log(whiteScreenTime())