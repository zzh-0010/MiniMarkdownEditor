import { styled } from "styled-components";


//标题区域
const StyledHeader = styled.div`
background-color: ${({ theme }) => theme.color.head}; 

`;

export const Headers = () => {
  return (
    <StyledHeader className="header">
      <i className="bi bi-markdown"></i>
      Markdown 在线编辑器
    </StyledHeader>
  )
}