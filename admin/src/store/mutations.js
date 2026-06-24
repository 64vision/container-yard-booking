export const set = property => (state, payload) => (state[property] = payload)

export const toggle = property => state => (state[property] = !state[property])

export default {
  setDrawer: set('drawer'),
  setLoggedIn: set('isLoggedIn'),
  showAlert: set('show_alert'),
  setAlertColor: set('alert_color'),
  setAlertText: set('alert_text'),
  setSalesSummaries: set('sales_summaries'),
  setWinSummaries: set('win_summaries')
}
