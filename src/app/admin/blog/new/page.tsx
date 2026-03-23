import BlogForm from '../BlogForm';
import styles from '../../projects/Projects.module.css';

export default function NewArticlePage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Nouvel Article</h1>
            </header>
            <BlogForm />
        </div>
    );
}
