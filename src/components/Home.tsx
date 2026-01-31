import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faPixelfed } from "@fortawesome/free-brands-svg-icons"
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons"

import profile from '../assets/profile.png'

const Home = () => {
    return (
        <>
            <div className="w-full h-full max-w-2xl flex flex-col flex-nowrap mx-auto items-center place-content-center justify-center gap-16 mt-8">
                <div>
                    <h1 className="text-2xl font-black">
                        Roger Weißenbrunner
                    </h1>
                    <h2 className="text-lg italic text-neutral-500">
                        Ruby + PostgreSQL Developer
                    </h2>
                </div>
                <div className="items-center">
                    <img src={profile} alt="Roger Weißenbrunner's Profile Picture" className="rounded-full size-32 md:size-48" />
                </div>
                <ul className="flex flex-row flex-nowrap w-full place-content-around">
                    <li>
                        <a href="https://www.pixelfed.de/rogerweissenbrunner" target="_blank" className="flex flex-col flex-nowrap items-center gap-2 text-xs">
                            <FontAwesomeIcon icon={faPixelfed} size="4x" />
                            Pixelfed
                        </a>
                    </li>
                    <li>
                        <a href="https://www.codeberg.org/rogerweissenbrunner" target="_blank" className="flex flex-col flex-nowrap items-center gap-2 text-xs">
                            <FontAwesomeIcon icon={faCodeBranch} size="4x" />
                            Codeberg
                        </a>
                    </li>
                    <li>
                        <a href="https://www.github.com/rogerweissenbrunner" target="_blank" className="flex flex-col flex-nowrap items-center gap-2 text-xs">
                            <FontAwesomeIcon icon={faGithub} size="4x" />
                            GitHub
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Home
