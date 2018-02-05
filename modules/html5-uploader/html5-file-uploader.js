/**
 * 使用HTML5完成文件上传
 */


(function (root) {

  //默认10G
  var MAX_FILE_SIZE = 1024 * 1024 * 1024 * 10;
  var empty = function () {
  };
  //默认配置
  var defaultOptions = {
    allowWeak: true,
    auto: false, //选择文件后自动上传
    fileSizeLimit: MAX_FILE_SIZE, //验证文件总大小是否超出限制, 超出则不允许加入队列。
    fileSingleSizeLimit: MAX_FILE_SIZE, //验证文件总大小是否超出限制, 超出则不允许加入队列。
    allowFile: undefined,//允许的文件类型
    pick: undefined,//指定选择文件的按钮容器，不指定则不创建按钮
    el: undefined,//匹配css选择器,一般是文件输入框
    url: undefined,//上传URL地址
    formData: undefined,//文件上传请求的参数表，每次发送都会发送此对象中的参数
    fileNumLimit: undefined,//验证文件总数量, 超出则不允许加入队列。
    success: empty,
    error: empty,
    addAfter: empty
  };

  //全局变量
  root.WebUploader = Uploader;
  WebUploader.config = {
    options: defaultOptions,
    debug: false
  };

  var _log = function () {
    if (WebUploader.config.debug) {
      console.error.apply(console, arguments);
    }
  };

  var each = function (arr, cb) {
    for (var i = 0, len = arr.length; i < len; i++) {
      cb(arr[i], i, arr);
    }
  };

  //初始化选项
  function _init (options) {
    options = options || {};
    for (var key in defaultOptions) {
      if (options[key] !== undefined) {
        this[key] = options[key];
      } else {
        this[key] = defaultOptions[key];
      }
    }
    this.allowFile = this.allowFile.map(function (item) {
      return item.toLowerCase();
    });
  }

  function _addFileEventListener () {
    var self = this;
    if (!this.el && !this.pick) {
      _log('初始化失败,请确定el或pick');
      return false;
    }

    var list = null;
    if (self.el) {
      if (typeof self.el === 'string') {
        list = document.querySelectorAll(self.el);
      } else {
        list = self.el;
      }
    } else {
      var inputEL = document.createElement('input');
      inputEL.setAttribute('type', 'file');
      list = inputEL;
    }
    self.$el = list;
    list = list.length ? list : [list];
    each(list, function (dom) {
      dom.addEventListener('change', function () {
        self.add(this);
        if (self.auto) {
          self.ajax(self.formData);
        }
      }, false);
    });

    var fileMonitor = function ($pick) {
      $pick.addEventListener('click', function (e) {
        self.$picker = e.target;
        each(list, function (dom) {
          dom.click();
        });
      }, false);
    }

    var pick = this.pick;
    if (pick) {
      if (typeof pick === 'string') {
        pick = document.querySelectorAll(pick);
      }

      if (pick instanceof Node) {
        fileMonitor(pick);
      } else if (pick instanceof NodeList) {
        each(pick, function (dom) {
          fileMonitor(dom);
        });
      }
      this.$pick = pick;
    }
  }

  //对文本文件进行处理
  function _addFile (file, el) {
    if (file instanceof File) {
      if (file.size > this.fileSingleSizeLimit) {
        this.error({ status: 5001, msg: '文件大小不合适' });
        _log('上传失败', '文件:' + file.name + ', 大小:' + file.size + ', 允许的大小:' + this.fileSingleSizeLimit);
        return false;
      }

      var suffix = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();
      var type = 'image/' + suffix;
      if (this.allowFile && this.allowFile.indexOf(file.type) === -1) {

        if (this.allowWeak) {
          if (this.allowFile.indexOf(type) === -1) {
            this.error({ status: 5002, msg: '文件类型不允许' });
            _log('上传失败', '文件:' + file.name + ', 类型:' + file.type + ', 允许的类型:' + this.allowFile);
            return false;
          }
        } else {
          this.error({ status: 5002, msg: '文件类型不允许' });
          _log('上传失败', '文件:' + file.name + ', 类型:' + file.type + ', 允许的类型:' + this.allowFile);
          return false;
        }

      }

      var _tmpObj = null;
      if (this.fileNumLimit && !isNaN(this.fileNumLimit)) {
        if (this.fileNumLimit > this.stack.length) {
          _tmpObj = { uid: uuid(), file: file, el: el };
        } else {
          this.error({ status: 5003, msg: '文件一次最多上传' + this.fileNumLimit + '个' });
          return false;
        }
      } else {
        _tmpObj = { uid: uuid(), file: file, el: el };
      }
      this.stack.push(_tmpObj);
      this.addAfter(_tmpObj.uid, _tmpObj);
    }

    if (file instanceof FileList) {
      for (var i = 0, len = file.length; i < len; i++) {
        _addFile.call(this, file[i], el);
      }
    }
  }

  function Uploader (options) {
    if (this instanceof Uploader) {
      //存放文件列表
      this.stack = [];
      this.files = {};
      this.options = options
      _init.call(this, options);
      _addFileEventListener.call(this);
    } else {
      return new Uploader(options);
    }
  }

  //添加文件到队列
  Uploader.prototype.add = function (file) {

    if (file instanceof Node) {//单文件DOM
      _addFile.call(this, file.files, file);
    } else if (file instanceof NodeList) {//多文件DOM
      for (var i = 0, len = NodeList.length; i < len; i++) {
        _addFile.call(this, file[i].files, file);
      }
    } else {//文件
      _addFile.call(this, file, null);
    }

  };

  //ajax上传文件
  Uploader.prototype.ajax = function (options) {
    var self = this;
    var formData = new FormData();
    options = options || this.options;
    if (options.data) {
      for (var key in options.data) {
        formData.append(key, options.data[key]);
      }
    }
    if (this.stack.length > 0) {
      this.stack.forEach(function (item, idx) {
        var filename = item.uid;
        if (item.el && item.el.name) {
          filename = item.el.name;
        }
        // @todo 文件接收有问题
        formData.append(filename, item.file);
        formData.append('uid', item.uid);
        self.files[item.uid] = item;
      });
      this.stack = [];
    } else {
      return;
    }
    options.url = options.url || this.url;
    options.async = options.async === undefined ? true : options.async;
    options.type = 'POST';

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        xmlhttp.onreadystatechange = empty;
        if (xmlhttp.status === 200) {
          var result = xmlhttp.responseText;
          result = JSON.parse(result);
          self.success(result, self.files[result.uid]);
        } else {
          self.error({ status: 5003, msg: '文件上传失败' });
          _log('ajax请求错误', xmlhttp.statusText);
        }
      }
    };
    xmlhttp.open(options.type, options.url, options.async);
    xmlhttp.send(formData);
  };

  function uuid (len) {
    len = len || 6;
    len = parseInt(len, 10);
    len = isNaN(len) ? 6 : len;
    var seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ';
    var seedLen = seed.length - 1;
    var uid = '';
    while (len--) {
      uid += seed[Math.round(Math.random() * seedLen)]
    }
    return uid + Date.now();
  }

})(window);
