'use strict';

function Contact({name, surname, mail, id,}) {
    this.name    = name;
    this.surname = surname;
    this.mail    = mail;
    this.id      = id;
}

function Contacts() {

    this.contacts = null;
    this.isOn     = null
    
    this.init = () => {
        this.contacts = [new Contact({name: 'Петя', surname: 'Петров', mail: 'Pieter@mail.com', id: 15})]; //тут id хардкодом для теста
        this.isOn = false
    }

    this.toggle = () => {
        this.isOn = !this.isOn;
    }

    this.checkIsOn = () => {
        if (this.isOn) return true;
        console.log('телефон выключен');
    }

    this.addContact = (contact) => {
        if (this.checkIsOn()) {
            this.contacts.push(contact);
            console.log('контакт добавлен')
        }
    }

    this.editContact = (id, newContact) => {
        if (this.checkIsOn()) {
            const editableContact = this.contacts.find((item) => item.id === id);
            Object.assign(editableContact, newContact);
            console.log('контакт изменен');
        } 
    }

    this.removeContact = (id) => {
        if (this.checkIsOn()) {
            this.contacts = this.contacts.filter(item => item.id !== id);
            console.log('контакт удален');
        }
    }
}

function ContactsController() { //я что-то увекся и мб лишнюю функцию добавил, задумка была в том, что я в ней хочу проводить валидацию и инитить объекты другие, а в случае если успешная валидация, то уже из нее дергать методы других объектов
    this.contact  = null;
    this.contacts = null;

    this.init = (contact, contacts) => {
        this.contact = contact;
        this.contacts = new contacts
        this.contacts.init();
        this.contacts.toggle();
    }

    this.getId = () => {
        return this.contacts.contacts.map(item => item.id)
    }

    this.getContatcs = () => {
        return this.contacts.contacts;
    }

    this.idGenerate = () => {
        const notFreeId = this.getId();
        const id = Math.ceil(Math.random()*100);
        return notFreeId.includes(id) ? this.idGenerate() : id;
    }

    this.add = (name, surname, mail) => {
        let data = {};
        [{name}, {surname}, {mail,}].map(item => Object.values(item).length && item).forEach(item => { //тут типо валидация
            Object.assign(data, item);
        })

        if (Object.values(data).length) {
            Object.assign(data, {id: this.idGenerate()});
            const contact = new this.contact(data);
            this.contacts.addContact(contact);
        } else {
            console.log('ничего не ввели');
        }
    }

    this.edit = (id, newContact) => {
        if (id ) {
            if (Object.values(newContact).length) {
                this.contacts.editContact(id, newContact);
            } else {
                console.log('нечего редактировать');
            }
        } else {
            console.log('не указан контакт')
        }
    }  
    
    this.remove = (id) => {
        if (this.getId().includes(id)) {
            this.contacts.removeContact(id);
        } else {
            console.log('контакт не найден');
        }
    }

    this.showAllContatcs = () => {
        const allContacts = this.getContatcs()
        if (allContacts.length) {
            allContacts.forEach((item, index) => {
                console.log(`${index + 1} контакт:`);
                Object.values(item).forEach(data => {
                    allContacts[index].id !== data && console.log(data);
                })
                console.log('**********');
            })
        } else {
            console.log('ваш контакт пуст')
        }
    }
}

const contactsController = new ContactsController;
contactsController.init(Contact, Contacts);
contactsController.add('Рома', 'Русак', 'roma@gamil.com');
contactsController.edit(15, {name: 'Катя', surname: 'Иванова'});
contactsController.remove(15);
contactsController.add('Лиза', 'Иванова-Петрова', 'someemail@gmail.com');
contactsController.showAllContatcs();