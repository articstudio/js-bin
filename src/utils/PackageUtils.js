module.exports = {
    getPackageFromDirectory: function (dir) {
        let dir_arr = dir.split('/');
        if (dir_arr.length === 1) {
            return dir;
        }
        if (dir_arr.length > 2) {
            dir_arr.splice(0, 2, dir_arr[0] + '/' + dir_arr[1]);
        }
        return dir_arr.join('-');
    },
    getPackageDirectory: function (package_name) {
        let dir_arr = package_name.split('-');
        if (dir_arr.length > 1) {
            dir_arr.splice(0, 2, dir_arr[0] + '/' + dir_arr[1]);
        }
        return dir_arr.join('-');
    }
};