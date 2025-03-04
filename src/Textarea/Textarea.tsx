import markdownCore from "../../../markdownparser/src/Core"
import { Div } from '../styled/styled'; 
import { styled } from "styled-components";
import { useState, useRef, useEffect, lazy, startTransition, Suspense } from "react";
import React from "react";

enum colorSchemeMode{light,dark}
type handleButtonClick =(x:string)=>void;

const ExportModal = lazy(() => import('./export')); // 异步加载 ExportModal
const TableModal = lazy(() => import('./table')); // 异步加载 TableModal
const ImportImageModal = lazy(() => import('./image')); // 异步加载 ImportImageModal
const ImportLinkModal = lazy(() => import('./link')); // 异步加载 ImportLinkModal
const HelpModal = lazy(() => import('./help')); // 异步加载 HelpModal


//文本处理区域组件

const TextRoot=styled.div`
background-image: ${({ theme }) => theme.color.backgroundImage};
`
const Text=styled.textarea`
padding: 1rem 1.3rem;
width: 100%;
height: 98%;
resize: none;
background-color: ${({ theme }) => theme.color.inputBackground}; 
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(10px);
border-radius: 15px;
word-break: break-all;
border: solid 5px ${({theme})=>theme.color.border};
`
export const Textarea = ({toggleTheme,mode}:{toggleTheme:()=>void,mode:colorSchemeMode}) => {
  
  const [textContent, setTextContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
 
  // 文本框内容修改时，自动渲染
  const handleTextChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
    // event.preventDefault();
    setTextContent(event.target.value);
    localStorage.setItem('myText', event.target.value); //本地存储
  }

    const mdCore = new markdownCore(textContent);
    mdCore.coreParse();
    const html = mdCore.html;

  //本地存储文本输入
  useEffect(() => {
    const savedText = localStorage.getItem('myText');
    if (savedText) {
      setTextContent(savedText);
    }
  }, []);


  // 导出模态框相关
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // 表格模态框相关
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  //图片模态框相关
  const [isImportImageModalOpen, setIsImportImageModalOpen] = useState(false);

  //链接模态框相关
  const[isImportLinkModalOpen,setIsImportLinkModalOpen]=useState(false);

  //帮助模态框相关
  const[isHelpModalOpen,setIsHelpModalOpen]=useState(false);

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
      case "export":
        startTransition(()=>{setIsExportModalOpen(true);})
        break;
      case "ol":
        handleOrderedListClick();
        break;
      case "ul":
        handleUnorderedListClick();
        break;
      case "table":
        startTransition(()=>{setIsTableModalOpen(true);})
        break;
      case "image":
        startTransition(()=>{setIsImportImageModalOpen(true);})
        break;
      case "link":
        startTransition(()=>{setIsImportLinkModalOpen(true);})
        break;
      case "help":
        startTransition(()=>{setIsHelpModalOpen(true);})
        break;
      case "theme":
        toggleTheme();
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

  const handleUnorderedListClick = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      let textToInsert;
      if(selectionStart === selectionEnd){
        textToInsert="- ";
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd,'end');
      }  
      else{
        const selectedText = textarea.value.substring(selectionStart,selectionEnd);
        const textToInsert = `- ${selectedText.replace(/\n/g, '\n- ')}`;
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd, 'end');
      } 
      setTextContent(textarea.value); 
      textarea.focus(); 
    }
  };

  const handleOrderedListClick = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      let textToInsert;
      if(selectionStart === selectionEnd){
        textToInsert="1. ";
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd,'end');
      }  
      else{
        const selectedText = textarea.value.substring(selectionStart,selectionEnd);
        let counter = 1;
        const textToInsert = selectedText.split('\n').map(line => {
          if (line === '') { 
          return line;
          } else {
          return (counter++)+'. '+line;
          } 
        }).join('\n');  
        textarea.setRangeText(textToInsert, selectionStart, selectionEnd, 'end');
      } 
      setTextContent(textarea.value); 
      textarea.focus(); 
    }
  };




  //快捷键 :焦点需要集中在输入框中
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl + B 加粗
    if (event.ctrlKey && event.key === "b") {
      event.preventDefault(); 
      handleBoldClick();
    }

    //Ctrl + H 插入水平线
    else if (event.ctrlKey && event.key === "h") {
      event.preventDefault(); 
      handleHorizontalLineClick();  
    }
    //Ctrl + Q 插入引用
    else if (event.ctrlKey && event.key === "q") {
      event.preventDefault(); 
      handleQuoteClick();  
    }
    //Ctrl + 1 插入H1标题
    else if (event.ctrlKey && event.key === "1") {
      event.preventDefault(); 
      handleH1Click();
    }
    //Ctrl + 2 插入H2标题
    else if (event.ctrlKey && event.key === "2") {
      event.preventDefault(); 
      handleH2Click();
    }
    //Ctrl + 3 插入H3标题
    else if (event.ctrlKey && event.key === "3") {
      event.preventDefault(); 
      handleH3Click();
    }
    //Ctrl + 4 插入H4标题
    else if (event.ctrlKey && event.key === "4") {
      event.preventDefault(); 
      handleH4Click();
    }
    //Ctrl + 5 插入H5标题
    else if (event.ctrlKey && event.key === "5") {
      event.preventDefault(); 
      handleH5Click();
    }
    //Ctrl + 6 插入H6标题
    else if (event.ctrlKey && event.key === "6") {
      event.preventDefault(); 
      handleH6Click();
    }
    //Ctrl + e 导出文件
    else if (event.ctrlKey && event.key === "e") {
      event.preventDefault(); 
      setIsExportModalOpen(true);
    }
    //Ctrl + Shift + s 删除线
    else if (event.ctrlKey && event.shiftKey &&event.key === "s") {
      event.preventDefault(); 
      handleStrikethroughClick();
    }
    //Ctrl + Shift + i 插入图片
    else if (event.ctrlKey && event.shiftKey &&event.key === "i") {
      event.preventDefault(); 
      setIsImportImageModalOpen(true);
    }
    //Ctrl + I 斜体
    else if (event.ctrlKey && event.key === "i") {
      event.preventDefault(); 
      handleItalicClick();
    }
    //Ctrl + T 插入表格
    else if (event.ctrlKey && event.key === "t") {
      event.preventDefault(); 
      setIsTableModalOpen(true);
    }
    //Ctrl + L 插入链接
    else if (event.ctrlKey && event.key === "l") {
      event.preventDefault(); 
      setIsImportLinkModalOpen(true);
    }
    //Ctrl + U 插入无序表格
    else if (event.ctrlKey && event.key === "u") {
      event.preventDefault(); 
      handleUnorderedListClick();
    }
    //Ctrl + O 插入有序表格
    else if (event.ctrlKey && event.key === "o") {
      event.preventDefault(); 
      handleOrderedListClick();
    }
  }


  return (
    <TextRoot className="textRoot full-height">
      <Options handleButtonClick={handleButtonClick} mode={mode}/>
      
      <div className="textArea ">
        <div className="textInput full-height">
          <Text ref={textareaRef} 
          value={textContent} 
          onChange={handleTextChange} 
          onKeyDown={handleKeyDown} 
          className="textarea"  
          data-testid="my-textarea">
          </Text>
        </div>
        <ShowTable html={html}/>
      </div>
      
      {/* 模态框 */}
      <Suspense fallback={null}> {/* Suspense 包裹异步组件 */}
                {isExportModalOpen && <ExportModal isOpen={isExportModalOpen} onRequestClose={() => setIsExportModalOpen(false)} content={html} />}
                {isTableModalOpen && <TableModal isOpen={isTableModalOpen} onRequestClose={() => setIsTableModalOpen(false)} textareaRef={textareaRef} setTextContent={setTextContent} />}
                {isImportImageModalOpen && <ImportImageModal isOpen={isImportImageModalOpen} onRequestClose={() => setIsImportImageModalOpen(false)} textareaRef={textareaRef} setTextContent={setTextContent} />}
                {isImportLinkModalOpen && <ImportLinkModal isOpen={isImportLinkModalOpen} onRequestClose={() => setIsImportLinkModalOpen(false)} textareaRef={textareaRef} setTextContent={setTextContent} />}
                {isHelpModalOpen && <HelpModal isOpen={isHelpModalOpen} onRequestClose={() => setIsHelpModalOpen(false)} />}
      </Suspense>
    </TextRoot>
  )
}


//渲染结果展示区
const ShowTable = ({html} : {html: string}) => {
  return (
    <section role="region">
      <Div className="textarea full-height result-html" id="html-container" dangerouslySetInnerHTML={ { __html: html} } data-testid="result"/>
    </section>
  )
}

//选项栏
const Toolbars =styled.div`
background-color: ${({ theme }) => theme.color.modalBackground}; 
border: solid ${({theme})=>theme.color.border};
border-radius: 10px;
`
const Options = ({ handleButtonClick,mode }: { handleButtonClick:handleButtonClick,mode:colorSchemeMode}) => {
  return (
    <Toolbars className='toolbars'>
      <Button icon="bi bi-type-bold" title="粗体" onClick={handleButtonClick} name="bold" />
      <Button icon="bi bi-type-italic" title="斜体" onClick={handleButtonClick} name="italic"/>
      <Button icon="bi bi-type-strikethrough" title="删除线" onClick={handleButtonClick} name="strikethrough"/>
      <Button icon="bi bi-quote" title="引用" onClick={handleButtonClick} name="quote"/>
      <li className='divider' unselectable='on'>|</li>
      <Button icon="bi bi-type-h1" title="标题1" onClick={handleButtonClick} name="h1"/>
      <Button icon="bi bi-type-h2" title="标题2" onClick={handleButtonClick} name="h2"/>
      <Button icon="bi bi-type-h3" title="标题3" onClick={handleButtonClick} name="h3"/>
      <Button icon="bi bi-type-h4" title="标题4" onClick={handleButtonClick} name="h4"/>
      <Button icon="bi bi-type-h5" title="标题5" onClick={handleButtonClick} name="h5"/>
      <Button icon="bi bi-type-h6" title="标题6" onClick={handleButtonClick} name="h6"/>
      <Button icon="bi bi-dash-lg" title="水平线" onClick={handleButtonClick} name="horizontal line"/>
      <li className='divider' unselectable='on'>|</li>
      <Button icon="bi bi-list-ol" title="有序列表" onClick={handleButtonClick} name="ol"/>
      <Button icon="bi bi-list-ul" title="无序列表" onClick={handleButtonClick} name="ul"/>
      <Button icon="bi bi-table" title="表格" onClick={handleButtonClick} name="table"/>
      <Button icon="bi bi-image" title="图片" onClick={handleButtonClick} name="image"/>
      <Button icon="bi bi-link-45deg" title="链接" onClick={handleButtonClick} name="link"/>
      <Button icon="bi bi-arrow-down" title="导出" onClick={handleButtonClick} name="export"/>
      <li className='divider' unselectable='on'>|</li>
      <Button icon="bi bi-question-circle" title="使用帮助" onClick={handleButtonClick} name="help"/>
      <Button icon={mode===colorSchemeMode.light?"bi bi-brightness-high-fill" : "bi bi-moon-fill"} title="切换主题" onClick={handleButtonClick} name="theme"/>
    </Toolbars>
  )
}

const Tool=styled.button`
border: none;
background-color: ${({ theme }) => theme.color.modalBackground}; 

&:hover{
border:  #ccc;
border-radius: 2px;
background-color: ${({ theme }) => theme.color.resultBackground}; 
}
`

const Button =({icon,title,name,onClick}:{icon:string, title:string, name:string, onClick:(x:string)=>void})=>{
  return(
    <Tool className="tool" onClick={()=>onClick(name)} data-testid={name} >
      <i className={icon}
      unselectable="on" 
      title={title}
      style={{fontSize: "1.6rem"}}></i>
    </Tool>
  )
}

