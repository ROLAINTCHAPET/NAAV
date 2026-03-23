import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import TestimonialForm from '../TestimonialForm';
import styles from '../../projects/Projects.module.css';

async function getTestimonial(id: string) {
    if (!supabase) return null;
    const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();
    return data;
}

export default async function EditTestimonial({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const testimonial = await getTestimonial(id);

    if (!testimonial) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Modifier le Témoignage</h1>
                    <p className={styles.subtitle}>Mise à jour de l&apos;avis du client : {testimonial.client_name}</p>
                </div>
            </header>

            <TestimonialForm testimonial={testimonial} />
        </div>
    );
}
