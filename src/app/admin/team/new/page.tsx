import TeamForm from '../TeamForm';
import styles from '../../projects/Projects.module.css';

export default function NewMemberPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Nouveau Membre</h1>
            </header>
            <TeamForm />
        </div>
    );
}
