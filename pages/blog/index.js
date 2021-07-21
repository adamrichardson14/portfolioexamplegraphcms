import Link from "next/link";
import { request } from "graphql-request";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (endpoint, query, variables) => request(endpoint, query, variables);
export const getStaticProps = async () => {
  const data = await fetcher(
    "https://api-eu-central-1.graphcms.com/v2/cko71v4sny8f901z1axdbc1u9/master",
    `
  
  {
    posts(orderBy: date_DESC) {
      title
      slug
      description
      date
      tags
      author {
        name
        image {
          url
          width
          height
        }
      }
    }
  }

  `,
  );
  return {
    props: {
      posts: data.posts,
    },
  };
};

export default function BlogPage({ posts }) {
  const [searchValue, setSearchValue] = useState("");
  const { data, error } = useSWR(
    [
      "https://api-eu-central-1.graphcms.com/v2/cko71v4sny8f901z1axdbc1u9/master",
      `
    query postSearch($searchValue: String) {
      posts(where: {title_contains: $searchValue}) {
        title
        slug
        description
        date
        tags
        author {
          name
          image {
            url
            width
            height
          }
        }
      }
    }
    
`,
      searchValue,
    ],
    (endpoint, query) => fetcher(endpoint, query, { searchValue }),
    {
      initialData: { posts },
      revalidateOnFocus: true,
    },
  );

  if (error) {
    return (
      <div>
        <h1>There is an error</h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
      <div className="flex">
        <input
          type="text"
          value={searchValue}
          className="border border-gray-200 w-full rounded-lg h-10 text-xl"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>
      <div className="mt-20 ">
        {data?.posts?.map((post) => (
          <div key={post.slug} className="grid grid-cols-1 md:grid-cols-4 py-6">
            <div className="mb-2 md:mb-0 md:col-span-1">
              <p className="text-gray-600 text-sm">{new Date(post.date).toDateString()}</p>
            </div>
            <div className="md:col-span-3">
              <Link href={`/blog/${post.slug}`}>
                <a className="text-2xl font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300">
                  {post.title}
                </a>
              </Link>
              <p className="text-gray-700 leading-relaxed">{post.description}</p>
              <div className="text-sm text-gray-900 font-semibold mt-1">{post.author.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
