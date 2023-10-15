import { isNullOrUndef } from './is';

export function setupDialog(NDialog) {
  NDialog.confirm = function (option = {}) {
    console.log(option);
    const showIcon = !isNullOrUndef(option.title);
    return NDialog[option.type || 'warning']({
      showIcon,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: option.confirm,
      onNegativeClick: option.cancel,
      onMaskClick: option.cancel,
      ...option,
    })
  }

  return NDialog
}