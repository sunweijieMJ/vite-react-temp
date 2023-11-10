import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

/* eslint-disable import/no-mutable-exports */

/**
 * antd的静态方法message(可消费上下文)
 */
let message: MessageInstance;
/**
 * antd的静态方法notification(可消费上下文)
 */
let notification: NotificationInstance;
/**
 * antd的静态方法modal(可消费上下文)
 */
let modal: Omit<ModalStaticFunctions, 'warn'>;

/**
 * antd的静态方法包装(可消费上下文)
 */
const StaticFunction = () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  return null;
};

export default StaticFunction;

export { message, notification, modal };
