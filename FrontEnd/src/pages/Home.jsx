import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
  const [videos, settVideo] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      const res =  await axios.get(`/videos/${type}`);
      settVideo(res.data);
    };
  }, [type]);
  return (
    <Container>
      {videos.map((video) => (
        <Card />
      ))}
      <Card />
      
    </Container>
  );
};

export default Home;
