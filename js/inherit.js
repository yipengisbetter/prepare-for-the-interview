(
  function (w, d) {

    function inherit(need, from) {
      if (typeof need !== 'function' || typeof from !== 'function') throw new Error("The first and second parameters must be of function type");

      var newProto = Object.create(from.prototype);

      newProto.constructor = need;
      need.prototype = newProto;

      Object.keys(from).forEach(fromKey => {
        if (!!need[fromKey]) return;

        need[fromKey] = from[fromKey];
      });

      return need;
    }

    A.sayHello = function() {
      console.log('hello world');
    }
    function A(name) {
      this.name = name;
    }

    function AA(name) {
      A.apply(this, arguments);
    }

    run("inherit", inherit, AA, A, "AA");

  }
)(window, document);
