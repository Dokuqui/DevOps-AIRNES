import Footer from './Footer';
import Header from './Header';
import '../../styles/error404.scss';

const Error404Page = () => {
  return (
    <div>
      <Header />
        <div className="error404">
          <h1>404</h1>
          <h2>Page not found</h2>
          <p>Sorry, the page you are looking for does not exist.</p>
          <button className="btn" onClick={() => window.location.href = "/"}>Back to home</button>
        </div>
      <Footer />
    </div>
  );
};

export default Error404Page;
