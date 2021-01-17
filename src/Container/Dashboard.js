import React, { Component } from "react";
import NewsList from "../components/NewsList";
import axios from "axios";
import Form from "../components/Form";
import Spinner from "../components/Spinner/Spinner";
export default class App extends Component {
    state = {
        news: [],
        loading: true,
        filteredNews: [],
        searchString: "",
    };

    async componentDidMount() {
        this.getNewsItems();
    }

    getNews = (e) => {
        e.preventDefault();
        const newsName = e.target.elements.news.value;
        const filteredNews = this.state.news.filter((e) => {
            return e.story.headline
                .trim()
                .replace(/\s+/g, "")
                .toLowerCase()
                .includes(newsName.trim().replace(/\s+/g, "").toLowerCase());
        });

        const filteredArray = [...filteredNews];
        this.setState({
            loading: false,
            filteredNews: [...filteredArray],
            searchString: newsName,
        });
    };

    getNewsItems() {
        console.log("getNewsItems");
        axios
            .get(
                "https://nl-static-site-assets.s3.ap-south-1.amazonaws.com/reports.json"
            )
            .then((res) => {
                let updatedNews = [];
                console.log("res.data", res.data);
                res.data.items.forEach((item) =>
                    updatedNews.push({ ...item, liked: false })
                );
                this.setState({
                    news: updatedNews,
                    loading: false,
                });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: true });
            });
    }

    render() {
        const { news } = this.state;
        return (
            <div>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Let's Play</h1>
                    </header>
                    <Form getNews={this.getNews} />
                    {this.state.loading ? (
                        <Spinner />
                    ) : this.state.news.length < 1 ? (
                        <p>News can't be loaded</p>
                    ) : (
                        <NewsList
                            filteredNews={this.state.filteredNews}
                            news={news}
                            searchString={this.state.searchString}
                        />
                    )}
                </div>
            </div>
        );
    }
}
