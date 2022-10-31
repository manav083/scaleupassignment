import React, { useEffect, useState } from "react";
import "./assets/css/custom.css";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "./store/index";
import PageLoader from "./PageLoader";

function App() {
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();

  const getList = async () => {
    try {
      const res = await axios.get(
        "https://public.connectnow.org.uk/applicant-test/"
      );
      dispatch(actions.assignList(res.data));
    } catch (e) {}
  };

  useEffect(() => {
    getList();
  }, [list]);

  const convertDate = (dateString) => {
    var d = new Date(dateString);
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    return curr_date + "-" + curr_month + "-" + curr_year;
  };

  for (let i = 0; i < list.length; i++) {
    console.log(list[i]);
  }

  const [nameSearch, setNameSearch] = useState("");

  return (
    <>
      <Container>
        <Row style={{ padding: "50px 0px 0px 70px" }}>
          <Col xl={2} lg={2} md={4} sm={12} xs={12}>
            <h3 style={{ margin: 0 }}>VIDEO GAMES</h3>
          </Col>
          <Col xl={8} lg={8} md={8} sm={12} xs={12}>
            <h3 style={{ margin: 0 }}>CONTACT</h3>
          </Col>
        </Row>
        <Row style={{ paddingTop: 50 }}>
          <Col xs={10} sm={10} md={10} lg={3} xl={3}>
            <div className="filterContainer">
              <h5>Filter Results</h5>
              <div>
                <h6>Name (contains)</h6>
                <input id="text" type="text" placeholder="Text String" value={nameSearch}/>
              </div>
              <div>
                <h6>Minimum Score</h6>
                <input id="text" type="text" placeholder="1-10" />
              </div>
              <div>
                <h6>Order By</h6>
                <select>
                  <option>Order By</option>
                  <option>Release Date</option>
                  <option>Score</option>
                  <option>Name</option>
                </select>
              </div>
            </div>
          </Col>
          <Col xs={10} sm={10} md={10} lg={8} xl={8}>
            {list &&
              list.map((element) => (
                <Row className="listContainer">
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={2}
                    xl={2}
                    style={{ padding: 0, margin: 0 }}
                  >
                    <div className="listImage"></div>
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={8}
                    xl={8}
                    style={{ padding: 10 }}
                  >
                    <h5>{element.name}</h5>
                    <h6>
                      Release Date: {convertDate(element.first_release_date)}
                    </h6>
                    <p>{element.summary.substring(0, 150)}...</p>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={2} xl={2}>
                    <div className="ratings">
                      {Math.floor(element.rating / 10)}
                    </div>
                  </Col>
                </Row>
              ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
