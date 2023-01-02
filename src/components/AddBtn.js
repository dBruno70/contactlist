import styles from './AddBtn.module.css';

const AddBtn = ({setEditorMode, setShowEditor, setStatesByContact, setShowResetConfirm}) => {
	
	const newContact = {
	name: "",
	tel: "",
	email: "",
	id: Math.floor(Math.random() * Math.pow(10, 10))};
	
	const addContact = () => {
		setStatesByContact(newContact);
		setEditorMode("add");
		setShowEditor(true);
	}
	
	return (
		<div>
			<button className={styles.AddBtn} onClick={addContact}>Adicionar Contato</button>
			<button className={styles.AddBtn} onClick={() => setShowResetConfirm(true)}>Resetar Tudo</button>
		</div>
	)
	
}

export default AddBtn;
