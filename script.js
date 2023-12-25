class NodeCreator {
  static createNode(nodeName) {
    const node = document.createElement(nodeName);

    const arrayCheck = (data) => Array.isArray(data) && data.length;

    return (attributes) => {
      if (arrayCheck(attributes)) {
        attributes.forEach((item) => {
          if (arrayCheck(item)) {
            node.setAttribute(item[0], item[1]);
          }
        });
      }

      return (content) => {
        if (content) node.innerHTML = content;

        return node;
      };
    };
  }
}

class User {
    #data = {
        id:      null,
        name:    null,
        email:   null,
        address: null,
        phone:   null,
    }

    init({name, email, address, phone, id}) {
        this.#data.id = id;
        this.#data.name = name;
        this.#data.email = email;
        this.#data.address = address;
        this.#data.phone = phone;
    }

    getData() {
        return this.#data;
    }

    setData(newData) {
        Object.assign(this.#data, newData);
    }
}

class Contacts {
    data  = [];
    #user = null

    constructor(User) {
        this.#user = User;
    }
    

    getId() {
        return this.data.map(item => item.getData().id);
    }

    generateId() {
        const notFreeId = this.getId();
        const id = Math.ceil(Math.random()*100);

        return notFreeId.includes(id) ? this.generateId() : id;
    }

    add(name, email, address, phone) {
        const newUser = new this.#user;

        newUser.init({
            name,
            email,
            address,
            phone,
            id: this.generateId(),
        });

        this.data = [...this.data, newUser];
        this.cleanInputs();
        this.render();
    }

    remove(id) {
        this.data = this.data.filter(contact => {
            return contact.getData().id !== id;
        });
        this.render();
    }

    edit(id, newContact) {
        const currentUser = this.data.find(item => item.getData().id === id);
        currentUser.setData(newContact);
        this.init();
        this.render();
    }
}

class ContactsUI extends Contacts {

    static NodeCreator = null;

    #inputs = {
        name:    {
            input: null,
            isValid: false,
            inputRules: [
                (val) => {
                    val = val.trim();
                    
                    return val.length > 0;
                }
            ]
        },
        email:   {
            input: null,
            isValid: false,
            inputRules: [
                (val) => {
                    val = val.trim();
                    const emailRegExpPat = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
                    return emailRegExpPat.test(val)
                }
            ]
        },
        address: {
            input: null,
            isValid: false,
            inputRules: [
                (val) => {
                    val = val.trim();
                    
                    return val.length > 0;
                }
            ]
        },
        phone:   {
            input: null,
            isValid: false,
            inputRules: [
                (val) => {
                    val = val.trim();
                    const phoneRegPattern =  /(?:\+375|80)\s?\(?\d\d\)?\s?\d\d(?:\d[\-\s]\d\d[\-\s]\d\d|[\-\s]\d\d[\-\s]\d\d\d|\d{5})/;
                    return phoneRegPattern.test(val);
                }
            ]
        },
    }

    #submitButton    = null;
    #nodeCreator     = null;
    #contactsWrapper = null;
    #removeButtons   = null;

    constructor(User) {
        super(User);
    }

    init(NodeCreator) {
        
        Object.keys(this.#inputs).forEach(input => {
            this.initInput(input);
        })
        
        Object.values(this.#inputs).forEach(item => {
            const {input} = item;
            input.addEventListener('input', (e) => {
                this.validation(e.target.name, e.target.value)
            })
        })

        this.add = this.add.bind(this);

        this.#submitButton = document.getElementById('submit-button');
        this.#submitButton.innerText = 'Add';
        this.#submitButton.onclick = () => {
            const inputs = this.getInput(...Object.keys(this.#inputs));
            
            this.add(
                    inputs.name.value,
                    inputs.email.value,
                    inputs.address.value,
                    inputs.phone.value,
                );
        }

        if (NodeCreator && !ContactsUI.NodeCreator) ContactsUI.NodeCreator = NodeCreator;
        this.#nodeCreator = ContactsUI.NodeCreator;

        this.#contactsWrapper = document.body.querySelector('.contacts-wrapper');
    }

    initInput(inputName) {
        this.#inputs[inputName].input = document.getElementById(inputName);
    }

    validation(inputName, value) {

        const {inputRules} = this.#inputs[inputName];
        
        this.#inputs[inputName].isValid = inputRules.map(check => {
            return check(value);
        }).every(check => check)
        
        for (const key in this.#inputs) {
            const item = this.#inputs[key] 
            const {input, isValid} = item;
            
            isValid ? input.classList.add('valid') : input.classList.remove('valid');
        }

        this.updateSubmitButton();
    }

    getInput(...key) {
        if (Array.isArray(key)) {
            let arrWrapper = {};

            key.forEach(item => {
                const {[item]: {input} } = this.#inputs;
                arrWrapper = {...arrWrapper, [item]: input}
            })
            
            return arrWrapper;
        }
    }

    updateSubmitButton() {
        const isAllInputValid = Object.values(this.#inputs).map(item => item.isValid).every(checkResult => checkResult);

        isAllInputValid
            ? this.#submitButton.removeAttribute('disabled')
            : this.#submitButton.setAttribute('disabled', '');
    }

    cleanInputs() {
        const inputs = this.getInput(...Object.keys(this.#inputs));
        
        for (const key in inputs) {
            const currentInput = inputs[key];
            currentInput.value = '';

            this.validation(currentInput.name, currentInput.value);
        }

    }

    render() {
        this.#contactsWrapper.innerHTML = '';

        this.data.map(contact => contact.getData()).forEach(contact => {
            const contactWrapper = this.#nodeCreator.createNode('div')([['class', 'contact-wrapper']])();

            const contactName = this.#nodeCreator.createNode('h2')([['class', 'contact-name']])(contact.name);
            const contactNumber = this.#nodeCreator.createNode('span')([['class', 'contact-number']])(contact.phone);
            const contactEmail = this.#nodeCreator.createNode('span')([['class', 'contact-email']])(contact.email);
            const contactAddress = this.#nodeCreator.createNode('p')([['class', 'contact-address']])(contact.address);
            const buttonsWrapper = this.#nodeCreator.createNode('div')([['class', 'buttons-wrapper']])();
            const removeButton = this.#nodeCreator.createNode('button')([['class', 'remove-button custom-button']])('remove');
            const editButton = this.#nodeCreator.createNode('button')([['class', 'edit-button custom-button']])('edit');
            
            buttonsWrapper.append(removeButton, editButton);
            contactWrapper.append(contactName, contactNumber, contactEmail, contactAddress, buttonsWrapper);
            this.#contactsWrapper.append(contactWrapper);

            removeButton.onclick = () => {
                this.remove(contact.id)
            };

            editButton.onclick = () => {
                this.edit(contact.id, editButton);
            };
        })
    }

    edit(id, editButton) {
        editButton.innerText = 'Cancel';
        
        const submitButtonOldVal = this.#submitButton.innerText;
        this.#submitButton.innerText = 'Save';

        this.addButtonsDisabledStatus(id);
        
        const inputs = this.getInput(...Object.keys(this.#inputs));
        const currentData = this.data.map(item => item.getData()).find(item => item.id === id);
        
        for (const key in inputs) {
            const currenInput = inputs[key];
            const currentInputName = currenInput.name;
            const currentInputValue = currentData[currentInputName];
            
            currenInput.value = currentInputValue;
            this.validation(currentInputName, currentInputValue);
        }

        editButton.onclick= () => {
            this.init();
            this.cleanInputs();
            this.render();
        };

        this.#submitButton.onclick = () => {
            const inputs = Object.entries( //вот тут конечно все плохо, но он хоть работает, оставлю пока так(
                this.getInput(...Object.keys(this.#inputs))).map(item => {
                    return Object.values(item).map((item, index)  => index === 1 ? item.value : item);
                }
            );
            const inputsObj = Object.fromEntries(inputs);
            super.edit(id, inputsObj);

            this.cleanInputs();
            this.#submitButton.innerText = submitButtonOldVal;
        }

    }

    addButtonsDisabledStatus(id) { //тут костыли страшные,но не успеваю переделать(
        const editableItemIndex = this.data.findIndex((item) => item.getData().id === id);

        const contactItems = this.#contactsWrapper.querySelectorAll('.contact-wrapper');

        const addDisStatus = button => button.setAttribute('disabled', '');

        contactItems.forEach((div,index) =>  {

            if (index !== editableItemIndex) {
                div.querySelectorAll('button').forEach(button => {
                    addDisStatus(button);
                })
            } else {
                addDisStatus(div.querySelector('button.remove-button'));
            }
        })
    }
} 

class ContactsController {

    static self         = null;

    #ContactsUI         = null;
    #NodeCreator        = null;
    #User               = null;

    #contactsUi         = null;

    constructor() {
        
        if (ContactsController.self) {
            return ContactsController.self;
        }

        ContactsController.self = this;
    }

    init(ContactsUI, NodeCreator, User) {    
        this.#ContactsUI  = ContactsUI;
        this.#NodeCreator = NodeCreator;
        this.#User        = User;

        this.#contactsUi = new this.#ContactsUI(this.#User);
        this.#contactsUi.init(this.#NodeCreator);
        this.#contactsUi.updateSubmitButton();
    }
}

const contacts = new ContactsController()
contacts.init(ContactsUI, NodeCreator, User);
