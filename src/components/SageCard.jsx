import { motion } from 'framer-motion';

const SageCard = ({ sage, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -10 }}
            onClick={onClick}
            className="relative min-w-[300px] h-[450px] bg-[var(--color-blue-royal)] rounded-xl overflow-hidden shadow-2xl border border-[var(--color-gold-dark)] cursor-pointer group mx-4 flex-shrink-0"
        >
            {/* Image Background */}
            <div className="absolute inset-0">
                <img
                    src={sage.image}
                    alt={sage.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-blue-deep)] via-transparent to-transparent opacity-90"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-center z-10">
                <motion.h3
                    className="text-2xl font-bold text-[var(--color-gold)] mb-1"
                >
                    {sage.name}
                </motion.h3>
                <p className="text-[var(--color-stone)] text-sm mb-4 font-serif italic">
                    {sage.title}
                </p>

                {/* Hidden Content Revealed on Hover */}
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    whileHover={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <p className="text-[var(--color-text-light)] text-lg font-serif leading-relaxed border-t border-[var(--color-gold-dark)] pt-4 mt-2">
                        "{sage.quote}"
                    </p>
                </motion.div>
            </div>

            {/* Decorative Border */}
            <div className="absolute inset-0 border-2 border-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none m-2"></div>
        </motion.div>
    );
};

export default SageCard;
