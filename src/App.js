import './App.css';
import InfoEditor from './components/InfoEditor';
import ResetConfirm from './components/ResetConfirm';
import ContactList from './components/ContactList';
import AddBtn from './components/AddBtn';
import { useState, useEffect } from 'react';

function App() {

	const defaultContacts = [
	{name: "Eu",
	tel: "(xx) xxxx-xxxx",
	email: "eu@localhost.local",
	id: 0
	},
	{name: "Contato1",
	tel: "(xx) xxxx-xxxx",
	email: "contato1@localhost.local",
	id: 1
	},
	{name: "Contato2",
	tel: "(xx) xxxx-xxxx",
	email: "contato2@localhost.local",
	id: 2}]
	
	const [contacts, setContacts] = useState(defaultContacts);
	const [showEditor, setShowEditor] = useState(false);
	const [showResetConfirm, setShowResetConfirm] = useState(false);
	const [editorMode, setEditorMode] = useState("add");
	const [inEditContact, setInEditContact] = useState({});
	
	
	const setStatesByContact = (contact) => {
		setInEditContact(contact);
	}
	
	useEffect(() => {
		if(typeof(Storage) !== "undefined" && localStorage.getItem("contactList") !== null) {
			setContacts(JSON.parse(localStorage.getItem("contactList")));
		}
	}, []);
	
	useEffect(() => {
		if(contacts !== defaultContacts) {
			localStorage.setItem("contactList", JSON.stringify(contacts));
		}
	}, [contacts]);
	
	const commitToContactList = (contact, mode) => {
		let contactsCopy = [...contacts];
		if(mode === "delete") {
			contactsCopy = contactsCopy.filter((currentContact) => contact.id !== currentContact.id)
		} else if (mode === "add") {
			contactsCopy.push(contact);
		} else if (mode === "edit") {
			let currentContactIndex = contactsCopy.findIndex((currentContact) => contact.id === currentContact.id)
			contactsCopy[currentContactIndex] = contact;
		}
		setContacts(contactsCopy);
	}
	
	
	const resetToDefault = () => {
		setContacts(defaultContacts);
		localStorage.removeItem("contactList");
		setShowResetConfirm(false);
	}

  return (
    <div className="App">
      <h1>Lista de Contatos</h1>
      
      <AddBtn
		    setEditorMode={setEditorMode}
		    setShowEditor={setShowEditor}
		    setStatesByContact={setStatesByContact}
		    setShowResetConfirm={setShowResetConfirm}
      />
      
      <ContactList
		    setEditorMode={setEditorMode}
		    setShowEditor={setShowEditor}
		    contacts={contacts}
		    setStatesByContact={setStatesByContact}
      />
      
      {showEditor &&
		    <InfoEditor
				  setShowEditor={setShowEditor}
				  editorMode={editorMode}
				  contact={inEditContact}
				  commitToContactList={commitToContactList}
		    />
      }
      
      {showResetConfirm &&
      	<ResetConfirm
      		resetToDefault={resetToDefault}
      		setShowResetConfirm={setShowResetConfirm}
      	/>
      }
      
      {(showEditor || showResetConfirm) && <div className="darkenBG" />}
    </div>
  );
}

export default App;
