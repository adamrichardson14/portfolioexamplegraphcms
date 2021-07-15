import Link from "next/link";
export default function Header() {
  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-0">
      <div className="flex flex-col sm:flex-row justify-between max-w-3xl mx-auto items-center">
        <div className="text-3xl sm:text-2xl font-semibold">Awesome Portfolio</div>
        <ul className="flex mt-4 sm:mt-0">
          <li>
            <Link href="/">
              <a className="text-gray-900 hover:text-gray-700">Home</a>
            </Link>
          </li>
          <li className="ml-4">
            <Link href="/about">
              <a className="text-gray-900 hover:text-gray-700">About</a>
            </Link>
          </li>
          <li className="ml-4">
            <Link href="/portfolio">
              <a className="text-gray-900 hover:text-gray-700">Portfolio</a>
            </Link>
          </li>
          <li className="ml-4">
            <Link href="/blog">
              <a className="text-gray-900 hover:text-gray-700">Blog</a>
            </Link>
          </li>
          <li className="ml-4">
            <Link href="/gallery">
              <a className="text-gray-900 hover:text-gray-700">Gallery</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
