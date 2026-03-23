'use client';

import styles from './LoadingModal.module.css';

interface LoadingModalProps {
    isOpen: boolean;
    message?: string;
}

export default function LoadingModal({ isOpen, message = 'Chargement en cours...' }: LoadingModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.spinnerContainer}>
                    <div className={styles.spinner}></div>
                    <div className={styles.spinnerRing}></div>
                </div>
                <p className={styles.message}>{message}</p>
            </div>
        </div>
    );
}
