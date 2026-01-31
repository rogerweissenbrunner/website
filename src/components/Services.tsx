const Services = () => {
    return (
        <>
            <div className="w-full max-w-2xl flex flex-col flex-nowrap mx-auto space-around gap-8 mt-8">
                <h1 className="text-2xl font-black">
                    My Services
                </h1>
                <div>
                    <h2 className="text-xl font-bold mb-2">
                        Ruby on Rails Development
                    </h2>
                    <p className="text-pretty">
                        Ruby is an open source programming language that started in 1995 and has become popular thanks to the Rails
                        framework, which implements the MVC architecture with patterns that enable convention over configuration.
                        Technical details aside, it enables software developers to focus on the business problems they are solving,
                        rather than the technology side.
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">
                        PostgreSQL Database Management
                    </h2>
                    <p className="text-pretty">
                        <span className="font-bold">PostgreSQL</span> is the most advanced open source relational database management
                        system. It is known for its reliability, extensibility, scalability, performance, and standards compliance. Its
                        feature-rich query system allows analysts to produce complex reports that can be used to transform data into
                        operational knowledge for decision making.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Services
