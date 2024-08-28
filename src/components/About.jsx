import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      <h1>About VoxChronicle</h1>
      <p>VoxChronicle is a dynamic news application designed to keep you updated with the latest headlines from various categories such as Sports, Technology, Science, Business, Entertainment, and Health. Utilizing modern web technologies and APIs, VoxChronicle brings real-time news updates directly to your fingertips.</p>
      <h2>Features</h2>
      <ul>
        <li>Real-time news updates from reliable sources.</li>
        <li>Speech recognition for hands-free navigation.</li>
        <li>Text-to-speech functionality to read out news headlines and descriptions.</li>
        <li>Interactive and responsive user interface.</li>
        <li>Category-based news filtering for personalized content.</li>
      </ul>
      <h2>Technologies Used</h2>
      <ul>
        <li>React.js for building the user interface.</li>
        <li>Bootstrap for responsive design and styling.</li>
        <li>NewsAPI for fetching news articles.</li>
        <li>Web Speech API for speech recognition and text-to-speech.</li>
      </ul>
      <h2>About the Developer</h2>
      <p>This project was developed as a demonstration of integrating modern web technologies to create a functional and interactive web application. If you have any questions or feedback, feel free to contact us.</p>
    </div>
  );
}

export default About;
