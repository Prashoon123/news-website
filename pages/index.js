import Head from "next/head";
import { useState } from "react";
import News from "../components/News";

export default function Home({ articles }) {
  const [articlesState, setArticlesState] = useState(articles);
  const [term, setTerm] = useState("");

  const searchNews = async () => {
    if (!term) return;

    const articlesResult = await fetch(
      `https://newsapi.org/v2/everything?q=${term}&sortBy=publishedAt&apiKey=20912d6153d043f5864a547fe31ca58d`
    ).then((res) => res.json());

    console.log(articlesResult);

    setArticlesState(articlesResult);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
      <Head>
        <title>News Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-row items-center justify-center mt-2">
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          type="text"
          placeholder="Search for news..."
          className="py-4 px-3 text-white outline-none bg-gray-800 caret-white rounded-full focus:outline-2 focus:outline-blue-900"
        />
        <button
          className="bg-gray-800 p-4 rounded-full ml-2"
          onClick={searchNews}
          disabled={!term}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              color="white"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 mx-10">
        {articlesState?.articles?.map((article) => (
          <News
            key={article?.url}
            newsUrl={article?.url}
            img={article?.urlToImage}
            title={article?.title}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const articles = await fetch(
    "https://newsapi.org/v2/everything?q=sports&sortBy=publishedAt&apiKey=20912d6153d043f5864a547fe31ca58d"
  ).then((res) => res.json());

  return {
    props: {
      articles,
    },
  };
}
