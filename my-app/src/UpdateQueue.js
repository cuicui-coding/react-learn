export class Update {
  constructor(payload) {
    this.payload = payload
  }
}

// 更新队列是单链表的数据结构
export class UpdateQueue {
  constructor() {
    this.firstUpdate = null
    this.lastUpadate = null
  }
  enqueueUpdate(update) {
    if (this.lastUpadate) {
      this.firstUpdate = this.lastUpadate = update
    } else {
      this.lastUpadate.nextUpdate = update
      this.lastUpadate = update
    }
  }
  forceUpdate(state) {
    let currentUpdate = this.firstUpdate
    while (currentUpdate) {
      let nextState =
        typeof currentUpdate === 'function'
          ? currentUpdate.payload(state)
          : currentUpdate.payload
      state = { ...state, ...nextState }
      currentUpdate = currentUpdate.nextUpdate;
    }
    this.firstUpdate = this.lastUpadate = null;
    return state
  }
}
