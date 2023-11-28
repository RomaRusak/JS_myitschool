'use strict';

const createNode = (nodeName) => {
    const node = document.createElement(nodeName);

    const arrayCheck = (data) => Array.isArray(data) && data.length
    
    return (attributes) => {
        if (arrayCheck(attributes)) {
            attributes.forEach(item => {
                if (arrayCheck(item)) {
                    node.setAttribute(item[0], item[1]);
                }
            })
        }
        
        return (content) => {
            if (content) node.innerHTML = content;
            
            return node;
        }
    }
}

function Todo({name, id}) {
    this.name    = name;
    this.id      = id;
    this.isReady = false;
}

function TodoController() {
        this.todos = [];

        this.getId = () => {
            return this.todos.map(item => item.id);
        }

        this.generateId = () => {
            const notFreeId = this.getId();
            const id = Math.ceil(Math.random()*100);

            return notFreeId.includes(id) ? this.generateId() : id;
        }

        this.toggleIsReadyStatus = (id) => {
            this.todos = this.todos.map(item => {
                if (item.id === id) return {...item, isReady: !item.isReady}
                return item;
            })
            this.render();
        }

        this.add = (val) => {
            this.todos.push(new Todo({name: val, id: this.generateId()}));
            this.render();
        }

        this.remove = (id) => {
            this.todos = this.todos.filter(item => item.id !== id);
            this.render();
        }

        this.updateTodoName =(id, value) => {
            this.todos = this.todos.map(item => {
                if (item.id === id) return {...item, name: value}
                return item;
            })
            this.render();
        }
}

function TodoContollerUI() {
    TodoController.call(this);

    this.todoInput       = null;
    this.inputValidClass = 'is-valid'
    this.isInputValValid = false;
    this.todosList       = null;

    this.init = () => {
        this.todoInput = document.querySelector('.todo-name-input');
        this.todosList = document.querySelector('.todos-list');

        this.checkInputValValid = this.checkInputValValid.bind(this);

        this.todoInput.addEventListener('input', this.checkInputValValid)
        window.addEventListener('keyup', (e) => {
            if (e.code === 'Enter' && this.isInputValValid) {
                this.add(this.todoInput.value);
                this.todoInput.value = '';
                this.checkInputValValid();
            } 
        });
    }

    this.checkInputValValid = () => {
        const inputVal = this.todoInput.value;
        
        const rules = [
            (val) => val.trim().length > 2, 
        ];

        this.isInputValValid = rules.map(check => check(inputVal)).every(checkResult => checkResult);
        this.toggleInputClass();
    }

    this.render = () => {
       this.todosList.innerHTML = '';

       this.todos.forEach(item => {
            const todoLi = createNode('div')([['class', item.isReady ? 'todos-li todo-ready' : 'todos-li'], ['data-id', item.id]])();
            const todoCheckbox = createNode('div')([['class', 'todo-checkbox']])(
                item.isReady
                ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`
            );
            const todoText = createNode('p')([['class', 'todo-text']])(item.name);
            const buttonsWrapper = createNode('div')([['class', 'todo-buttons-wrapper']])();
            const removeButton = createNode('button')([['class', 'todo-remove-button todo-button']])('remove');
            const editButton = createNode('button')([['class', 'todo-edit-button todo-button']])('edit');

            buttonsWrapper.append(removeButton, editButton);
            todoLi.append(todoCheckbox, todoText, buttonsWrapper);
            this.todosList.append(todoLi);

            todoCheckbox.addEventListener('click', () => {
                this.toggleIsReadyStatus(item.id);
            });

            removeButton.addEventListener('click', () => {
                this.remove(item.id);
            });

            editButton.addEventListener('click', () => {
                this.addContentEditableAttr(item.id);
            });
       })
    }

    this.toggleInputClass = () => {
        if (this.isInputValValid && !this.todoInput.classList.contains(this.inputValidClass)) {
            this.todoInput.classList.add(this.inputValidClass);
        };

        if (!this.isInputValValid && this.todoInput.classList.contains(this.inputValidClass)) {
            this.todoInput.classList.remove(this.inputValidClass);
        }
    }

    this.addContentEditableAttr = (id) => {
        const editableLi = document.querySelector(`.todos-li[data-id="${id}"]`);
        const editableTodoText = editableLi.querySelector('.todo-text');
        const editButton = editableLi.querySelector('.todo-edit-button');
        const EDITABLE_BUTTON_CLASS = 'editable-button-active';

        editableTodoText.setAttribute('contenteditable', '');
        editableTodoText.classList.add('editable-content');

        editButton.innerText = 'Save';
        editButton.classList.add(EDITABLE_BUTTON_CLASS);
        editButton.addEventListener('click', () => {
            this.updateTodoName(id, editableTodoText.innerText);
        })

    }
} 

const todoList = new TodoContollerUI;
todoList.init();