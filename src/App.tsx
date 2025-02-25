import React, { useState} from 'react';
import { ThemeProvider } from 'styled-components';
import { colorTheme } from './styled/themes';
import { GlobalStyle } from './styled/GlobalStyle';
import { Textarea } from './Textarea/Textarea';
import { Headers } from './headers/headers';

//本地主题读取
enum colorSchemeMode{light,dark}
const savedTheme = localStorage.getItem('myTheme'); // 在组件渲染前读取
const initialMode = savedTheme === "light" ? colorSchemeMode.light : colorSchemeMode.dark;

const App = () => {

  const[mode,setMode]=useState<colorSchemeMode>(initialMode);

  const toggleTheme=()=>{
    if(mode===colorSchemeMode.dark){
      setMode(colorSchemeMode.light);
      localStorage.setItem('myTheme', "light"); 
    }
    else{
      setMode(colorSchemeMode.dark);
      localStorage.setItem('myTheme', "dark"); 
    }  
  }

  return (
    <ThemeProvider theme={colorTheme[mode]}>
      <GlobalStyle />
        <Headers />
        <Textarea toggleTheme={toggleTheme} mode={mode}/>
    </ThemeProvider>
  )
}

export default App