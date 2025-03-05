import { render, screen } from '@testing-library/react'
import { Headers } from './headers'
import { ThemeProvider } from 'styled-components';
import { colorTheme } from '../styled/themes'; 
import React from 'react';
test('<Headers>', () => {
  const mode=0;

  render(<ThemeProvider theme={colorTheme[mode]}> 
    <Headers />
  </ThemeProvider>)
  
  const element = screen.getByText('Markdown 在线编辑器')
  expect(element).toBeDefined()
})