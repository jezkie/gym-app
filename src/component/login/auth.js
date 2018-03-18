export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(function () {
            cb(this.isAuthenticated);
        }.bind(this), 100);
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(function () {
            cb(this.isAuthenticated);
        }.bind(this), 100);
    }
}