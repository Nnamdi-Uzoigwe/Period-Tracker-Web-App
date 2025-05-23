import AboutHero from "../sections/About/AboutHero"
import FAQ from "../sections/About/FAQ"
import OurStory from "../sections/About/OurStory"
import OurValues from "../sections/About/OurValues"
import Testimonials from "../sections/About/Testimonials"

export default function About() {
    return (
        <div>
            <AboutHero />
            <OurStory />
            <OurValues />
            <Testimonials />
            <FAQ />
        </div>
    )
}