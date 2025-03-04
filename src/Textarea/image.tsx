import React, { useState } from 'react';
import { ModalProvider } from 'styled-react-modal';
import { StyledModal } from '../styled/styled';

interface ImportImageModalProps{
    isOpen:boolean;
    onRequestClose:()=>void;
    textareaRef:React.RefObject<HTMLTextAreaElement>;
    setTextContent: React.Dispatch<React.SetStateAction<string>>;
}

const ImportImageModal:React.FC<ImportImageModalProps> =({isOpen,onRequestClose,textareaRef,setTextContent})=>{

    const[imageAddress,setImageAddress]=useState("");
    const[imageDescription,setImageDescription]=useState("");
    const[imageLink,setImageLink]=useState("");

    const ImportImage =()=>{
        if (textareaRef.current) {
            const textarea = textareaRef.current;
            const selectionStart = textarea.selectionStart;
            const selectionEnd = textarea.selectionEnd;
            let textToInsert=`${textarea.value.substring(selectionStart, selectionEnd)}\n`;

            if(imageAddress&&imageLink){
                textToInsert+="[!["+imageDescription+"]("+imageAddress+")]("+imageLink+")";
            }
            else if(imageAddress&&!imageLink){
                textToInsert+="!["+imageDescription+"]("+imageAddress+")";  
            }
            else if(!imageAddress&&imageLink){
                textToInsert+="[!["+imageDescription+"]("+imageLink+")]("+imageLink+")";
            }
            else{
                alert("图片地址和图片链接不能为都为空。");
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
                    添加图片
            </div>
            <hr></hr>
            <div >
                <p>
                    <label>
                        图片地址：
                        <input type='text' value={imageAddress} onChange={(e)=>setImageAddress(e.target.value)}></input>
                    </label>
                </p>
                <p>
                    <label>
                        图片描述：
                        <input type='text' value={imageDescription} onChange={(e)=>setImageDescription(e.target.value)}></input>
                    </label>
                </p>
                <p>
                    <label>
                        图片链接：
                        <input type='text' value={imageLink} onChange={(e)=>setImageLink(e.target.value)}></input>
                    </label>
                </p>
                <p>
                    <button onClick={onRequestClose} className='modal-button'>取消</button>
                    <button onClick={ImportImage} className='modal-button'>确定</button>
                </p>
            </div>
            </StyledModal>
        </ModalProvider>
    )
}


export default ImportImageModal