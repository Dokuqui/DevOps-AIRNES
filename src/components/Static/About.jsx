import Footer from './Footer';
import Header from './Header';
import '../../styles/about.scss';

const AboutPage = () => {
    const ceoPhoto = "https://images.squarespace-cdn.com/content/v1/58c5e0df86e6c02103de9e68/1668374770015-4FPNGMSJGVBRIB0VTCC3/Environmental+corporate+portrait.JPG"
  return (
    <div>
      <Header />
      <h2>About Us</h2>
      <div className="about-content">
        <div className="ceo-section">
          <div className="ceo-photo">
            <img src={ceoPhoto} alt="CEO" />
          </div>
          <div className="ceo-info">
            <h3>John Doe</h3>
            <h4>CEO</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget justo ut ipsum
              volutpat varius. Mauris non mauris libero. Phasellus non fermentum purus. Nullam non
              malesuada quam.
            </p>
          </div>
        </div>
        <div className="company-details">
          <h3>Our Company</h3>
          <p>
            Welcome to our website! We are dedicated to providing high-quality products and
            excellent customer service. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            eget justo ut ipsum volutpat varius. Mauris non mauris libero.{' '}
          </p>
          <p>
            Founded in 20XX, our company has been dedicated to providing high-quality products and
            excellent customer service. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            eget justo ut ipsum volutpat varius.
          </p>
          <p>
            Phasellus non fermentum purus. Nullam non malesuada quam. Proin nec felis sit amet justo
            vestibulum interdum. Integer ac elit consequat, dapibus justo eu, pharetra arcu.
          </p>
          <p>
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
            egestas. Nam nec vestibulum urna, in efficitur ligula.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
