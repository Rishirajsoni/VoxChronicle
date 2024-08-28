import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import TextToSpeech, { stopSpeech } from './textToSpeech'; // Import stopSpeech

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
  }
  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 0,
      textToSpeak: '' // Added to hold the text to be spoken
    }
  }

  async componentDidMount() {
    this.fetchNewsData();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.fetchNewsData();
    }
  }

  async fetchNewsData() {
    const { country, category, pageSize } = this.props;
    let ApiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=6d1fa2128e7f4a34aa38fdbd66a8d19b&page=${this.state.page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(ApiUrl);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  handlePrevClick = async () => {
    let newPage = this.state.page - 1;
    this.setState({ page: newPage }, () => {
      this.fetchNewsData();
    });
  }

  handleNextClick = async () => {
    let newPage = this.state.page + 1;
    this.setState({ page: newPage }, () => {
      this.fetchNewsData();
    });
  }

  handleReadTopHeadlines = () => {
    const headlines = this.state.articles.map(article => article.title).join('. ');
    this.setState({ textToSpeak: headlines });
  }

  handleStopReading = () => {
    stopSpeech();
  }

  render() {
    return (
      <div className="container my-3">
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <NewsItem key={element.url} title={element.title} description={element.description} ImageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
            );
          })}
        </div>
        <div className="d-flex justify-content-between my-3">
          <button disabled={this.state.page <= 1} className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        <TextToSpeech text={this.state.textToSpeak} /> {/* Added TextToSpeech component */}
      </div>
    );
  }
}

export default News;
