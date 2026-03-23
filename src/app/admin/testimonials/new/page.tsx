import TestimonialForm from '../TestimonialForm';
import styles from '../../projects/Projects.module.css';

export default function NewTestimonial() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Ajouter un Témoignage</h1>
                    <p className={styles.subtitle}>Saisissez les informations fournies par votre client.</p>
                </div>
            </header>

            <TestimonialForm />
        </div>
    );
}
