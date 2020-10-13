// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/firebase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports.auth = void 0;
var firebaseConfig = {
  apiKey: "AIzaSyBT8l15j0FQj2cSAxEzn7N9go3oui73wok",
  authDomain: "jax-auction.firebaseapp.com",
  databaseURL: "https://jax-auction.firebaseio.com",
  projectId: "jax-auction",
  appId: "1:1086968407801:web:7c796080bf4f2959ec6428"
}; // Initialize Firebase

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var auth = firebase.auth();
exports.auth = auth;
var db = firebase.firestore();
exports.db = db;
},{}],"scripts/AuctionList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupAuction = void 0;
var auctionDomList = document.querySelector('#auct_list');

var setupAuction = function setupAuction(auctionList) {
  if (auctionList.length) {
    var html = '';
    auctionList.forEach(function (doc) {
      var auction = doc.data();
      var li = "\n            <li>\n            <div class=\"mb0 row header teal lighten-3 white-text\">\n            <span class=\"col s6 \"><h5>".concat(auction.title, "</h5></span>\n            <span class=\"col s6 right-align\"><h5>").concat(auction.price, "\u20AC</h5></span>\n            </div>\n            <div class=\"body\">\n            ").concat(auction.description, "\n            </div>\n            </li>\n            ");
      html += li;
    });
    auctionDomList.innerHTML = html;
  } else {
    auctionDomList.innerHTML = "\n        <h3> You have Sign In to view auction's</h3>\n        ";
  }
}; // setup materialize components


exports.setupAuction = setupAuction;
document.addEventListener('DOMContentLoaded', function () {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});
},{}],"scripts/auth.js":[function(require,module,exports) {
"use strict";

var _firebase = require("./firebase");

var _AuctionList = require("./AuctionList");

var signupForm = document.querySelector('#signup-form');
var loginForm = document.querySelector('#login-form'); // USER BIO INFORMATION MODAL

var accBio = document.querySelector('#user-bio'); // hide/show links menu depend of logged

var loggedOutLinks = document.querySelectorAll('.logged-out');
var loggedInLinks = document.querySelectorAll('.logged-in');

var menuUI = function menuUI(user) {
  if (user) {
    loggedInLinks.forEach(function (link) {
      return link.style.display = 'block';
    });
    loggedOutLinks.forEach(function (link) {
      return link.style.display = 'none';
    });
  } else if (!user) {
    loggedInLinks.forEach(function (link) {
      return link.style.display = 'none';
    });
    loggedOutLinks.forEach(function (link) {
      return link.style.display = 'block';
    });
  }
}; // HANDLE CLOSE MODAL


function closeModal(modalName, form) {
  var modal = document.querySelector("#modal-".concat(modalName));
  M.Modal.getInstance(modal).close();
  form.reset();
} // listen for auth status


_firebase.auth.onAuthStateChanged(function (user) {
  if (user) {
    localStorage.setItem("userId", user.uid);

    _firebase.db.collection('auctions').onSnapshot(function (snapshot) {
      (0, _AuctionList.setupAuction)(snapshot.docs);
    });

    accBio.innerHTML = "\n        <li>\n        ".concat(user.email, "\n        </li>\n        ");
    menuUI(user);
  } else if (!user) {
    menuUI(user);
    (0, _AuctionList.setupAuction)([]);
  }
}); // add new auction


var createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', function (ev) {
  ev.preventDefault();
  console.log(localStorage.getItem("userId"));

  _firebase.db.collection('auctions').add({
    title: createForm['title'].value,
    price: createForm['price'].value,
    description: createForm['description'].value
  }).then(function () {
    closeModal('create', createForm);
  }).catch(function (err) {
    return console.log(err, err.message);
  });
}); // register new user

signupForm.addEventListener('submit', function (ev) {
  ev.preventDefault(); // db.collections('users')

  var email = signupForm['email'].value;
  var password = signupForm['password'].value;
  closeModal("signup", signupForm);

  _firebase.auth.createUserWithEmailAndPassword(email, password).then(function (cred) {// console.log(cred.user);
  });
}); // login existing user

loginForm.addEventListener('submit', function (ev) {
  ev.preventDefault();
  var email = loginForm['login-email'].value;
  var password = loginForm['login-password'].value;

  _firebase.auth.signInWithEmailAndPassword(email, password).then(function (cred) {
    console.log(cred.user);
    closeModal("login", loginForm);
  });
}); // logout user

var logOut = document.querySelector('#logout');
logOut.addEventListener('click', function (ev) {
  ev.preventDefault();

  _firebase.auth.signOut().then(function () {
    console.log("user has been logged out");
  }).catch(function (error) {
    console.log('there went something wrong', error, error.message);
  });
});
},{"./firebase":"scripts/firebase.js","./AuctionList":"scripts/AuctionList.js"}],"scripts/modal.js":[function(require,module,exports) {
// setup components materialize css
document.addEventListener('DOMContentLoaded', function () {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  var items = document.querySelectorAll('collapsible');
  M.Collapsible.init(items);
});
},{}],"scripts/categories.js":[function(require,module,exports) {
var categories = ["electronics", "sport", "cars", "jobs", "animals", "health", "games", "houses"];
var selectCategories = document.querySelector("#select-categories");
categories.forEach(function (item) {
  var option = "\n    <option value=\"".concat(item, "\">\n     ").concat(item, "\n    </option>\n    ");
  selectCategories.innerHTML += option;
});
},{}],"scripts/app.js":[function(require,module,exports) {
require("/scripts/firebase.js");

require("/scripts/auth.js");

require("/scripts/AuctionList.js");

require("/scripts/modal.js");

require("/scripts/categories.js");
},{"/scripts/firebase.js":"scripts/firebase.js","/scripts/auth.js":"scripts/auth.js","/scripts/AuctionList.js":"scripts/AuctionList.js","/scripts/modal.js":"scripts/modal.js","/scripts/categories.js":"scripts/categories.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50679" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/app.js"], null)
//# sourceMappingURL=/app.c09d0a7b.js.map