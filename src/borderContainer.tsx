import * as React from "react";

class BorderContainer extends React.PureComponent{
    divStyle = {
        padding: '1em',
        border: 'solid 1px',
        'margin-bottom': '1em'
    };
    render(){
        return (
            <div style={this.divStyle}>
                {this.props.children}
            </div>
        )
    }
}

export {BorderContainer}