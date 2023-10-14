import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default class Create extends Component {
  <template>
    <input
      class="new-todo"
      aria-label="What needs to be done?"
      placeholder="What needs to be done?"
      autofocus
      {{on 'keydown' this.createTodo}}
    >
  </template>

  @service repo;

  createTodo = (event) => {
    let { keyCode, target } = event;
    let value = target.value.trim();

    if (keyCode === 13 && !isBlank(value)) {
      this.repo.add({ title: value, completed: false });
      target.value = '';
    }
  }
}
