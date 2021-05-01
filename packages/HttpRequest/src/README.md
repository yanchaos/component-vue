### Description
* 在全局安装组件之后，request会挂载到Vue的prototype上$HttpRequest。
安装完成后可使用```this.$Http.request.get```或```this.$Http.request.post```发起请求。