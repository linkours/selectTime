function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function checkPhone(nums){
  var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!reg.test(nums)) {
    return false;
  } else {
    return true;
  }
}
function driveRoutes(context,datas){
  wx.request({
    url: 'http://apis.map.qq.com/ws/direction/v1/driving/',
    method: "GET",
    data: datas,
    success: function (result) {
      //console.info(result)
      var coors = result.data.result.routes[0].polyline;
      for (var i = 2; i < coors.length; i++) {
        coors[i] = coors[i - 2] + coors[i] / 1000000
      }
      var b = [];
      for (var i = 0; i < coors.length; i = i + 2) {
        b[i / 2] = {
          latitude: coors[i], longitude: coors[i + 1]
        }
      }
      context.setData({
        polyline: [{
          points: b,
          color: "#297acc",
          width: 6,
          dottedLine: false
        }],
      })
    }
  })
}
module.exports = {
  formatTime: formatTime,
  checkPhone: checkPhone,
  driveRoutes: driveRoutes
}
