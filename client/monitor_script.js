let webcam_output;
let poseNet;
let poses = [];

//Config vars for face pose
let memory = null;
let wnd = [];
let warn = []
let sz = 300;
//

//Config vars for people in frame
let multiple_people_memory = null;
let people_wnd = [];
let people_warn = [];
let sz_people = 100; //Different limits?
//

class Slicer{
	constructor()
	{
		this.data = []
	}
	add(x)
	{
		if (this.data.length >= sz) {
			for (var i = 0; i < 100;++i)
			this.data.shift();
		}
		this.data.push(x);
	}
	obgetMode()
	{
		return Slicer.getMode(this.data);
	}
	static getMode(array) {
		let map = array.map((a) => array.filter((b) => a === b).length);
		let mx = array[map.indexOf(Math.max.apply(null, map))];
		return mx;
	}

}

var cnv;
function setup() {
	memory = new Slicer();
	//People count expr
	multiple_people_memory = new Slicer();
	//
	cnv=createCanvas(250, 250);
	webcam_output = createCapture(VIDEO);
	console.log(width, height);
	webcam_output.size(width, height);

	cnv.position(1080+200, 57);
	poseNet = ml5.poseNet(webcam_output, modelReady);

	poseNet.on('pose', function(results) {
		poses = results;
	});
	webcam_output.hide();
}

function modelReady() {
	//select('#status').html('Model Loaded');
	//setInterval(singlePose, 3000);
	//select('#status').html('Warning you are getting distracted');
	singlePose();
}

handle_multiple_people = () => {
	//
	multiple_people_memory.add(poses.length>=2?2:1);
	people_wnd.push(multiple_people_memory.obgetMode());
	let res = null;
	if (people_wnd.length >= sz) {
		res = Slicer.getMode(people_wnd);
		if (people_warn.length == 0)
			people_warn.push(res);
		else if (people_warn[people_warn.length - 1] == res)
			people_warn.push(res);
		else people_warn = [];
		for (var i = 0; i < 100;++i)
		people_wnd.shift();
	}

	if (people_warn.length >= 5 && people_warn[0] == 1)
		people_warn = [];
	if (people_warn.length == 3 && people_warn[0] != 1) {
		console.log("PLEASE ASK PEOPLE TO MOVE AWAY FROM YOU");
		var el = document.getElementById('status');
		el.style.borderColor = "yellow";
		el.style.color = "yellow";
		select('#status_people').html('PLEASE ASK PEOPLE TO MOVE AWAY FROM YOU');
	}
	if (warn.length >= 5 && warn[0] != 1) {
		select('#status_people').html('Ask people to run away!');
		var el = document.getElementById('status_people');
		el.style.borderColor = "red";
		el.style.color = "red";
		//select('#videoPlayer').pause();
	}
	//
}

function draw() {
	image(webcam_output, 0, 0, width, height);
	handle_multiple_people();
	drawKeypoints();
	drawSkeleton();
}

function drawKeypoints() {
	for (let i = 0; i < poses.length; i++) {
		let pose = poses[i].pose;
		checkValidity(pose);
		for (let j = 0; j < pose.keypoints.length; j++) {
			let keypoint = pose.keypoints[j];
			if (keypoint.score > 0.2) {
				fill(0, 0, 255);
				noStroke();
				ellipse(keypoint.position.x, keypoint.position.y, 3, 3);
			}
		}
	}
}

function checkValidity(pose)
{
	pos = detect(pose);
	memory.add(pos[0]);
	if(pos[1]=='s')
	memory.add(pos[1]);

	wnd.push(memory.obgetMode());
	let res = null;
	if (wnd.length >= sz)
	{
		res = Slicer.getMode(wnd);
		console.log(res,warn);
		if (warn.length == 0)
			warn.push(res);
		else if (warn[warn.length - 1] == res)
			warn.push(res);
		else warn = [];
		for (var i = 0; i < 100;++i)
		wnd.shift();
	}
	if (warn.length >= 5 && warn[0] == 's')
		warn = [];
	if (warn.length == 3 && warn[0] != 's') {
		console.log("WARN");
		var el = document.getElementById('status');
		el.style.borderColor = "yellow";
		el.style.color = "yellow";
		select('#status').html('Warning');
	}
	if (warn.length >= 5 && warn[0] != 'l') {
		select('#status').html('Concentrate!');
		var el = document.getElementById('status');
		el.style.borderColor = "red";
		el.style.color = "red";
		select('#videoPlayer').pause();
	}
	//wait till certain number of poses generate say 20000

}

function drawSkeleton() {

	for (let i = 0; i < poses.length; i++) {
	let skeleton = poses[i].skeleton;
		for (let j = 0; j < skeleton.length; j++) {
			let startPoint = skeleton[j][0];
			let endPoint = skeleton[j][1];
			stroke(0, 255, 0);
			line(startPoint.position.x, startPoint.position.y, endPoint.position.x, endPoint.position.y);
		}
	}
}


const detect = (pose) => {
	var dc = []
	var points = []
	var parts = []
	for (var i = 0; i < 5; i++) {
		var data = null
		const pk = pose.keypoints[i]
		if (pk.score > 0.7) {
			data = [pk.part, pk.score, pk.position.x, pk.position.y]
			parts.push(pk.part)
		}
		points.push(data)
	}
	if (!parts.includes("leftEar") && !parts.includes("rightEar")) {
	//console.log("Straight")
		dc.push("s")
	}
	else if (!parts.includes("leftEar")) {
	//console.log("Turned Left!")
		dc.push("l")
	}
	else if (!parts.includes("rightEar")) {
	//console.log("Turned Right!")
		dc.push("r")
	}
	else {
	//console.log("Straight!")
		dc.push("s")
	}
	try {
		var a = Math.sqrt(Math.pow((points[0][2] - points[1][2]), 2) + Math.pow((points[0][3] - points[1][3]), 2))
		var b = Math.sqrt(Math.pow((points[0][2] - points[2][2]), 2) + Math.pow((points[0][3] - points[2][3]), 2))
		var c = Math.sqrt(Math.pow((points[1][2] - points[2][2]), 2) + Math.pow((points[1][3] - points[2][3]), 2))
		var B = Math.acos((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c)) * 180 / Math.PI
		var A = Math.acos((Math.pow(c, 2) + Math.pow(a, 2) - Math.pow(b, 2)) / (2 * c * a)) * 180 / Math.PI
		if (A < 30 && B < 30) {
			dc.push("l");
		}
		else if (A > B) {
			if ((B + 7.5) < A) {
			//console.log("Turned left")
				dc.push("l")
			}
			else {
			//console.log("Straight")
				dc.push("s")
			}
		} else if (B > A) {
			if ((A + 7.5) < B) {
			//console.log("Turned right!")
				dc.push("r")
			}
			else {
			//console.log("Straight")
				dc.push("s")
			}
		}
		score = 0
		if (dc[0] == "s") score += 0.5
		if (dc[1] == "s") score += 0.5
		} catch (err) {
			if (dc[0] == "s") score = 0.5
			else score = 0
		}
	return [dc[0],dc[1]];
}