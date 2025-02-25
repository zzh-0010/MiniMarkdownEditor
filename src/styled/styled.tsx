import styled from "styled-components"
import  Modal  from 'styled-react-modal';


export const Div=styled.div`
padding: 1rem 1.3rem;
width: 100%;
height: 98%;
resize: none;
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(10px);
border-radius: 15px;
word-break: break-all;
background-color: ${({ theme }) => theme.color.resultBackground}; 
border: solid 5px ${({theme})=>theme.color.border};
`

export const StyledModal = Modal.styled`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    border: solid 5px ${({theme})=>theme.color.border};
    border-radius: 15px;
    padding: 1rem 2rem;
    background-color: ${({ theme }) => theme.color.modalBackground}; 

  & button{
    background-color: ${({ theme }) => theme.color.modalBackground}; 
    border: ${({theme})=>theme.color.border} solid 2px;
    padding: .2rem;
    border-radius: 5px;
    float: right;
  }

 & th, td{
    border: 1px solid ${({ theme }) => theme.color.text}; /* 设置单元格边框 */
    padding: 3px 15px ;
    text-align: left;
 }

`
