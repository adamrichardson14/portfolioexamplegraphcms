import Image from "next/image";
import Link from "next/link";

import { getPortfolioItems } from "../../lib/data";

export const getStaticProps = async () => {
  const data = await getPortfolioItems();
  console.log(data);
  return {
    props: {
      items: data.portfolios,
    },
  };
};

export default function BlogPage({ items }) {
  console.log(items);
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
      {items?.map((item) => (
        <div key={item.slug}>
          <Link href={`/portfolio/${item.slug}`}>
            <a>
              <div className="relative mb-10 overflow-hidden">
                <div className="absolute w-full h-full z-10 opacity-80 bg-green-900"></div>
                <div className="absolute w-full h-full z-20 flex flex-col justify-center items-center text-center px-4">
                  <h3 className="text-white font-semibold text-2xl">{item.title}</h3>
                  <p className="text-gray-50 text-lg mt-4 leading-relaxed hidden md:flex">
                    {item.description}
                  </p>
                  <div className="mt-4">
                    {item.tags.map((tag) => (
                      <span
                        className="text-white uppercase text-sm tracking-wide m-2 bg-green-700 px-2 py-1 rounded-lg"
                        key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Image
                  src={item.coverImage.url}
                  height={item.coverImage.height}
                  objectFit="cover"
                  width={item.coverImage.width}
                  className="absolute"
                />
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}
