class Dep {
  constructor () {
    this.subs = new Set()
  }

  addSub (sub) {
    if (!this.subs.has(sub)) {
      this.subs.add(sub)
    }
  }

  removeSub (sub) {
    this.subs.delete(sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    const subs = this.subs.keys()
    for (let sub of subs) {
      sub.update()
    }
  }
}

Dep.target = null
const targetStack = []

function pushTarget (_target) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

function popTarget () {
  Dep.target = targetStack.pop()
}

module.exports = {
  pushTarget,
  popTarget,
  Dep
}