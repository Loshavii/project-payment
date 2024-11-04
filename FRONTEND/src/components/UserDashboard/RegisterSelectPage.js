
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../CSS/RegisterSelectPage.css'; // Updated CSS file for styling

// function RegisterSelectPage() {
//   const navigate = useNavigate();

//   const navigateToCoachDetail = () => {
//     navigate('/coach');
//   };

//   const handleCoachLogin = () => {
//     navigate('/register-coach');
//   };

//   const handleUserLogin = () => {
//     navigate('/register-user');
//   };

//   return (
//     <div className="landing-container">
//       <div className="left-content">
//         <h1>Welcome to Fitaybl</h1>
//         <p>
//           Track your fitness journey with personalized workout plans, virtual coaches, 
//           and advanced analytics designed to help you achieve your goals. Whether you're 
//           a beginner or a fitness expert, Fitaybl offers everything you need to stay on 
//           top of your progress.
//         </p>
//         <button className="find-coach-button" onClick={navigateToCoachDetail}>
//           Find a Coach
//         </button>
//       </div>

//       <div className="right-content">
//         <div className="top-right">
//           <button className="user-login-button" onClick={handleUserLogin}>
//             Login
//           </button>
//         </div>

//         <div className="bottom-right">
//           <div className="coachi-card">
//             <p>
//               Ready to help others reach their fitness goals? Join our platform and become a coach today!
//             </p>
//             <button className="coach-login-button" onClick={handleCoachLogin}>
//               Register Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterSelectPage;


import React from 'react';
import '../CSS/RegisterSelectPage.css';
import yogaImage from './img1.webp'; // replace with the path to the image file
import wellnessImage from './img1.webp'; // replace with the path to the wellness image
import { Link } from 'react-router-dom';

const RegisterSelectPage = () => {
  return (
    <div>
      {/* Wellness Journey Section */}
      <div className="select-container" id="about">
        <div className="select-content">
          <div className="select-image">
            <img
              src={yogaImage}
              alt="Yoga Pose"
              className="ima"
            />
          </div>
          <div className="select-text">
            <h2 className="heading">Welcome Back to Fitaybl!</h2>
            <p className="subtext">
                Your wellness journey continues here! At Fitaybl, we believe that every step you take brings you closer to your goals. Log in to unlock your personalized dashboard and access tailored resources designed just for you.
            </p>
            <p className="highlight">
                Reconnect with expert coaches, track your progress, and gain insights that empower you to elevate your fitness and well-being. Join our community of like-minded individuals who are all on a path to transformation and success!
            </p>
            <Link to="/register-user">
              <button className="cta-button" aria-label="Get Started">Continue Your Adventure</button>
            </Link>
          </div>

        </div>
      </div>

      {/* Holistic Wellness Section */}
      <div className="select-container" id="wellness">
        <div className="select-content">
        <div className="select-text">
          <h2 className="heading">Become a Coach with Fitaybl!</h2>
          <p className="subtext">
              Are you passionate about helping others achieve their fitness goals? Join Fitaybl and become part of a vibrant community dedicated to transforming lives! As a coach, you will have the opportunity to share your expertise, inspire others, and make a meaningful impact on their wellness journeys.
          </p>
          <p className="highlight">
              Enjoy access to innovative tools and resources that will help you connect with clients, track their progress, and personalize their experience. With Fitaybl, you can build your brand, expand your reach, and thrive in a supportive environment designed for growth.
          </p>
          <Link to="/register-coach">
              <button className="cta-button" aria-label="Get Started">Continue Your Adventure</button>
          </Link>
        </div>

          <div className="select-image">
            <img
              src={wellnessImage}
              alt="Wellness Activity"
              className="ima"
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default RegisterSelectPage;
