import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[var(--color-blue-deep)] to-[var(--color-blue-royal)] text-center px-4">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/greek-vase.png')]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="z-10"
            >
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-[var(--color-gold)] text-2xl md:text-3xl mb-4 font-serif tracking-widest"
                >
                    رحلة عبر الزمن
                </motion.h2>

                <motion.h1
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1.2, type: "spring" }}
                    className="text-6xl md:text-9xl font-bold text-[var(--color-text-light)] mb-6 drop-shadow-lg"
                    style={{ textShadow: '0 4px 20px rgba(212, 175, 55, 0.3)' }}
                >
                    حكماء اليونان السبعة
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="text-xl md:text-2xl text-[var(--color-stone)] max-w-2xl mx-auto leading-relaxed"
                >
                    حكمة الأقدمين التي أنارت دروب الحضارة الإنسانية
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 text-[var(--color-gold)]"
            >
                <span className="text-sm">اكتشف الحكمة</span>
                <div className="w-6 h-10 border-2 border-[var(--color-gold)] rounded-full mx-auto mt-2 flex justify-center pt-2">
                    <div className="w-1 h-2 bg-[var(--color-gold)] rounded-full animate-bounce"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
