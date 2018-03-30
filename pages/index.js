var times = require('../utils/time.js');
const app = getApp();
Page({
  data: {
    sleTimeShow: false,
    days: ["今天", "明天", "后天"],
    startHours: [],
    startMinute: [],
    endHour: [],
    endMinute: [],
    dayStatu: "",
    dayNow: "",
    beginH: "",
    beginM: "",
    endH: "",
    endM: "",
    bh: [0],
    bm: [0],
    eh: [0],
    em: [0]
  },
  onLoad(options) {
    times.nowDate(this);
    this.setData({ dayNow: "今天" });
  },
  //变化天数的时候，所有的时间都归零
  selDay: function (e) {
    times.selDay(e, this)
  },
  //滑动开始小时的时候
  startHour: function (e) {
    times.startHour(e, this)
  },
  //滑动开始分钟的时候
  startMinte: function (e) {
    times.startMinte(e, this)
  },
  //滑动结束小时的时候
  endHour: function (e) {
    times.endHour(e, this)
  },
  //滑动结束分钟的时候
  endMinute: function (e) {
    var nums = e.detail.value[0];
    var selM = this.data.endMinute[nums];
    this.setData({
      endM: selM
    })
  },
  sureTime: function () {
    if (this.data.beginH == this.data.endH) {
      if (this.data.beginM == this.data.endM) {
        wx.showToast({
          title: '开始时间和结束时间不能相同',
          icon: 'none',
          duration: 1500
        })
        return;
      }
    }
    this.setData({
      sleTimeShow: false
    })
  },
  openTimes: function () {
    this.setData({
      sleTimeShow: true
    })
  },
  colseTime: function () {
    times.nowDate(this);
    this.setData({
      sleTimeShow: false,
      dayStatu: 0,
      dayNow: "今天"
    })
  },
  estop: function () { }
})
