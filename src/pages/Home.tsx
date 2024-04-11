import "./style/Home.css"; // Import the CSS file
import imageSrc from "./style/ip-spoofing-beitragsbild.jpg";

const Home = () => {
  return (
    <>
      <div className="body-home">
        <div className="container">
          <div className="content">
            <img
              src={imageSrc}
              alt="Description of the image"
              className="image"
            />

            <div className="box">
              <div className="team-info">
                <h1>Mitigating IP Spoofing Risks Project</h1>
              </div>
              <div className="team-info">
                <h4>
                  Hariharan S (21BIT0224) Shrinidhi B (21BIT0381), Preethi S
                  (21BIT0349)
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
