import styles from './InfoEditor.module.css';
import {useState} from 'react';

const InfoEditor = ({editorMode, contact, setShowEditor, commitToContactList}) => {
	
	const getModeText = () => {
		switch(editorMode) {
			case "edit":
				return "Editar"
				break
			case "add":
				return "Adicionar"
				break
			default: return
		}
	}
	
	const [tempContact, setTempContact] = useState(contact);
	const [deleteText, setDeleteText] = useState(false);
	
	const handleSubmit = (e) => {
		e.preventDefault()
		commitToContactList(tempContact, editorMode);
		setShowEditor(false);
	}
	
	const handleDelete = (e) => {
		e.preventDefault()
		commitToContactList(contact, "delete");
		setShowEditor(false);
	}
	
	const handleDeleteText = (e, value) => {
		e.preventDefault();
		setDeleteText(value);
	}
	
	const editorFormUpdater = (item, value) => {
		setTempContact((prev) => ({...prev, [item]: value}))
	}
	
	
	return (
	<div className={styles.mainWindow}>
		<div className={styles.headerBar}><p>{getModeText()}: {tempContact.name} [ID: {tempContact.id}]</p></div>
		
		<form onSubmit={handleSubmit}>
			<div className={styles.editorContainer}>
				<div className={styles.editorElement}>
					<label htmlFor="name">Nome:</label>
					<input
						id="name"
						type="text"
						value={tempContact.name}
						placeholder="Novo Contato"
						autoFocus
						required
						onChange={(e) => editorFormUpdater("name", e.target.value)}
					/>
				</div>
				
				<div className={styles.editorElement}>
					<label htmlFor="tel">Tel:</label>
				<input
					id="tel"
					type="text"
					placeholder="(xx) xxxx-xxxx"
					value={tempContact.tel}
					onChange={(e) => editorFormUpdater("tel", e.target.value)}
				/>
				</div>
				
				<div className={styles.editorElement}>
					<label htmlFor="email">Email:</label>
					<input
						id="email"
						type="text"
						placeholder="email@localhost.local"
						value={tempContact.email}
						onChange={(e) => editorFormUpdater("email", e.target.value)}
					/>
				</div>
			</div>
			
			{!deleteText &&
				<div className={styles.saveButtons}>
					<button type="submit">Salvar</button>
					<button type="button" onClick={() => setShowEditor(false)}>Cancelar</button>
					{editorMode === "edit" && <button type="button" onClick={(e) => handleDeleteText(e, true)}>Excluir Contato</button>}
				</div>
			}
			
			{deleteText === true &&
				<div className={styles.deleteText}>
					<span>Você tem certeza que deseja excluir esse contato?</span>
					<div className={styles.saveButtons}>
						<button type="button" onClick={handleDelete}>Excluir</button>
						<button type="button" onClick={(e) => handleDeleteText(e, false)}>Cancelar</button>
					</div>
				</div>
			}
		</form>
	</div>
	)
	
}

export default InfoEditor;
