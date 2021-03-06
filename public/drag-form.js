var React = require('react'),
    DownloadableItem = require('./downloadable-item'),
    ReactModelMixin = require('./model').ReactModelMixin,
    DOM = React.DOM;

function getFileSize(size) {
    if (size < 1e3) {
        return size + ' b';
    }
    if (size < 1e6) {
        return (size / 1e3).toFixed(1) + ' kb';
    }
    if (size < 1e9) {
        return (size / 1e6).toFixed(1) + ' Mb';
    }
    if (size < 1e12) {
        return (size / 1e9).toFixed(1) + ' Gb';
    }
}

module.exports = React.createClass({
    
    mixins: [ReactModelMixin],

    render: function () {
        var _this = this;

        return DOM.div({className: 'dragzone'},
            DOM.div({className: 'dragzone__hover', onClick: this._onClick}),
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
            })),

            this.state.remote && [
                /*DOM.h4({className: 'dragzone__shared-files-title'}, 'shared files:'),*/
                DOM.ul(null, this.state.remote.map(function (file) {
                    return DownloadableItem({file: file, model: _this.model});
                }))
            ]
        );
    },

    componentDidMount: function () {
        this._input = this.getDOMNode().querySelector('input');
    },

    _onFile: function () {
        this.model.set('files', [].slice.call(this._input.files));
    },

    _onClick: function () {
        this._input.click();
    }

});
