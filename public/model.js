var EventEmiter = require('web-peer').EventEmiter;

var ReactModelMixin = {
    getInitialState: function () {
        this.model = this.props.model;
        return this.model.get();
    },
    componentWillMount: function () {
        this._onChange = this.setState.bind(this);
        this.model.on('*', this._onChange);
    },
    componentWillUnmount: function () {
        this.model.off('*', this._onChange);
    }
};


function copy(data) {
    return Object.keys(data).reduce(function (o, key) {
        o[key] = data[key];
        return o;
    }, {}); //replace it with Object.create(null);
}

function Model(data) {
    this._data = copy(data || {});
    EventEmiter.call(this);
}

Model.prototype = Object.create(EventEmiter.prototype);

Model.prototype.set = function (key, val) {
    var prev = this._data[key];
    if (prev === val) {
        return;
    }
    this._data[key] = val;
    this.emit('*', this._data);
    this.emit(key, val);
};

Model.prototype.get = function () {
    return this._data;
};

Model.ReactModelMixin = ReactModelMixin;
module.exports = Model;
