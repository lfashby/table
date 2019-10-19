import React from 'react';
import './App.css';
import data from './readme_json.json'
import TableEntries from './TableEntries.js'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            readme: data,
            readmeCopy: data
        }
        this.isoCodeRef = React.createRef();
        this.isoCodeLangRef = React.createRef();
        this.wikiNameRef = React.createRef();
        this.filterTable = this.filterTable.bind(this);
    }

    componentDidMount() {
        this.onSort(false, "wiktionary_name")
    }

    onSort(e, toSort) {
        if (e) {
            this.isoCodeLangRef.current.style.color = "black"    
            this.isoCodeRef.current.style.color = "black"
            this.wikiNameRef.current.style.color = "black"
            e.target.style.color = "blue"
        } else {
            this.wikiNameRef.current.style.color = "blue" // initialize with wiki blue
        }
        let vals = [...this.state.readmeCopy]
        vals.sort(function(a, b) {
            let a_access = Object.keys(a)[0]
            let b_access = Object.keys(b)[0]
            if (a[a_access][toSort] < b[b_access][toSort]) {
                return -1
            } 
            return 1
        })
        // Need to sort both of these to start
        this.setState({
            readmeCopy: vals,
            readme: vals.length === this.state.readme.length?vals:this.state.readme
        })
    }

    filterTable(e) {
        let filteredVals = this.state.readme.filter((ele) => {
            let ele_access = Object.keys(ele)[0];
            let val = ele[ele_access]["wiktionary_name"].slice(0, e.target.value.length).toLowerCase()
            if (val.includes(e.target.value.toLowerCase())) {
                return ele
            } 
            return null
        })
        this.setState({
            readmeCopy: e.target.value.length?filteredVals:this.state.readme
        })

    }

    render() {
        return (
        <div>
            <form>
                <input type="text" name="name" placeholder="Filter by Wiki language name" onChange={this.filterTable} />
            </form>
            <table>
                <tbody>
                    <tr>
                        <th>Link</th>
                            <th onClick={e => this.onSort(e, "iso639_code")} ref={this.isoCodeRef}>ISO 639-2 Code</th>
                            <th onClick={e => this.onSort(e, "iso639_name")} ref={this.isoCodeLangRef}>ISO 639 Language Name</th>
                            <th onClick={e => this.onSort(e, "wiktionary_name")} ref={this.wikiNameRef} className="wiki">Wiktionary Language Name</th>
                        <th>Case-folding</th>
                        <th>Phonetic/Phonemic</th>
                        <th># of entries</th>
                    </tr>
                    {this.state.readmeCopy.map((lang, i) => {
                        var accessVal = Object.keys(lang)[0];
                        return (
                            <TableEntries 
                                key={i}
                                link={accessVal}
                                isoCode={lang[accessVal]["iso639_code"]}
                                isoLang={lang[accessVal]["iso639_name"]}
                                wikiName={lang[accessVal]["wiktionary_name"]}
                                casefold={lang[accessVal]["casefold"]}
                                transcriptionLevel={lang[accessVal]["transcription_level"]}
                                numOfEntries={lang[accessVal]["num_of_entries"]}
                            />

                        )
                    }
                    )}
                </tbody>
            </table>
        </div>
        );
    }
}

export default App;
