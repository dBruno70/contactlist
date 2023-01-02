import styles from './InfoEditor.module.css';

const ResetConfirm = ({resetToDefault, setShowResetConfirm}) => {

	return (
		<div className={styles.mainWindow}>
			<div className={styles.headerBar}><p>EXCLUIR TODOS OS CONTATOS?</p></div>
			<p>Você tem certeza que deseja excluir todos os contatos? Essa ação não pode ser desfeita!</p>
			<div className={styles.saveButtons}>
				<button onClick={resetToDefault}>Apagar tudo!</button>
				<button onClick={() => setShowResetConfirm(false)}>Cancelar</button>
			</div>
		</div>
	)

}

export default ResetConfirm;
