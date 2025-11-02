import Link from "next/link";
import {
    GlobeAsiaAustraliaIcon,
    HomeIcon,
    PlusIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

export const Menu = () => {
    return (
        <aside className="fixed top-0 left-0 w-64 h-full bg-white flex flex-col">
            <div className="p-5">
                <div className="h-32 bg-neutral-700 text-white p-2 text-xl">
                    <div className="flex items-center space-x-1.5">
                        <GlobeAsiaAustraliaIcon className="w-6 h-6" />
                        <span>TRAVELOG</span>
                    </div>
                </div>
                <div className="p-2">
                    <Link href="/">
                        <div className="flex items-center mt-3 space-x-1.5 hover:text-neutral-300">
                            <HomeIcon className="w-5 h-5" />
                            <span>HOME</span>
                        </div>
                    </Link>
                    <Link href="/create">
                        <div className="flex items-center mt-3 space-x-1.5 hover:text-neutral-300">
                            <PlusIcon className="w-5 h-5" />
                            <span>CREATE</span>
                        </div>
                    </Link>
                    <Link href="/search">
                        <div className="flex items-center mt-3 space-x-1.5 hover:text-neutral-300">
                            <MagnifyingGlassIcon className="w-5 h-5" />
                            <span>SEARCH </span>
                        </div>
                    </Link>
                </div>
            </div>
        </aside>
    );
};
