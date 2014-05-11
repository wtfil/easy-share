var React = require('react'),
    DOM = React.DOM;

function getFileSize(size) {
    if (size < 1e3) {
        return size + ' b';
    }
    if (size < 1e6) {
        return (size / 1e3).toFixed(1) + ' Mb';
    }
    if (size < 1e9) {
        return (size / 1e6).toFixed(1) + ' Gb';
    }
}

module.exports = React.createClass({

    getInitialState: function () {
        return {
        };
    },

    render: function () {
        console.log(this.state);
        return DOM.div({
            className: 'dragzone',
            onClick: this._onClick
        },
            DOM.h3({className: 'dragzone__title'}, 'Upload file'),
            DOM.span({className: 'dragzone__description'}, 'Drag here or choose file'),
            DOM.input({
                type: 'file',
                className: 'dragzone__file',
                onChange: this._onFile
            }),
            this.state.files && DOM.ul(null, this.state.files.map(function (file) {
                return DOM.li(null,
                    DOM.span({className: 'dragzone__name'}, file.name),
                    DOM.span({className: 'dragzone__size'}, getFileSize(file.size))
                );
            }))
        );
    },

    componentDidMount: function () {
        this._input = this.getDOMNode().querySelector('input');
    },

    _onFile: function () {
        console.log(this._input.files[0]);
        this.setState({'files': [].slice.call(this._input.files)});
    },

    _onClick: function () {
        this._input.click();
    }

});
