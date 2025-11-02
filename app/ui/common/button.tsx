import Link from "next/link";

interface Props {
    label: string;
    href?: string;
    onClick?: () => void | Promise<void>;
    parentStyle?: string;
    style?: string;
}

export default function Button({
    label,
    href,
    onClick,
    parentStyle,
    style,
}: Props) {
    return (
        <div className={`${parentStyle}`}>
            {href ? (
                <Link
                    href={href}
                    className="px-2.5 py-1.5 text-base rounded-lg border border-solid hover:bg-black hover:text-[#f5f5f5]"
                >
                    BACK
                </Link>
            ) : (
                <button
                    onClick={onClick}
                    className={`${style} bg-black text-[#f5f5f5] hover:bg-[#f5f5f5] hover:text-black`}
                >
                    {label}
                </button>
            )}
        </div>
    );
}
