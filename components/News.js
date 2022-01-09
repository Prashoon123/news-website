function News({ title, img, newsUrl }) {
  return (
    <a href={newsUrl} target="_blank">
      <div
        href={newsUrl}
        className="bg-gray-900 p-4 m-10 shadow-2xl rounded-lg cursor-pointer"
      >
        <img src={img} alt="news-img" className="h-[200px] w-[400px]" />
        <h2 className="mt-2 font-bold text-xl text-white">{title}</h2>
      </div>
    </a>
  );
}

export default News;
