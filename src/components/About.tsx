const About = () => {
    return (
        <>
            <div className="w-full max-w-2xl flex flex-col flex-nowrap mx-auto space-around gap-4 mt-8">
                <h1 className="text-2xl font-black">
                    About Me
                </h1>
                <p className="text-pretty">
                    I am a full-stack engineer with more than 20 years of experience solving real-world problems and building tools
                    that improve people's lives by turning complex requirements into clean code users can trust. Most of my code is
                    written on top of open source platforms, with security and privacy in mind.
                </p>
                <p className="text-pretty">
                    Outside of work, I have a wide variety of interests: music, chess, photography, travel, and motorcycles, among
                    others.
                </p>
                <p className="text-pretty">
                    Feel free to explore my work and <a href="/contact" className="font-bold italic underline">contact me</a> if
                    you need a professional software developer focused on practical solutions.
                </p>
            </div>
        </>
    )
}

export default About
