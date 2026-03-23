'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SecretGateway = () => {
    const router = useRouter();

    useEffect(() => {
        console.log('SecretGateway mounted (Ready for shortcut)');

        const handleKeyDown = (e: KeyboardEvent) => {
            // Shortcuts: Alt + Shift + S (Secret)
            // Alt is less likely to be intercepted than Ctrl for Shift+Key combos
            const isS = e.key === 'S' || e.key === 's';

            if (e.altKey && e.shiftKey && isS) {
                e.preventDefault();
                console.log('Secret shortcut (Alt+Shift+S) detected! Redirecting...');
                router.push('/nx72-naav/login');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router]);

    return null; // Invisible component
};

export default SecretGateway;
