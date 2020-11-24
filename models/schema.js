/*
 * @Author: liweilong
 * @Date: 2020-11-24 09:49:20
*/
// 头部滚动模式类型
const topHeaderSchema = {
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  created_time: {
    type: String,
    default: Date.now
  }
}

// 高薪兼职模式类型
const headerTitleSchema = {
  title: {
    type: String,
    required: true
  },
  img_url: {
    type: String,
    required: true
  },
  link_url: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  created_time: {
    type: String,
    default: Date.now
  }
}

// 滚动图片模式类型
const bannerActivesSchema = {
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  btn_text: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true
  },
  bg_color: {
    type: String,
    default: '#ffffff'
  },
  created_time: {
    type: String,
    default: Date.now
  }
}

// 轮播图（大牌兼职工作）
const bannerJobSchema = {
  title: {
    type: String,
    required: true,
  },
  title_image_url: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  part_title: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: false,
  },
  wage: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  created_time: {
    type: String,
    default: Date.now
  }
}


module.exports = {
  topHeaderSchema,
  headerTitleSchema,
  bannerActivesSchema,
  bannerJobSchema
}