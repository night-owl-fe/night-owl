new Vue({
  el: '.sprite-container',
  data () {
    let data = localStorage.getItem('sprite_data')
    if (data) {
      data = JSON.parse(data)
      data.imgs.forEach(function (img) {
        let image = new Image();
        image.src = img.source;
        img.src = image
      })

      return data
    }

    return {
      quality: 1,
      imgType: 'png',
      saveFileName: 'demo',
      canvasWidth: 500,
      canvasHeight: 300,
      imgs: [
        {
          src: '',
          width: 50,
          height: 50,
          x: 0,
          y: 0
        }
      ]
    }
  },
  watch: {
    canvasWidth(val) {
      this.$canvas.width = val;
      this.draw();
    },
    canvasHeight(val) {
      this.$canvas.height = val;
      this.draw();
    },
    imgs: {
      handler(arr){
        this.draw();
      },
      deep: true
    }
  },
  methods: {
    exportImg () {
      var saveLink = document.createElement('a');
      let type = "image/" + this.imgType
      saveLink.href = this.$canvas.toDataURL(type, this.quality).replace(type, "image/octet-stream");
      saveLink.download = this.saveFileName + '.' + this.imgType;
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', false, true);
      saveLink.dispatchEvent(event);
      // window.open(this.$canvas.toDataURL("image/png").replace("image/png", "image/octet-stream;"));
    },

    getImg (index, e) {
      this.fileToImage(e.target.files[0]).then((file) => {
        let img = this.imgs[index];
        img.src = file;
        img.source = file.src;
        img.width = file.width;
        img.height = file.height;
        this.draw();
      });
    },

    addImg () {
      this.imgs.push({
        src: '',
        width: 50,
        height: 50,
        x: 0,
        y: 0
      });
    },

    removeImg (index) {
      this.imgs.splice(index, 1);
    },

    saveImg () {
      localStorage.setItem('sprite_data', JSON.stringify(this.$data))
    },

    fileToImage(file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
          let image = new Image();
          image.src = this.result;

          image.onload = () => {
            resolve(image);
          }
        }
      })
    },

    draw() {
      this.cxt.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.imgs.forEach(({src, width, height, x, y}) => {
        if (src) {
          this.cxt.drawImage(src, x, y, width, height);
        }
      });
    }
  },
  mounted() {
    let $canvas = document.createElement('canvas');
    $canvas.setAttribute('width', this.canvasWidth);
    $canvas.setAttribute('height', this.canvasHeight);
    document.body.appendChild($canvas);
    this.cxt = this.context = $canvas.getContext("2d");
    this.$canvas = $canvas;
    this.draw()
  }
});

window.onbeforeunload = function (e) {
  var confirmationMessage = '您确定要离开吗?';
  (e || window.event).returnValue = confirmationMessage;     // Gecko and Trident
  return confirmationMessage
}
