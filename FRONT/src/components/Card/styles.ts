import { Box } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

export const ContentContainerModal = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 24;
  border: 1px solid #aaa;
  background: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 450px;
`;
