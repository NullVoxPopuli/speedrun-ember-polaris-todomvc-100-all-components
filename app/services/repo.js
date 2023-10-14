import { uniqueId } from '@ember/helper';
import Service from '@ember/service';

import { TrackedMap,TrackedObject } from 'tracked-built-ins';

function load() {
  let list = JSON.parse(localStorage.getItem('todos') || '[]');

  return list.reduce((indexed, todo) => {
    indexed.set(todo.id, new TrackedObject(todo));

    return indexed;
  }, new TrackedMap());
}

function save(indexedData) {
  let data = [...indexedData.values()];

  localStorage.setItem('todos', JSON.stringify(data));
}

export default class Repo extends Service {
  data = null;

  load = () => {
    this.data = load();
  }

  get all() {
    return [...this.data.values()]
  }

  get completed() {
    return this.all.filter(todo => todo.completed);
  }

  get active() {
    return this.all.filter(todo => !todo.completed);
  }

  get remaining() {
    return this.active;
  }

  add = (attrs) => {
    let newId = uniqueId();

    this.data.set(newId, new TrackedObject({ ...attrs, id: newId}));
    this.persist();
  };


  delete = (todo) => {
    this.data.delete(todo.id);
    this.persist();
  }

  clearCompleted = () => {
    this.completed.forEach(this.delete);
  }

  persist = () => {
    save(this.data);
  }
}
