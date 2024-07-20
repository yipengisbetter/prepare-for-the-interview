(
  function (w, d) {

    run('objectCreate', objectCreate, {});
    run('objectCreate', objectCreate, []);
    // run('objectCreate', objectCreate);

    function objectCreate(target) {
      if (typeof target !== 'object') throw new Error('need a object type');

      var obj = {};
      Object.setPrototypeOf(obj, target);

      return obj;
    }

  }
)(window, document);
