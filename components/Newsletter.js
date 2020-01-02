const Newsletter = () => {
    return (
        <section className="home-newsletter-section">
            <div className="home-newsletter-section-inner">
                <h1 className="newsletter-title text-gold font-fira">
                    SIGN UP FOR MY EMAIL NEWSLETTER
                </h1>

                <form className="newsletter-form-group">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="newsletter-email-input"
                    />
                    <div className="vertical-space"></div>
                    <button className="button button-gold" type="submit">
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
