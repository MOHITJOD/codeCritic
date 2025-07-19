import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState(` function uncleKoNamesteBolo() {
    print "nameste uncle!"
}`)

  const [ review, setReview ] = useState(`<--- code not submitted yet!`)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true)
    try {
      const response = await axios.post('/ai/get-review', { code })
      setReview(response.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right" style={{ position: 'relative', minHeight: '100px' }}>
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <Markdown rehypePlugins={[ rehypeHighlight ]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  )
}



export default App
