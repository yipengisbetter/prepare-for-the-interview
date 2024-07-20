(
  function (w, d) {

    function objectCreate(target) {
      if (typeof target !== 'object') throw new Error('The first parameter is not of object type');

      var obj = {};
      Object.setPrototypeOf(obj, target);

      return obj;
    }

    run('objectCreate', objectCreate, {});
    run('objectCreate', objectCreate, []);
    // run('objectCreate', objectCreate);
  }
)(window, document);
