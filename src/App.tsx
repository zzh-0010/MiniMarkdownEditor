import { useState } from "react"
import markdownCore from "../../markdownparser/src/Core"

type handleTextChange = (x: React.ChangeEvent<HTMLTextAreaElement>) => void

//输入区域
const TextInput = ({textContent, handleTextChange} : {textContent: string, handleTextChange: handleTextChange}) => {
  return(
    <div className="textInput full-height">
      <textarea 
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

  const handleTextChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    console.log(event.target.value);
    setTextContent(event.target.value);
  }

  const mdCore = new markdownCore(textContent);
  mdCore.coreParse();

  const html = mdCore.html;

  return (
    <div className="textRoot full-height">
      <Options />
      <div className="textArea full-height">
        <TextInput textContent={textContent} handleTextChange={handleTextChange}/>
        <Showtable html={html}/>
      </div>
    </div>
  )
}

//渲染结果展示区
const Showtable = ({html} : {html: string}) => {
  return (
    <section>
      <div className="result-html full-height" dangerouslySetInnerHTML={ { __html: html} }/>
    </section>
  )
}

//选项栏
const Options = () => { 
  return (
    <div className="toolbars headers">
      <button className="tool">
        <i className="bi bi-type-bold" unselectable="on" style={{fontSize: "1.5rem"}}></i>
      </button>

      <button className="tool">
        <i className="bi bi-type-italic" unselectable="on" style={{fontSize: "1.5rem"}}></i>
      </button>
      
      <button className="tool">
        <i className="bi bi-type-strikethrough" unselectable="on" style={{fontSize: "1.5rem"}}></i>
      </button>
      
      <button className="tool">
        <i className="bi bi-type-underline" unselectable="on" style={{fontSize: "1.5rem"}}></i>
      </button>
    </div>
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