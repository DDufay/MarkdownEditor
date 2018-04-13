import React from 'react'
import { sampleText } from "./sampleText"
import './App.css'
import './style/css/bootstrap.min.css'
import marked from 'marked'

class App extends React.Component {

    state = {
        text: sampleText
    };

    componentWillMount() {
        const text = localStorage.getItem('text');
        if (text) {
            this.setState({ text })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('text', nextState.text)
    }

    editText = (event) => {
        const text = event.target.value;
        this.setState({ text })
    };

    renderText = (text) => {
        const renderText = marked(text, { sanitize: true });
        return { __html: renderText }
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <textarea
                            rows="35"
                            className="form-control"
                            value={this.state.text}
                            onChange={(event) => this.editText(event)}
                        >
                        </textarea>
                    </div>
                    <div className="col-sm-6">
                        <div dangerouslySetInnerHTML={this.renderText(this.state.text)}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
