export default function AboutHero() {
    return (
        <div className=" mt-24">
            <header className="relative h-screen flex items-center justify-center text-white">
                
                <div className="absolute inset-0">
                    <img
                    src="/woman1.jpg"
                    alt="Hero background"
                    className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl font-bold mb-4">
                    Empowering Women to Take Control of Their Cycle and Wellbeing
                    </h1>
                    <p className="text-lg">
                    Track your cycle, log symptoms, and receive personalized predictions — all in one secure space.
                    </p>
                </div>
            </header>

        </div>
    )
}