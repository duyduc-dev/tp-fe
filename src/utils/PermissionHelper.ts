class PermissionHelper {
  requestNotification() {
    return Notification.requestPermission();
  }
}

export default new PermissionHelper();
