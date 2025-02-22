import { ModalProvider } from 'styled-react-modal'
import { StyledModal } from './styled'
import React, { ChangeEvent, useState } from 'react'


interface TableModalProps{
    isOpen:boolean;
    onRequestClose:()=>void;
    textareaRef:React.RefObject<HTMLTextAreaElement>;
    setTextContent: React.Dispatch<React.SetStateAction<string>>;
}
const TableModal:React.FC<TableModalProps>=({isOpen,onRequestClose,textareaRef,setTextContent})=>{
    const[rows,setRows]=useState(3);
    const[columns,setColumns]=useState(2);
    const[alignment,setAlignment]=useState("left");
    
    const handleAlignmentChange =(alignment:string)=>{
        switch(alignment){
            case "left":
                setAlignment("left");
                break;
            case "center":
                setAlignment("center");
                break;
            case "right":
                setAlignment("right");
                break;
        }
    }

    const importTable=()=>{
        if (textareaRef.current) {
            const textarea = textareaRef.current;
            const selectionStart = textarea.selectionStart;
            const selectionEnd = textarea.selectionEnd;
            let textToInsert=`${textarea.value.substring(selectionStart, selectionEnd)}\n`;
            
            for(let i=0;i<columns;i++){
                textToInsert+="|   ";
            }
            textToInsert+="|\n";
            if(alignment==="left"){
                for(let i=0;i<columns;i++){
                    textToInsert+="|:--";
                }
            }else if(alignment==="center"){
                for(let i=0;i<columns;i++){
                    textToInsert+="|:-:";
                }
            }else if(alignment==="right"){
                for(let i=0;i<columns;i++){
                    textToInsert+="|--:";
                }
            }
            textToInsert+="|\n";
            for(let i=0;i<rows-2;i++){
                for(let j=0;j<columns;j++){
                    textToInsert+="|   ";
                }
                textToInsert+="|\n";
            }
            textarea.setRangeText(textToInsert, selectionStart, selectionEnd, 'end');
            setTextContent(textarea.value); 
            textarea.focus(); 
          }

        //记得改回默认左对齐，因为单选按钮那边这样方便点哈哈哈
        setAlignment("left");
        onRequestClose();
    }

    const handleRowsChange = (value: number) => {
        setRows(value);
    };
    const handleColumnsChange = (value: number) => {
        setColumns(value);
    };

    return(
        <ModalProvider>
            <StyledModal isOpen={isOpen} onBackgroundClick={onRequestClose}  onEscapeKeydown={onRequestClose} allowScroll={true} >
                <div className='modal-header'>
                        添加表格
                </div>
                <hr></hr>
                <div>
                    <p> 
                        <label> 
                            行数(最小为2)
            
                            <NumberInput min={2} onChange={handleRowsChange} value={rows}/>
                        </label>
                    </p>
                    <div>
                        <label>
                            列数(最小为1)
                        
                            <NumberInput min={1} onChange={handleColumnsChange} value={columns}/>
                        </label>
                    </div>
                    <AlignmentSelector handleAlignmentChange={handleAlignmentChange} alignment={alignment}/>
                    <p>
                        <button onClick={onRequestClose} className='modal-button'>取消</button>
                        <button onClick={importTable} className='modal-button'>确定</button>
                    </p>
                </div>
            </StyledModal>
        </ModalProvider>
    )
}

const AlignmentSelector = ({handleAlignmentChange,alignment}:{handleAlignmentChange:(x:string)=>void,alignment:string}) => {
    return (
      <div className='radios'>
        对齐方式：
        <label className='modal-label'>
            <input type='radio' name="alignment"  onChange={()=>handleAlignmentChange("left")} checked={alignment === "left"}></input>
            <i className="bi bi-text-left"></i>
        </label>
        <label className='modal-label'>
            <input type='radio' name="alignment" onChange={()=>handleAlignmentChange("center")} checked={alignment === "center"}></input>
            <i className="bi bi-text-center"></i>
        </label>
        <label className='modal-label'>
            <input type='radio' name="alignment"  onChange={()=>handleAlignmentChange("right")} checked={alignment === "right"}></input>
            <i className="bi bi-text-right"></i>
        </label>
      </div>
    );
}

interface NumberInputProps {
  min: number;
  onChange: (value: number) => void;
  value:number;
}

const NumberInput: React.FC<NumberInputProps> = ({ min, onChange,value}) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.target.value);
    const newValue = isNaN(inputValue) ? min : Math.max(min, inputValue);
    onChange(newValue);
  };

  return (
    <input type="number" value={value} min={min} onChange={handleChange} />
  );
};

  export default TableModal;