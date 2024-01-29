import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import marked from "https://cdn.skypack.dev/marked@3.0.0";

const root = ReactDOM.createRoot(document.getElementById('root'));


marked.setOptions({
  renderer: new marked.Renderer(),
  breaks: true,
  gfm: true
})


let data = `
# Welcome to my React Markdown Previewer!
## This is a sub-heading...
There's also [links](https://www.freecodecamp.org), and
> Block Quotes!
Heres some code, \`<div></div>\`, between 2 backticks.
### Code Block
// this is multi-line code:
\`\`\`

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.
-![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
You can also make text **bold**... whoa!

Thank you very much for watching, 
made with love by Cam
`;


class Editor extends React.Component {
	render() {
		return (
			<div id="container" className="editor-container">
				<div id="header">
					<ul>
						<li>
							FCC
							<span>Editor</span>
						</li>
						<li>X</li>
					</ul>
				</div>
				{this.props.sharedElement}
			</div>
		);
	}
}

class Preview extends React.Component {
	render() {
		return (
			<div id="container" className="preview-container">
				<div id="header">
					<ul>
						<li>
							FCC
							<span>Previewer</span>
						</li>
						<li>X</li>
					</ul>
				</div>
				{this.props.sharedElement}
			</div>
		);
	}
}

class Markdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: data,
			markedText: marked.parse(data),
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState((state) => ({
			text: e.target.value,
			markedText: marked.parse(e.target.value),
		}));
	}

	render() {
		//let markedText = marked.parse(this.state.text);
		let divPreview = (
			<div
				// dangerouslySetInnerHTML={{ __html: markedText }}
				dangerouslySetInnerHTML={{ __html: this.state.markedText }}
				onChange={this.handleChange}
				id="preview"
			></div>
		);
		let textAreaEditor = (
			<textarea
				onChange={this.handleChange}
				id="editor"
				value={this.state.text}
			></textarea>
		);
		return (
			<div>
				<Editor sharedElement={textAreaEditor} />
				<Preview sharedElement={divPreview} />
			</div>
		);
	}
}
root.render(<App />);




/* TESTAREA: marked.parse works
class Test extends React.Component {
  render(){
    let someText = "_Hello World :)_"
    let someTextMarked = marked.parse(someText)
    return <h1>.................................................. {someTextMarked}</h1>
  }
}
ReactDOM.render(<Test />, document.getElementById("root"))*/



root.render(
  <React.StrictMode>
    <Markdown />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
