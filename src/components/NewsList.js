import Auxillary from "../hoc/Auxillary";
import NewsCard from "./NewsCard/NewsCard";

const NewsList = ({ news, filteredNews, searchString }) => {
    return (
        <Auxillary>
            <Auxillary>
                <div className="container">
                    {searchString !== "" ? (
                        <Auxillary>
                            <h3 className="text-center">Filtered News</h3>
                            <div className="row">
                                {filteredNews.map((item, index) => (
                                    <NewsCard
                                        key={item.id}
                                        index={index}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </Auxillary>
                    ) : (
                        <Auxillary>
                            <h3 className="text-center">Simple News</h3>
                            <div className="row">
                                {news.map((item, index) => (
                                    <NewsCard
                                        key={item.id}
                                        index={index}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </Auxillary>
                    )}
                </div>
            </Auxillary>
        </Auxillary>
    );
};

export default NewsList;
