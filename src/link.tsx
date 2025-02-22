import React, { useState } from 'react';
import { ModalProvider } from 'styled-react-modal'
import { StyledModal } from './styled'

interface ImportLinkModalProps{
    isOpen:boolean;
    onRequestClose:()=>void;
    textareaRef:React.RefObject<HTMLTextAreaElement>;
    setTextContent: React.Dispatch<React.SetStateAction<string>>;
}

const ImportLinkModal:React.FC<ImportLinkModalProps> =({isOpen,onRequestClose,textareaRef,setTextContent})=>{

    const[linkDescription,setLinkDescription]=useState("");
    const[link,setLink]=useState("");

    const ImportLink =()=>{
        if (textareaRef.current) {
            const textarea = textareaRef.current;
            const selectionStart = textarea.selectionStart;
            const selectionEnd = textarea.selectionEnd;
            let textToInsert=`${textarea.value.substring(selectionStart, selectionEnd)}\n`;
            
            if(link){
                if(linkDescription){
                    textToInsert+="["+linkDescription+"]("+link+")";
                }
                else{
                  textToInsert+="["+link+"]("+link+")";  
                }
            }
            else{
                alert("链接地址不能为空。");
            }

            textarea.setRangeText(textToInsert, selectionStart, selectionEnd, 'end');
            setTextContent(textarea.value); 
            textarea.focus(); 
          }
        onRequestClose();
    }

    return(
         <ModalProvider>
            <StyledModal isOpen={isOpen} onBackgroundClick={onRequestClose}  onEscapeKeydown={onRequestClose} allowScroll={true} >
                <div className='modal-header'>
                        添加链接
                </div>
                <hr></hr>
                <div>
                    <p>
                        <label>
                            链接地址：
                            <input type='text' value={link} onChange={(e)=>setLink(e.target.value)}></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            链接标题：
                            <input type='text' value={linkDescription} onChange={(e)=>setLinkDescription(e.target.value)}></input>
                        </label>
                    </p>
                    <p>
                        <button onClick={onRequestClose} className='modal-button'>取消</button>
                        <button onClick={ImportLink} className='modal-button'>确定</button>
                    </p>
                </div>
                </StyledModal>
        </ModalProvider>
    )
}


export default ImportLinkModal