import Link from "next/link";

export default function Home() {
    return (
        <div className="flex justify-center items-center h-full">
            <div>
                <span className="text-black text-3xl">TRAVELOG</span>
            </div>
            <div>
                <Link href="/create" className="text-black no-underline">
                    <span className="text-neutral-300 hover:text-black text-3xl">
                        CREATE
                    </span>
                </Link>
            </div>
            <div>
                <Link href="/search" className="text-black no-underline">
                    <span className="text-neutral-300 hover:text-black text-3xl">
                        SEARCH
                    </span>
                </Link>
            </div>
        </div>
    );
}
