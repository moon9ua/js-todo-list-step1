const $inputTodoNewTitle = document.querySelector('#new-todo-title');
const $ulTodoList = document.querySelector('#todo-list');
const $spanTodoCounter = document.querySelector('.todo-count');
const $ulFilterList = document.querySelector('.filters');

const liTemplateList = [];

const todoListCounter = () => {
  const count = $ulTodoList.querySelectorAll('li').length;
  $spanTodoCounter.querySelector('strong').textContent = count;
};

const todoListAddTitle = ({ key }) => {
  if (key === 'Enter' && $inputTodoNewTitle.value.length !== 0) {
    let template = renderNewToDoTemplate($inputTodoNewTitle.value, false);
    liTemplateList.push($inputTodoNewTitle.value);
    console.log(liTemplateList);
    $ulTodoList.insertAdjacentHTML('beforeend', template);
    $inputTodoNewTitle.value = '';
    todoListCounter();
  }
};

const removeClassList = (target) => {
  target.closest('li').classList.remove('editing');
};

const handleInputKey = (target, key, temp) => {
  if (key === 'Escape') {
    removeClassList(target);
  } else if (key === 'Enter') {
    removeClassList(target);
    target.parentNode.querySelector('label').textContent = target.value;
  }
};

const todoListOnToggle = ({ target }) => {
  if (target.className === 'toggle') {
    target.closest('li').classList.toggle('completed');
  } else if (target.className === 'destroy') {
    target.closest('li').remove();
    todoListCounter();
  }
};

const todoListDoubleClickedOnToggle = ({ target }) => {
  if (target.nodeName === 'LABEL') {
    const temp = target.closest('label').textContent;
    target.closest('li').classList.toggle('editing');
    const $inputEdit = target.closest('.editing').querySelector('.edit');
    $inputEdit.value = temp;
    $inputEdit.addEventListener('keyup', (e) => {
      handleInputKey(e.target, e.key, temp);
    });
  }
};

const getTodoFilter = ({ target }) => {
  // console.log(target.className);
  if (target.className === 'all selected') {
    console.log(target.className);
  } else if (target.className === 'active') {
    console.log(target.className);
  } else if (target.className === 'completed') {
    console.log(target.className);
  }
};

const renderNewToDoTemplate = (title, status) => {
  return ` <li class=${status ? 'completed' : ''}>
                    <div class="view">
                        <input class="toggle" type="checkbox" ${
                          status ? 'checked' : ''
                        }>
                        <label class="label">${title}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="새로운 타이틀">
                </li>`;
};

$inputTodoNewTitle.addEventListener('keyup', todoListAddTitle);
$ulTodoList.addEventListener('click', todoListOnToggle);
$ulTodoList.addEventListener('dblclick', todoListDoubleClickedOnToggle);
$ulFilterList.addEventListener('click', getTodoFilter);