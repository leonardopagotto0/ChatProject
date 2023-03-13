function Handler(config){this.config = config};
Handler.prototype.controller = function (controllerCallback) {
    return async (data, callback) => {
        controllerCallback(this.config, data, callback);
    }
}

export default Handler;