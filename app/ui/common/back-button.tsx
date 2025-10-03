import Link from "next/link";

interface Props {
    href: string;
}

export default function BackButton({ href }: Props) {
    return (
        <div className="my-5">
            <Link
                href={href}
                className="px-4 py-2 text-lg rounded-lg border-2 border-solid hover:bg-black hover:text-[#f5f5f5]"
            >
                BACK
            </Link>
        </div>
    );
}
