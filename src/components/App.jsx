import { Component } from 'react';
import InputForm from './InputForm/InputForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContact = event => {
    event.preventDefault();
    const actualContacts = {
      ...this.state,
    };
    const addedContact = {
      name: event.target[0].value,
      id: nanoid(),
      number: event.target[1].value,
    };
    const names = actualContacts.contacts.map(contact => contact.name);
    if (names.includes(addedContact.name)) {
      return alert(`${addedContact.name} is already in contacts.`);
    }
    actualContacts.contacts.push(addedContact);
    this.setState({
      ...actualContacts,
    });
  };

  filterFun = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  showContacts = () => {
    const { filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const contactsToShow = this.showContacts();
    return (
      <>
        <h1>Phonebook</h1>
        <InputForm onSubmit={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.filterFun} />
        <ContactsList
          contacts={contactsToShow}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}

export default App;
