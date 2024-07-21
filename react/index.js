function ReactElement(type, className, attrs, children) {
  this.type = type;
  this.className = className;
  this.attrs = attrs;
  this.children = children;
}

function createElement(type, className, attrs, children) {
  return new ReactElement(type, className, attrs, children);
}

let state = null;
const useState = (initialValue) => {
  state = state || initialValue;
  const setState = (newState) => {
    state = newState(state);
    build();
  }

  return [
    state,
    setState
  ]
}

const demo = () => {
  const [count, setCount] = useState(0);

  return createElement(
    "div",
    "container",
    {},
    [
      createElement(
        "div",
        "counter",
        {},
        [
          createElement(
            "span",
            "count",
            {},
            count
          ),
          createElement(
            "button",
            "add",
            {
              onClick: () => {
                setCount(preCount => preCount + 1);
              }
            },
            "+"
          )
        ]
      ),
      createElement(
        "p",
        "name",
        {},
        "name"
      ),
      createElement(
        "p",
        "age",
        {},
        "age"
      ),
      createElement(
        "ul",
        "content",
        {},
        [
          createElement(
            "li",
            "item",
            {},
            "0"
          ),
          createElement(
            "li",
            "item",
            {},
            "1"
          ),
          createElement(
            "li",
            "item",
            {},
            "2"
          )
        ]
      )
    ]
  )
}

let oldVnode;
function render(vNode, el) {
  function createRealEl(vn) {
    const {
      type,
      className,
      attrs,
      children
    } = vn;
    const n = document.createElement(type);
    n.setAttribute("class", className);
    Object.keys(attrs).forEach(attrKey => {
      if (attrKey.startsWith("on")) {
        n.addEventListener(attrKey.slice(2).toLowerCase(), (event) => {
          attrs[attrKey](event);
        }, false);
      } else {
        n.setAttribute(attrKey, attrs[attrKey])
      }
    });
    if (Array.isArray(children)) {
      children.forEach(childVnode => n.appendChild(createRealEl(childVnode)));
    } else {
      n.textContent = children;
    }

    return n;
  }

  const rootEl = document.querySelector(el);

  function patch() {
    const cache = [];
    function loop(oldvn, vn, p) {
      if (typeof oldvn.children !== "object" && typeof vn.children !== "object" && oldvn.children !== vn.children) {
        cache.push(() => {
          document.querySelector(p).textContent = vn.children;
        });
      }

      Array.isArray(oldvn.children) && oldvn.children.forEach((child, idx) => loop(child, vn.children[idx], p + " " + "." + child.className));
    }

    loop(oldVnode, vNode, "." + vNode.className);
    cache.forEach(fn => fn());
  }

  if (!oldVnode) {
    const realEl = createRealEl(vNode);
    rootEl.appendChild(realEl);
  } else {
    // patch
    patch();
  }

  oldVnode = vNode;
}

function build() {
  render(demo(), "#root");
}

build();
