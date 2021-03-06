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
    default: ''
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
    default: 0
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
  desc_color: {
    type: String,
    default: '#ffffff'
  },
  btn_text: {
    type: String,
    required: true,
  },
  link_url: {
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
  link_url: {
    type: String,
    required: true
  },
  part_title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
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

// 职位分类模式类型
const positionSchema = {
  name: {
    type: String,
    required: true
  }
}

// jobcontent mode
const jobcontentSchema = {
  job_title: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  job_content: {
    type: String,
    default: ''
  },
  job_require: {
    type: String,
    default: ''
  },
  company: {
    type: String,
    default: ''
  },
  cates: {
    type: Array,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  wage: {
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
  bannerJobSchema,
  positionSchema,
  jobcontentSchema
}