import React from "react";
import "./App.css";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Myrepositories from "./my-repositories";
import { Container, Row, Col } from "reactstrap";

const query = gql`
  {
    viewer {
      name
      email
    }
  }
`;

const App: React.FC = () => <div className="App">
  <Query query={query}>
    {result => {
      if (result.loading) return <p>loading...</p>;
      if (result.error) return <p>{result.error.message}</p>;
      return (
        <Container>
          <Row>
            <Col>
              <div>
                <h1>Name: {result.data.viewer.name}</h1>
                <p>Email: {result.data.viewer.email}</p>
              </div>
            </Col>
            <Col>
              <Myrepositories />
            </Col>
          </Row>
        </Container>
      );
    }}
  </Query>
</div>


export default App;