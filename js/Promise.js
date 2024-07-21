(
  function (w, d) {
    class MyPromise {
      constructor(fn) {
        if (typeof fn !== 'function') throw new TypeError("Promise resolver undefined is not a function");

        this.resolvedStack = [];
        this.rejectedStack = [];
        this.status = "pending";
        this.data = null;
        this.error = null;

        const resolve = (v) => {
          if (this.status === "pending") {
            this.status = "resolved";
            this.data = v;
            this.resolvedStack.forEach(fn => fn());
          }
        }

        const reject = (e) => {
          if (this.status === "pending") {
            this.status = "rejected";
            this.error = e;
            this.rejectedStack.forEach(fn => fn());
          }
        }

        try {
          fn(resolve, reject);
        } catch (e) {
          reject(e);
        }
      }

      then(onResolved, onRejected) {
        return new Promise((resolve, reject) => {
          if (this.status === "resolved") {
            try {
              const newData = onResolved(this.data);

              resolve(newData);
            } catch (e) {
              reject(e);
            }
          }

          if (this.status === "rejected") {
            try {
              const newData = onRejected(this.error);

              resolve(newData);
            } catch (e) {
              reject(e);
            }
          }

          if (this.status === "pending") {
            this.resolvedStack.push(() => {
              try {
                const newData = onResolved(this.data);
  
                resolve(newData);
              } catch (e) {
                reject(e);
              }
            })

            this.rejectedStack.push(() => {
              try {
                const newData = onRejected(this.error);
  
                resolve(newData);
              } catch (e) {
                reject(e);
              }
            })
          }
        });
      }
    }

    const myP = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve("Test MyPromise First");
      }, 2000);
    });

    myP.then(data => {
      console.log("MyPromise data will display 2000ms later: ", data);
    })

    const myP1 = new MyPromise((resolve, reject) => {
      resolve("Test myP1");
    });

    myP1.then(data => {
      console.log("myP1 data: ", data);
    })

    const myP2 = new MyPromise((resolve, reject) => {
      reject("Test myP2");
    });

    myP2.then(() => {
      
    }, (e) => {
      console.log("myP2 e: ", e);
    })

    const myP3 = new MyPromise((resolve, reject) => {
      throw new Error("Test myP3");
    });

    myP3.then(() => {
      
    }, (e) => {
      console.log("myP3 e: ", e);
    })

    const myP4 = new MyPromise((resolve, reject) => {
      throw new Error("Test myP4");
    });

    myP4.then(() => {
      
    }, (e) => {
      console.log("myP4 e: ", e);

      return 0;
    }).then((data) => {
      console.log("myP4 chain1 data", data);

      return 1;
    }).then((data) => {
      console.log("myP4 chain2 data", data);

      return 2;
    }).then((data) => {
      console.log("myP4 chain3 data", data);
    })

  }
)(window, document);
