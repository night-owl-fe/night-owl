module.exports = `
<wxs src="../../templates/dynamic/dynamic.wxs" module="dynamic" />
<view bindtap="onReportPSA" data-psa="a300">
  <include src="../../templates/dynamic/dynamic.wxml"/>

  <navigator wx:if="{{isAdmin}}" url="setting/setting">
    <view class="{{isEdit ? 'dy-quitEdit-btn' : 'dy-Edit-btn'}}"></view>
  </navigator>
</view>
`