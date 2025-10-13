import Link from "next/link";

export default function Home() {
    return (
        <>
            <div>
                <span className="text-black text-[32px]">TRAVELOG</span>
            </div>
            <div>
                <Link href="/create" className="text-black no-underline">
                    <span className="text-[#c0c0c0] hover:text-black text-[32px]">
                        CREATE
                    </span>
                </Link>
            </div>
            <div>
                <Link href="/search" className="text-black no-underline">
                    <span className="text-[#c0c0c0] hover:text-black text-[32px]">
                        SEARCH
                    </span>
                </Link>
            </div>
        </>
    );
}
