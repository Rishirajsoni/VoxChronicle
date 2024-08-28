import React, { Component } from 'react';

export class NewsItem extends Component {
  DefIUrl = "https://www.hindustantimes.com/ht-img/img/2024/05/08/1600x900/blackhole_1715154503638_1715154503831.jpg";

  render() {
    let { title, description, ImageUrl, newsUrl, author, date } = this.props;
    return (
      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <img src={!ImageUrl ? this.DefIUrl : ImageUrl} className="card-img-top" alt="..." />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text mt-auto">
              <small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small>
            </p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary mt-2">Read more</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
