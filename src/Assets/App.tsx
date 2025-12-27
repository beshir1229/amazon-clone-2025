import React from 'react'
import ComponentA from '../ComponentA'
import ComponentB from '../ComponentB'
import { ThemeProvider } from '../contextProvider'

function App() {
  return (
    <ThemeProvider>
      <ComponentA />
      <ComponentB />
    </ThemeProvider>
  );
}

export default App