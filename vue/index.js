class Vue {
  constructor(options) {
    const {
      template,
      data,
      methods
    } = options;

    this.result = document.createDocumentFragment();
    this.template = template;
    this.data = data;
    this.methods = methods;

    this.createElment();
  }

  $mount(el) {
    const app = document.querySelector(el);
    Array.from(this.result.children).forEach(item => app.appendChild(item));
  }

  createElment() {
    const div = document.createElement("div");
    div.innerHTML = this.template;
    const loop = (childNodes) => {
      for (const child of childNodes) {
        const { nodeType } = child;

        if (nodeType === 1) {
          Array.from(child.attributes).forEach(({ name: attr }) => {
            if (/^@/.test(attr)) {
              const fnKey = child.getAttribute(attr);
              child.removeAttribute(attr);
              child.addEventListener(attr.slice(1), () => {
                this.methods[fnKey].call(this);
              }, false);
            }
          })
        }

        if (nodeType === 3) {
          const reg = /\{\{(.+)\}\}/g;
          child.textContent = child.textContent.replace(reg, ($, k) => {
            k = k.trim();
            let v = this.data[k];

            Object.defineProperty(this.data, k, {
              get() {
                return v;
              },

              set(newV) {
                v = newV;
                child.textContent = newV;
  
                return newV;
              }
            })

            return v;
          })
        }

        if (!!child.childNodes) loop(child.childNodes);
      }
    }
    loop(div.childNodes);

    this.result = div;
  }

}

new Vue({
  template: `<div><p>{{ a }}</p> <button @click="add">+</button></div>`,
  data: {
    a: 1
  },
  methods: {
    add() {
      this.data.a ++;
    }
  }
}).$mount("#app");
