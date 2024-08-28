import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import News from './components/News';
import CategoryCard from './components/CategoryCard';
import Main from './components/main';
import TextToSpeech from './components/textToSpeech';
import About from './components/About';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'general',
      categories: ['Sports', 'Technology', 'Science', 'Business', 'Entertainment', 'Health']
    };
  }

  handleCategorySelect = (category) => {
    this.setState({ selectedCategory: category });
    this.setTextToSpeechEnabled(true); // Enable text-to-speech
  }
  
  handleReadTopHeadlines = () => {
    this.newsRef.handleReadTopHeadlines();
    this.setTextToSpeechEnabled(true); // Enable text-to-speech
  }
  
  setTextToSpeechEnabled = (isEnabled) => {
    this.setState({ isTextToSpeechEnabled: isEnabled });
  }

  handleStopReading = () => {
    this.newsRef.handleStopReading();
  }

  render() {
    const { categories, selectedCategory } = this.state;

    return (
      <Router>
        <div>
          <MyNavbar />
          <Routes>
            <Route path="/" element={
              <>
                <Main handleCategorySelect={this.handleCategorySelect} handleReadTopHeadlines={this.handleReadTopHeadlines} handleStopReading={this.handleStopReading} />
                <div className="container mt-4">
                  <div className="row categories-container">
                    {categories.map(category => (
                      <CategoryCard
                        key={category}
                        category={category}
                        onSelect={this.handleCategorySelect}
                        isSelected={selectedCategory === category}
                      />
                    ))}
                  </div>
                </div>
                <News key={selectedCategory} category={selectedCategory} ref={(ref) => this.newsRef = ref} />
              </>
            } />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
