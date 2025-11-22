import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

const SageDetailModal = ({ sage, onClose }) => {
    if (!sage) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-4xl h-[600px] bg-[var(--color-blue-deep)] border border-[var(--color-gold)] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 text-[var(--color-gold)] hover:text-white transition-colors"
                    >
                        <IoClose size={32} />
                    </button>

                    {/* Image Section */}
                    <div className="w-full md:w-1/3 h-64 md:h-auto relative">
                        <img
                            src={sage.image}
                            alt={sage.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-blue-deep)] via-transparent to-transparent md:bg-gradient-to-r"></div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-2/3 p-8 text-right overflow-y-auto h-full">
                        <h2 className="text-4xl font-bold text-[var(--color-gold)] mb-2">{sage.name}</h2>
                        <h3 className="text-xl text-[var(--color-stone)] mb-6 font-serif italic">{sage.title}</h3>

                        <div className="mb-8 pl-4 border-r-4 border-[var(--color-gold)] pr-4">
                            <p className="text-2xl text-[var(--color-text-light)] font-serif leading-relaxed">
                                "{sage.quote}"
                            </p>
                        </div>

                        <div className="space-y-4 text-[var(--color-stone)] leading-loose text-lg">
                            <p>{sage.bio}</p>
                            <p className="text-sm opacity-70 mt-4">
                                <span className="text-[var(--color-gold)]">الاسم اليوناني:</span> {sage.greekName}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SageDetailModal;
