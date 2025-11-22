import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sages } from '../data/sages';
import SageCard from './SageCard';

const SageShowcase = ({ onSageClick }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // RTL: Scroll from 0% (right) to 95% (left-most content revealed)
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-[var(--color-blue-deep)]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-8 px-20">
                    <div className="min-w-[300px] flex flex-col justify-center items-center text-[var(--color-gold)]">
                        <h2 className="text-6xl font-bold mb-4 writing-vertical">الحكماء</h2>
                        <p className="text-xl opacity-80">مرر لتكتشف</p>
                    </div>

                    {sages.map((sage, index) => (
                        <SageCard
                            key={sage.id}
                            sage={sage}
                            index={index}
                            onClick={() => onSageClick(sage)}
                        />
                    ))}

                    <div className="min-w-[300px] flex justify-center items-center text-[var(--color-stone)]">
                        <p className="text-2xl">نهاية الرحلة</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SageShowcase;
