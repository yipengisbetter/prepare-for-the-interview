(
  function (w, d) {

    run('objectCreate', objectCreate, {});

    function objectCreate(target) {
      if (typeof target !== 'object' || target === null) return;

      var obj = {};
      Object.setPrototypeOf(obj, target);

      return obj;
    }

  }
)(window, document);
