import ProjectForm from '@/components/admin/ProjectForm';
import styles from '../Projects.module.css';

export default function NewProjectPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Nouveau Projet</h1>
                    <p>Créez une nouvelle réalisation pour votre portfolio.</p>
                </div>
            </header>

            <ProjectForm mode="create" />
        </div>
    );
}
