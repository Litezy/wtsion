import React, { useState } from 'react'
import { ErrorMessage, SuccessMessage } from '../utils/Notify';
import { Apis, ClientPostApi } from '../services/APIS';
import { Mail, Star } from 'lucide-react';
import LoadingEffect from '../shared/LoadingEffect'
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Subscribe: React.FC = () => {

    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [newsletterRef, newsletterVisible] = useScrollAnimation();


    const fadeInUp = (isVisible: boolean, delay = 0) => ({
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
        transition: `all 0.6s ease-out ${delay}s`,
    });

    const handleSubscribe = async () => {
        if (!newsletterEmail || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
            ErrorMessage('Please enter a valid email address.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await ClientPostApi(Apis.non_auth.subscribe_newsletter, { email: newsletterEmail });
            if (response?.success) {
                SuccessMessage('Subscribed successfully!');
                setNewsletterEmail('');
            } else {
                ErrorMessage(response?.error || 'Subscription failed.');
            }
        } catch (err) {
            console.error(err);
            ErrorMessage('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <section className="py-10 bg-gradient-to-r from-cyan-900/20 to-purple-900/20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div
                    ref={newsletterRef as any}
                    style={fadeInUp(newsletterVisible)}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
                >
                    <Star className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                    <p className="text-gray-300 mb-6">
                        Get the latest news, updates, and exclusive insights from the WorldStreet ecosystem
                    </p>
                    <div className="flex w-full flex-col lg:flex-row  gap-4 items-center justify-center  mx-auto">
                        <input
                            type="email"
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="lg:w-1/2 w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                        />
                        <div className="lg:w-2/5 w-full">
                            <LoadingEffect
                            type="button"
                            isLoading={isLoading}
                            onClick={handleSubscribe}
                        >
                            <Mail className="w-4 h-4" />
                            <span>Subscribe</span>
                        </LoadingEffect>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Subscribe