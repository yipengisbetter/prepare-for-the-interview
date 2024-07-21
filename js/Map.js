(
  function (w, d) {
    class MyMap {
      constructor() {
        this.stack = [];
        this.size = 0;
      }

      get(k) {
        const item = this.stack.find(({ key }) => {
          return key === k;
        });

        return item.value;
      }

      set(k, v) {
        const idx = this.stack.findIndex(({ key }) => {
          return key === k;
        })

        if (idx > -1) {
          this.stack[idx].value = v;
        } else {
          this.stack.push({
            key: k,
            value: v
          });
          this.size ++;
        }
      }
    }

    const mym = new MyMap();
    mym.set('0', 0);
    mym.set('0', '0');
    mym.set('1', '1');
    console.log(mym);
    console.log(mym.get('0'));

  }
)(window, document);
