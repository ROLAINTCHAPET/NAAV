'use client';

import { useState } from 'react';
import styles from './Contact.module.css';
import { sendContactEmail } from './actions';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    async function handleSubmit(formData: FormData) {
        setStatus('loading');
        try {
            const result = await sendContactEmail(formData) as any;
            if (result.success) {
                setStatus('success');
                setMessage(result.simulated ? "(Simulation) Message envoyé avec succès !" : "Votre message a été envoyé avec succès ! Nous vous recontacterons rapidement.");
            } else {
                setStatus('error');
                setMessage(result.error || "Erreur lors de l'envoi.");
            }
        } catch (err) {
            setStatus('error');
            setMessage("Une erreur inattendue est survenue.");
        }
    }

    return (
        <div className={styles.contactWrapper}>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className="section-eyebrow">Contactez-nous</div>
                    <h1 className="section-title">Donnez vie à vos <em>Ambitions</em></h1>
                    <p className={styles.heroLead}>
                        Que vous soyez au début de votre réflexion ou prêt à lancer les travaux, notre équipe est là pour vous accompagner dans la création de votre projet architectural unique.
                    </p>
                </div>
            </section>

            <section className={styles.formSection}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {/* Info Column */}
                        <div className={styles.infoCol}>
                            <div className={styles.infoItem}>
                                <h3>Nos Bureaux</h3>
                                <p>Avenue Cheikh Anta Diop, Dakar, Sénégal</p>
                            </div>
                            <div className={styles.infoItem}>
                                <h3>Contact Direct</h3>
                                <p>contact@naav-architecture.com</p>
                                <p>+221 33 123 45 67</p>
                            </div>
                            <div className={styles.infoItem}>
                                <h3>Heures d&apos;ouverture</h3>
                                <p>Lundi — Vendredi : 09h00 - 18h00</p>
                                <p>Samedi : Sur rendez-vous uniquement</p>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className={styles.formCol}>
                            {status === 'success' ? (
                                <div className={styles.successMessage}>
                                    <div className={styles.successIcon}>✓</div>
                                    <h2>Merci !</h2>
                                    <p>{message}</p>
                                    <button onClick={() => setStatus('idle')} className="btn-outline" style={{ marginTop: '20px' }}>
                                        Envoyer un autre message
                                    </button>
                                </div>
                            ) : (
                                <form action={handleSubmit} className={styles.form}>
                                    <div className={styles.formGrid}>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="name">Nom Complet *</label>
                                            <input type="text" id="name" name="name" placeholder="Votre nom" required />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="email">Email Professionnel *</label>
                                            <input type="email" id="email" name="email" placeholder="votre@email.com" required />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="phone">Téléphone</label>
                                            <input type="tel" id="phone" name="phone" placeholder="+221 ..." />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="project-type">Type de Projet</label>
                                            <select id="project-type" name="project-type">
                                                <option value="residentiel">Résidentiel de luxe</option>
                                                <option value="commercial">Commercial / Bureaux</option>
                                                <option value="interieur">Design d&apos;Intérieur</option>
                                                <option value="urbanisme">Urbanisme / Développement</option>
                                                <option value="autre">Autre</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.inputGroup} style={{ marginTop: '24px' }}>
                                        <label htmlFor="message">Décrivez votre projet *</label>
                                        <textarea id="message" name="message" rows={5} placeholder="Parlez-nous de votre vision, de la localisation et de vos attentes..." required></textarea>
                                    </div>

                                    <div className={styles.checkboxGroup}>
                                        <input type="checkbox" id="devis" name="devis" />
                                        <label htmlFor="devis">Je souhaite recevoir un devis estimatif préliminaire</label>
                                    </div>

                                    {status === 'error' && <p className={styles.errorMessage}>{message}</p>}

                                    <button
                                        type="submit"
                                        className="btn-primary"
                                        disabled={status === 'loading'}
                                        style={{ width: '100%', marginTop: '30px', justifyContent: 'center' }}
                                    >
                                        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma Demande'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
