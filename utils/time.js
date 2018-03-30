function fomater(h) {
  return h < 10 ? '0' + h : h;
}
//分钟循环
function minuteFor(m, mm) {
  for (var i = m; i < 60; i++) {
    if (JSON.stringify(i).indexOf("0") != -1) {
      mm.push(fomater(parseInt(i)))
    }
  }
}
//开始分钟和结束分钟都从0开始至60
function allMinute(context) {
  var m = 0, mm = [];
  minuteFor(m, mm);
  context.setData({
    startMinute: mm,
    endMinute: mm,
    beginM: mm[0],
    endM: mm[0],
    bm: [0],
    em: [0]
  })
}
//开始分钟0至60
function sMinuteFor(context) {
  var m = 0, mm = [];
  minuteFor(m, mm);
  context.setData({
    startMinute: mm,
    beginM: mm[0],
    bm: [0]
  })
}
//开始分钟，当前分钟至60
function sToSixty(context) {
  var timeDate = new Date();
  var m = timeDate.getMinutes();//当前分钟
  var mm = [];
  minuteFor(m, mm);
  context.setData({
    startMinute: mm,
    beginM: mm[0],
    bm: [0]
  })
}
//结束分钟从0至60，默认比起始分钟大30分钟
function eDefaultMinute(context) {
  var m = 0, mm = [];
  minuteFor(m, mm);
  context.setData({
    endMinute: mm,
    endM: mm[3],
    em: [3]
  })
}
//结束分钟加30至60
function eAddToSixty(context) {
  var timeDate = new Date();
  var m = timeDate.getMinutes();
  var mm = [];
  minuteFor(m, mm);
  context.setData({
    endMinute: mm,
    endM: mm[3],
    em: [3]
  })
}
//当开始分钟加30大于60，默认选中大30分钟的值
function eMinuteFor(context) {
  var timeDate = new Date();
  var addm = parseInt(timeDate.getMinutes()) + 30;
  var m = addm - 60;
  var mm = [], nums;
  minuteFor(0, mm);
  if (m == 0) {
    nums = 0;
  } else if (m <= 10) {
    nums = 1;
  } else if (m <= 20) {
    nums = 2;
  }
  context.setData({
    endMinute: mm,
    endM: mm[nums],
    em: [nums]
  })
}
//当前分钟
function minuteNow(context) {
  var timeDate = new Date();
  var m = timeDate.getMinutes();
  var mm = [];
  minuteFor(m, mm)
  context.setData({
    startMinute: mm,
    endMinute: mm,
    beginM: mm[0],
    endM: mm[0],
    bm: [0],
    em: [0]
  })
}
//小时循环
function hourFor(h, hh) {
  for (var i = h; i < 24; i++) {
    hh.push(fomater(parseInt(i)))
  }
}
//开始小时和结束小时都从0开始至24
function allHour(context) {
  var h = 0, hh = [];
  hourFor(h, hh);
  context.setData({
    startHours: hh,
    endHour: hh,
    endH: hh[0],
    beginH: hh[0],
    bh: [0],
    eh: [0]
  })
}
//开始和结束小时，当前时间至24
function sToTF(context) {
  var timeDate = new Date();
  var h = timeDate.getHours();//当前小时
  var hh = [];
  hourFor(h, hh);
  context.setData({
    startHours: hh,
    endHour: hh,
    endH: hh[0],
    beginH: hh[0],
    bh: [0],
    eh: [0]
  })
}
//开始小时，当前时间至24
function startHourTo(context) {
  var timeDate = new Date();
  var h = timeDate.getHours();//当前小时
  var hh = [];
  hourFor(h, hh);
  context.setData({
    startHours: hh,
    beginH: hh[0],
    bh: [0]
  })
}
//结束小时加1至24
function endHourTo(m, context) {
  var timeDate = new Date();
  var h, hh = [];
  if (60 > m + 10 > 50) {
    h = timeDate.getHours() + 1
  } else {
    h = timeDate.getHours()
  }
  hourFor(h, hh);
  context.setData({
    endHour: hh,
    endH: hh[1],
    eh: [1]
  })
}
//开始和结束都加1至24
function allAdd(hour, context) {
  var timeDate = new Date();
  var h = parseInt(timeDate.getHours()) + 1;//当前小时
  var hh = [];
  hourFor(h, hh);
  context.setData({
    startHours: hh,
    endHour: hh,
    beginH: hh[0],
    endH: hh[0],
    bh: [0],
    eh: [0]
  })
}
//当前时间，开始小时/开始分钟/结束小时/结束分钟
function nowDate(context) {
  var timeDate = new Date();
  var m = timeDate.getMinutes();//当前分钟
  var h = timeDate.getHours();//当前小时
  if (h == 23) {
    sToTF(context);
    sToSixty(context);
    minuteNow(context);
  } else {
    if (m > 50) {
      allAdd(h, context);
      sMinuteFor(context);
      eDefaultMinute(context);
    } else {
      if ((m + 30) < 50) {
        sToTF(context)
        sToSixty(context);
        eAddToSixty(context);
      } else {
        endHourTo(m, context);
        startHourTo(context);
        eMinuteFor(context);
        sToSixty(context);
      }
    }
  }
}
//滑动小时的时候
function touchHours(touchH, nums, context) {
  var hh = [];
  hourFor(touchH, hh)
  context.setData({
    endHour: hh,
    beginH: touchH,
    endH: touchH,
    bh: [nums],
    eh: [0],
    em: [0],
    bm: [0]
  })
}
//当前小时+1
function addOne(touchH, context) {
  var timeDate = new Date();
  var m = timeDate.getMinutes();
  var hh = [];
  var temH = touchH + 1;
  if (m >= 50) {
    hourFor(temH, hh)
  } else {
    hourFor(touchH, hh)
  }
  context.setData({
    startHours: hh,
    endHour: hh,
    beginH: hh[0],
    endH: hh[0]
  })
}
//滑动分钟的时候
function touchMinute(minute, nums, context) {
  var tt = [];
  minuteFor(minute, tt)
  context.setData({
    endMinute: tt,
    endM: minute,
    beginM: minute,
    bm: [nums],
    em: [0]
  })
}
//结束分钟0-60
function endSixty(context) {
  var mm = [];
  minuteFor(0, mm);
  context.setData({
    endMinute: mm,
    endM: mm[0],
    em: [0]
  })
}
//变化天数的时候，所有的时间都归零
function selDay(e, context) {
  var dayNow = e.detail.value[0];
  if (dayNow != 0) {
    allHour(context);
    allMinute(context);
  } else {
    nowDate(context);
  }
  context.setData({
    dayStatu: dayNow,
    dayNow: context.data.days[dayNow]
  })
}
//滑动开始小时的时候
function startHour(e, context) {
  var h = context.data.startHours[0];
  var nums = e.detail.value[0];
  var selH = context.data.startHours[nums];
  var hh = [];
  if (context.data.dayStatu != 0) {
    allMinute(context);
    touchHours(selH, nums, context);
  } else {
    if (selH != h) {
      allMinute(context);
      touchHours(selH, nums, context);
    } else {
      minuteNow(context);
      addOne(selH, context)
      context.setData({
        bh: [nums],
        eh: [0],
        em: [0],
        bm: [0]
      })
    }
  }
}
//滑动开始分钟的时候
function startMinte(e, context) {
  var nums = e.detail.value[0];
  var selM = context.data.startMinute[nums];
  var tt = [];
  if (context.data.dayStatu != 0) {
    if (context.data.beginH == context.data.endH) {
      touchMinute(selM, nums, context);
    } else {
      context.setData({
        beginM: selM,
        bm: [nums]
      })
    }
  } else {
    if (context.data.beginH == context.data.endH) {
      touchMinute(selM, nums, context);
    } else {
      context.setData({
        beginM: selM,
        bm: [nums]
      })
    }
  }
}
//滑动结束小时的时候
function endHour(e, context) {
  var h = context.data.endHour[0];
  var nums = e.detail.value[0];
  var selH = context.data.endHour[nums];
  var hh = [];
  if (context.data.dayStatu == 0) {
    if (selH != h) {
      endSixty(context);
      context.setData({
        endH: selH,
        eh: [nums]
      })
    } else {
      context.setData({
        endMinute: context.data.startMinute,
        endM: context.data.startMinute[0],
        endH: selH,
        eh: [nums],
        em: [0],
        bm: [0],
        beginM: context.data.startMinute[0]
      })
    }
  } else {
    if (context.data.beginH != selH) {
      endSixty(context);
      context.setData({
        endH: selH,
        eh: [nums]
      })
    } else {
      allMinute(context);
      context.setData({
        endH: selH,
        eh: [nums],
        bm: [0],
        em: [0]
      })
    }
  }
}
module.exports = {
  nowDate: nowDate,
  startHour: startHour,
  startMinte: startMinte,
  endHour: endHour,
  selDay: selDay
}