var express = require('express');
var router = express.Router();
var formidable = require('formidable'),
	  util = require('util'),
    fs = require('fs');
var shell = require('shelljs');
var util = require('util');
var commond = '"D:/C projects/opencvface/release/opencvface" --cascade="D:/C projects/opencvface/haarcascades/haarcascade_frontalface_alt.xml" --nested-cascade="D:/C projects/opencvface/haarcascades/haarcascade_eye.xml" --scale=1.25 --i="D:/C projects/opencvface/test2.jpg" --o="E:/node/picture/public/images/result2.jpg"';
var base_dir = "/home/aj/Projects/caffe/"


/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Express' });
// });

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.html', {dt:"0",ol:"",il:""});
});

router.get('/caffe-demo', function(req, res) {
  //index page for caffe demo
  //for testing I render some arguments in {}, they can be set to '' to leave blank
  res.render('caffe-demo.html', {image_path:"/images/19.jpg",num:[[1,2,3,4]],tag:[['none','none','none','none']],seconds:[0],output:['']});
});

router.post('/upload-image', function(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = "./public/images";
  form.parse(req, function(err, fields, files) {
    var target_name = "./public/images/" + files.imagefile.name;
    var image_path = "/images/" + files.imagefile.name;
    console.log('target_name: ' + target_name);
    fs.renameSync(files.imagefile.path, target_name);
    console.log(target_name);
    //variable cmd should be set to the absolute path of caffe exe file(with additional parameters) + target_name
    var cmds = new Array();
    cmds.push(base_dir+'build/examples/cpp_classification/classification.bin ' + base_dir+'models/bvlc_reference_caffenet/deploy.prototxt ' + base_dir+'models/bvlc_reference_caffenet/bvlc_reference_caffenet.caffemodel ' + base_dir+'data/ilsvrc12/imagenet_mean.binaryproto ' + base_dir+'data/ilsvrc12/synset_words.txt ' + target_name);
    cmds.push(base_dir+'build/examples/cpp_classification/classification.bin ' + base_dir+'models/bvlc_reference_caffenet/deploy.prototxt ' + base_dir+'models/bvlc_reference_caffenet/bvlc_reference_caffenet.caffemodel ' + base_dir+'data/ilsvrc12/imagenet_mean.binaryproto ' + base_dir+'data/ilsvrc12/synset_words.txt ' + target_name);
    cmds.push(base_dir+'build/examples/cpp_classification/classification.bin ' + base_dir+'models/bvlc_reference_caffenet/deploy.prototxt ' + base_dir+'models/bvlc_reference_caffenet/bvlc_reference_caffenet.caffemodel ' + base_dir+'data/ilsvrc12/imagenet_mean.binaryproto ' + base_dir+'data/ilsvrc12/synset_words.txt ' + target_name);
    times = [];
    sims = [];
    labels = [];
    outputs = [];
    for (idx in cmds)
    {
      var cmd = cmds[idx];
      shell.exec("time "+cmd, {silent:true}, function(code, output) {
        console.log('processing...'+cmd);
        //the rest of variables all depend on the form of output of caffe
        var lines = output.split("\n");
        var time = lines[6].split(" ")[1];
        time = time.slice(0,time.length-6);
        times.push(time)
        lines = lines.slice(1,6);
        var sim = new Array();
        var label = new Array();
        for (i in lines)
        {
          parts = lines[i].split(" - ");
          sim.push(parts[0]);
          label.push(parts[1].slice(1,parts[1].length-1).split(" ").slice(1).join(" "));
        }
        console.log(output);
        //this part also requires configuration after we decide the form of output
        sims.push(sim);
        labels.push(label);
        outputs.push(output);
        if (idx==cmds.length-2) {
          console.log(labels);
          res.render('caffe-demo.html',{image_path:image_path,num:sims,tag:labels,seconds:times,output:outputs});
        }
      });
    }
  });
});

router.post('/upload', function(req, res){
  var form = new formidable.IncomingForm();
  form.uploadDir = "./public/images";
  form.parse(req, function(err, fields, files) {
  //重命名
  var target_name = ".\\public\\images\\"+files.fileField.name;
  console.log('target_name:'+target_name);
  fs.renameSync(files.fileField.path, target_name);
  shell.exec(commond, {silent:true}, function(code, output){
	console.log('123');
	var dt = output.replace('Face_detection_processing...,','').split(',')[0].split('=')[1];
	var ol = output.replace('Face_detection_processing...,','').split(',')[1].split('=')[1];
	console.log(output);
	res.render('index.html', {dt:dt,ol:"images/result1.jpg",il:target_name});
	
	});
  
  });

  return;
});

module.exports = router;
