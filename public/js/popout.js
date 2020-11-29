/*
 * @Author: liweilong
 * @Date: 2020-11-28 21:05:45
 */

window.popout = {
  prompt(options) {
    return Swal.fire({
      input: options.type,
      inputLabel: options.title ? options.title : '',
      showCancelButton: true,
      reverseButtons: true,
      inputValue: options.value ? options.value : '',
      inputPlaceholder: options.placeholder,
      confirmButtonText: options.confirmButton ? options.confirmButton : '保存',
      cancelButtonText: options.cancelButton ? options.cancelButton : '取消'
    })
  },

  // a confirm dialog
  confirm(options) {
    return Swal.fire({
      title: options.title,
      text: options.text ? options.text : '',
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: options.confirmButton ? options.confirmButton : '确认',
      cancelButtonText: options.cancelButton ? options.cancelButton : '取消'
    })
  },
  
  // dialog success
  success(title) {
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1000
    })
  },

  // dialog error
  error(title) {
    Swal.fire({
      icon: 'error',
      title: title,
      showConfirmButton: false,
      timer: 1000
    })
  }
}