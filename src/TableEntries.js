import React from 'react' 

class TableEntry extends React.Component {
    render() {
        return (
            <tr key={this.props.id}>
                <td>{this.props.link}</td>
                <td>{this.props.isoCode}</td>
                <td>{this.props.isoLang}</td>
                <td>{this.props.wikiName}</td>
                <td>{this.props.casefold}</td>
                <td>{this.props.transcriptionLevel}</td>
                <td>{this.props.numOfEntries}</td>
            </tr>
        )
    }
}

export default TableEntry