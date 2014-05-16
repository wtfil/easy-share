var React = require('react'),
    DOM = React.DOM,
    ReactModelMixin = require('./model').ReactModelMixin;

module.exports = React.createClass({
    
    mixins: [ReactModelMixin],

    render: function () {
        var done = this.state.progress === 1,
            progressClass = ['item__progress'];

        if (done) {
            progressClass.push('done');
        }

        return DOM.div({className: 'item', onClick: this._download},
            done ?
                DOM.a({className: 'item__name', href: 'ololo'}, this.props.file.name) :
                DOM.span({className: 'item__name'}, this.props.file.name),
            DOM.div({className: progressClass.join(' '), style: {width: this.state.progress * 100 + '%'}})
        );
    },

    _download: function () {
        this.model.set('current-file', this.props.file.name);
    }


});
