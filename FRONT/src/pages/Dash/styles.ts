import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
`;

export const CardsContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 300px;
    height: fit-content;
    max-height: calc(100vh - 30px);
    overflow: hidden;
    overflow-y: scroll;
    border-radius: 5px;
    background: #ccc;
`;