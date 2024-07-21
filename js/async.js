(
  function (w, d) {

    function generator() {
      const args = Array.prototype.slice.call(arguments);

      return {
        next: () => {
          if (args.length === 0) {
            return {
              value: undefined,
              done: true
            }
          }

          if (args.length === 1 && !!args[0]?.returns) {
            const v = args.shift().returns;

            return {
              value: v,
              done: true
            }
          }

          const v = args.shift();
          return {
            value: v,
            done: false
          }
        }
      }
    }

    const gen = generator(0, 1, 2)

    console.log(gen.next());  // 0 false
    console.log(gen.next());  // 1 false
    console.log(gen.next());  // 2 false
    console.log(gen.next());  // undefined true
    console.log(gen.next());  // undefined true

    const gen1 = generator(0, 1, 2, { returns: "gen1 returns" });

    console.log(gen1.next());  // 0 false
    console.log(gen1.next());  // 1 false
    console.log(gen1.next());  // 2 false
    console.log(gen1.next());  // gen1 returns true
    console.log(gen1.next());  // undefined true

    function co(genFn) {
      if (typeof genFn !== "function") return;

      const gen = genFn();

      if (typeof gen.next !== "function") return;

      return new Promise((resolve, reject) => {
        function next() {
          const result = gen.next();
          run(result);
        }

        function run(result) {
          if (result.done) {
            return resolve(result.value);
          }

          const newVal = result.value instanceof Promise ? result.value : Promise.resolve(result.value);

          newVal.then(() => {
            next();
          }, (e) => {
            reject(e)
          })
        }

        next();
      })
    }

    co(
      function *() {
        yield 0;
        yield Promise.resolve(1);
        yield Promise.resolve(2);

        return "co done";
      }
    ).then((data) => {
      console.log(data);
    })
    console.log("start co");

  }
)(window, document);
