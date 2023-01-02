import contactIcon from '../data/contact.png'
import styles from './ContactList.module.css'

const ContactList = ({contacts, setShowEditor, setEditorMode, setStatesByContact}) => {

	const editContact = (contact) => {
		setStatesByContact(contact);
		setEditorMode("edit");
		setShowEditor(true);
	}

	return (
		<div>
			<div className={styles.mainList}>
				{contacts.map((contact) => (
					<div key={contact.id} className={styles.listItem}>
						<img src={contactIcon} alt=""/>
						<span>{contact.name}</span>
						<span className={styles.telText}>{contact.tel}</span>
						<span className={styles.telText}>{contact.email}</span>
						<a href={`mailto:${contact.email}`}><button>Enviar Email</button></a>
						<button onClick={() => editContact(contact)}>Editar</button>
					</div>
			))}
			</div>
		</div>
	)
	
}

export default ContactList;
