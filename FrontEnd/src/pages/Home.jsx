import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from 'axios'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
  const [videos, settVideo] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      const res =  await axios.get(`http://localhost:5000/videos/${type}`).catch((err) => console.log(err));
      console.log(res.data)
      settVideo(res.data.data);
    };
    fetchVideo();
  }, [type]);
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
