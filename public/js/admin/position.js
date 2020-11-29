/*
 * @Author: liweilong
 * @Date: 2020-11-29 10:30:36
 */

class Position {
  constructor() {
    this.position_group = $('.position_group')
    this.init()
  }

  init() {
    this.initPositionNode()
    this.listenAddPosition()
  }

  // init position node 
  initPositionNode() {
    this.listenDelPositionNode()
    this.editPosition()
  }

  // listen a node of position
  listenAddPositionNode(position) {
    let nodeHtml = `
    <div class="col-md-2 card_wrap">
        <div class="card card-success">
          <div class="card-header rounded-bottom">
            <h3 class="card-title">${position.name}</h3>
            <div class="card-tools">
              <button type="button" data-id="${position._id}" class="btn del_btn btn-tool" data-card-widget=""><i
                  class="fas fa-times"></i>
              </button>
            </div>
            <!-- /.card-tools -->
          </div>
        </div>
        <!-- /.card -->
      </div>
    `
    this.position_group.append(nodeHtml)
  }

  // del a node of position
  listenDelPositionNode() {
    let self = this
    $('.del_btn').each(function (index, ele) {
      $('.del_btn').eq(index).click(function () {
        let id = $(this).attr('data-id')
        self.removePosition(id, index)
      })
    })
  }

  // listen a operation of add position 
  listenAddPosition() {
    let self = this
    $('.add_position').click(function () {
      popout.prompt({
        type: 'text',
        title: '职位分类',
        placeholder: '请输入你要添加的职位分类',
        confirmButton: '添加',
        cancelButton: '取消'
      }).then(res => {
        if (res.isConfirmed) {
          $.ajax({
            url: '/admin/position/add',
            method: 'post',
            data: {
              name: res.value
            },
            success: function (data) {
              console.log(data);
              if (data.code === 200) {
                popout.success('保存成功')
                self.listenAddPositionNode(data.data)
                self.initPositionNode()
              } else {
                popout.error(data.msg)
              }
            }
          })
        }
      })
    })
  }

  // listen a operation of remove
  removePosition(id, index) {
    popout.confirm({
      title: '你确认要删除该职位分类吗？',
    }).then(result => {
      if (result.isConfirmed) {
        $.ajax({
          url: '/admin/position/del',
          method: 'post',
          data: {
            id: id
          },
          success: function (data) {
            if (data.code === 200) {
              popout.success(data.msg)
              $('.card_wrap').eq(index).hide()
            } else {
              popout.error(data.msg)
            }
          }
        })
      }
    })
  }

  // listen a event of edit position
  editPosition() {
    $('.card_wrap').dblclick(function() {
      let _this = this
      let id = $(_this).find('.del_btn').attr('data-id')
      let oldValue = $(_this).find('.card-title').text()
      popout.prompt({
        type: 'text',
        title: '请编辑职位分类',
        value: oldValue,
        confirmButton: '编辑',
      }).then(result => {
        if (result.isConfirmed) {
          $.ajax({
            url: '/admin/position/edit',
            method: 'post',
            data: {
              id: id,
              name: result.value
            }, 
            success: function(res) {
              if (res.code === 200) {
                popout.success('编辑成功')
                $(_this).find('.card-title').text(res.data.name)
              } else {
                popout.error(res.msg)
              }
            }
          })
        }
      })
    })
  }
}


new Position()