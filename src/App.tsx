import { useState } from "react"
import markdownCore from "../../markdownparser/src/Core"

const Textarea = () => { //文本输入区域组件
  
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
    <div className="textArea">
      <textarea 
      value={textContent}
      onChange={handleTextChange}>
      </textarea>
      <Showtable html={html}/>
    </div>
  )
}

//渲染结果展示区
const Showtable = ({html} : {html: string}) => {
  return (
    <section>
      <div className="result-html" dangerouslySetInnerHTML={ { __html: html} }/>
    </section>
  )
}

//选项栏
const Options = () => { 
  const Opt = ['html', 'xhtmlOut', 'breaks'];
  return (
    <div className="Options">
      {
        Opt.map((opt, index) => (
          <Option opt={opt} key={index}/>
        ))
      }
    </div>
  )
}

const Option = ( {opt} : {opt: string} ) => { //选项栏中的单个选项
  return (
    <div className="Option">
      <input type="checkbox" id={opt} name="opt"/>{` ${opt} `}
    </div>
  )
}

const Headers = () => {
  return (
    <div className="headers">
      <h1>Hello, Minimarkdown</h1>
      <Options />
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Headers />
      <Textarea />
    </div>
  )
}

export default App