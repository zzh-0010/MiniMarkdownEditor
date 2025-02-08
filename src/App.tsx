import React, { useState, useRef } from 'react';
import markdownCore from "../../markdownparser/src/Core"

type handleTextChange = (x: React.ChangeEvent<HTMLTextAreaElement>) => void;
type myFunctionType = () => void;
type handleButtonClick =(x:string)=>void;
//输入区域
const TextInput = ({ textContent, handleTextChange, textareaRef }: { textContent: string, handleTextChange: handleTextChange, textareaRef: React.RefObject<HTMLTextAreaElement> }) => {
  return(
    <div className="textInput full-height">
      <textarea 
      ref={textareaRef}
      value={textContent}
      onChange={handleTextChange}
      className="textarea full-height"
      >
      </textarea>
    </div>
  )
}


//文本处理区域组件
const Textarea = () => {
  
  const [textContent, setTextContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // 工具函数
  const handleButtonClick = (buttonName: string) => {
    switch(buttonName){
      case "bold":
        handleBoldClick();
        break;
      case "italic":
        handleItalicClick();
        break;
      case "strikethrough":
        handleStrikethroughClick();
        break;
      case "h1":
        handleH1Click();
        break;
      case "h2":
        handleH2Click();
        break;
      case "h3":
        handleH3Click();
        break;
      case "h4":
        handleH4Click();
        break;
      case "h5":
        handleH5Click();
        break;
      case "h6":
        handleH6Click();
        break;
      case "quote":
        handleQuoteClick();
        break;
      case "horizontal line":
        handleHorizontalLineClick();
        break;
    }
  }
  const handleBoldClick = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      let textToInsert;
      if(selectionStart === selectionEnd){
        textToInsert="****";
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd,'preserve');
        textarea.setSelectionRange(selectionStart+2,selectionStart+2);
      }  
      else{
        textToInsert=`**${textContent.substring(selectionStart, selectionEnd)}**`;
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd, 'end');
      } 
      setTextContent(textarea.value); 
      textarea.focus(); 
    }
  };
  const handleItalicClick = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      let textToInsert;
      if(selectionStart === selectionEnd){
        textToInsert="**";
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd,'preserve');
        textarea.setSelectionRange(selectionStart+1,selectionStart+1);
      }  
      else{
        textToInsert=`*${textContent.substring(selectionStart, selectionEnd)}*`;
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd, 'end');
      } 
      setTextContent(textarea.value); 
      textarea.focus(); 
    }
  };
  const handleStrikethroughClick = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      let textToInsert;
      if(selectionStart === selectionEnd){
        textToInsert="~~~~";
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd,'preserve');
        textarea.setSelectionRange(selectionStart+2,selectionStart+2);
      }  
      else{
        textToInsert=`~~${textContent.substring(selectionStart, selectionEnd)}~~`;
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd, 'end');
      } 
      setTextContent(textarea.value); 
      textarea.focus(); 
    }
  };
  const handleQuoteClick = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      let textToInsert;
      if(selectionStart === selectionEnd){
        textToInsert="> ";
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd,'end');
      }  
      else{
        textToInsert=`> ${textContent.substring(selectionStart, selectionEnd)}`;
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd, 'end');
      } 
      setTextContent(textarea.value); 
      textarea.focus(); 
    }
  };
  const handleH1Click = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      let textToInsert;
      if(selectionStart === selectionEnd){
        textToInsert="# ";
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd,'end');
      }  
      else{
        textToInsert=`# ${textContent.substring(selectionStart, selectionEnd)}`;
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd, 'end');
      } 
      setTextContent(textarea.value); 
      textarea.focus(); 
    }
  };
  const handleH2Click = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      let textToInsert;
      if(selectionStart === selectionEnd){
        textToInsert="## ";
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd,'end');
      }  
      else{
        textToInsert=`## ${textContent.substring(selectionStart, selectionEnd)}`;
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd, 'end');
      } 
      setTextContent(textarea.value); 
      textarea.focus(); 
    }
  };
  const handleH3Click = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      let textToInsert;
      if(selectionStart === selectionEnd){
        textToInsert="### ";
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd,'end');
      }  
      else{
        textToInsert=`### ${textContent.substring(selectionStart, selectionEnd)}`;
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd, 'end');
      } 
      setTextContent(textarea.value); 
      textarea.focus(); 
    }
  };
  const handleH4Click = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      let textToInsert;
      if(selectionStart === selectionEnd){
        textToInsert="#### ";
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd,'end');
      }  
      else{
        textToInsert=`#### ${textContent.substring(selectionStart, selectionEnd)}`;
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd, 'end');
      } 
      setTextContent(textarea.value); 
      textarea.focus(); 
    }
  };
  const handleH5Click = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      let textToInsert;
      if(selectionStart === selectionEnd){
        textToInsert="##### ";
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd,'end');
      }  
      else{
        textToInsert=`##### ${textContent.substring(selectionStart, selectionEnd)}`;
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd, 'end');
      } 
      setTextContent(textarea.value); 
      textarea.focus(); 
    }
  };
  const handleH6Click = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      let textToInsert;
      if(selectionStart === selectionEnd){
        textToInsert="###### ";
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd,'end');
      }  
      else{
        textToInsert=`###### ${textContent.substring(selectionStart, selectionEnd)}`;
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd, 'end');
      } 
      setTextContent(textarea.value); 
      textarea.focus(); 
    }
  };
  const handleHorizontalLineClick = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      let textToInsert;
      
      // eslint-disable-next-line prefer-const
      textToInsert=`\n***\n${textContent.substring(selectionStart, selectionEnd)}`;
      textarea.setRangeText(textToInsert, selectionStart, selectionEnd, 'end');
      
      setTextContent(textarea.value); 
      textarea.focus(); 
    }
  };

  // 文本框内容修改时，自动渲染
  const handleTextChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
    // event.preventDefault();
    // console.log(event.target.value);
    setTextContent(event.target.value);
  }

  const mdCore = new markdownCore(textContent);
  mdCore.coreParse();

  const html = mdCore.html;

  return (
    <div className="textRoot full-height">
      <Options handleButtonClick={handleButtonClick} />
      <div className="textArea full-height">
        <TextInput textContent={textContent} handleTextChange={handleTextChange} textareaRef={textareaRef} />
        <ShowTable html={html}/>
      </div>
    </div>
  )
}

//渲染结果展示区
const ShowTable = ({html} : {html: string}) => {
  return (
    <section>
      <div className="result-html full-height" dangerouslySetInnerHTML={ { __html: html} }/>
    </section>
  )
}

//选项栏
const Options = ({ handleButtonClick }: { handleButtonClick:handleButtonClick}) => {
  return (
    <div className="toolbars headers">
      <Button icon="bi bi-type-bold" title="粗体" onClick={handleButtonClick} name="bold"/>
      <Button icon="bi bi-type-italic" title="斜体" onClick={handleButtonClick} name="italic"/>
      <Button icon="bi bi-type-strikethrough" title="删除线" onClick={handleButtonClick} name="strikethrough"/>
      <Button icon="bi bi-quote" title="引用" onClick={handleButtonClick} name="quote"/>
      <Button icon="bi bi-type-h1" title="标题1" onClick={handleButtonClick} name="h1"/>
      <Button icon="bi bi-type-h2" title="标题2" onClick={handleButtonClick} name="h2"/>
      <Button icon="bi bi-type-h3" title="标题3" onClick={handleButtonClick} name="h3"/>
      <Button icon="bi bi-type-h4" title="标题4" onClick={handleButtonClick} name="h4"/>
      <Button icon="bi bi-type-h5" title="标题5" onClick={handleButtonClick} name="h5"/>
      <Button icon="bi bi-type-h6" title="标题6" onClick={handleButtonClick} name="h6"/>
      <Button icon="bi bi-dash-lg" title="水平线" onClick={handleButtonClick} name="horizontal line"/>

    </div>
  )
}

const Button =({icon,title,name,onClick}:{icon:string, title:string, name:string, onClick:handleButtonClick})=>{
  return(
    <button className="tool" onClick={()=>onClick(name)}>
      <i className={icon}
      unselectable="on" 
      title={title}
      style={{fontSize: "1.5rem"}}
      ></i>
    </button>
  )
}



//标题区域
const Headers = () => {
  return (
    <div className="headers">
      <h1 className="header">Hello, Minimarkdown</h1>
    </div>
  )
}

const App = () => {
  return (
    <div className="full-height">
      <Headers />
      <Textarea />
    </div>
  )
}

export default App