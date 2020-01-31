import styled from "styled-components";
import { fontFamily, fontSize, btnRed } from "../Styles";

export const Container = styled.div`
  font-size: ${fontSize};

  .navbar {
    display: flex;
    justify-content: space-between;
    img {
      height: 3.5em;
      width: auto;
    }
    ul {
      display: flex;
      text-decoration: none;
      list-style: none;
      padding-right: 2em;
      a {
        padding: 5px;
        text-decoration: none;
        color: black;
        &:hover {
          color: ${btnRed};
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    font-size: 18px;
    .navbar {
      flex-direction: column;
      align-items: center;
      ul {
        margin: 0;
      }
    }
  }
`;
