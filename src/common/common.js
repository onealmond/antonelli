/** common/common.js */
export default {
  clone: function(obj) {
    if (obj == null) {
      return obj;
    }

    let copy = obj.constructor();
    for (var attr in obj) {
      copy[attr] = obj[attr];
    }
    return copy;
  },
}
