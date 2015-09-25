$(document).ready(function(){
	window.URL = window.URL || window.webkitURL;
	$('#submit').click(function(){
		$('#load_mid img').attr('src','123');
	})

	$('#fileField').change(function(){
		$('#textfield').val(this.value);
		handleFiles(this)
	});

	function handleFiles(obj) {
	    load_mid = document.getElementById("load_mid");
	    var files = obj.files;
	    var str = window.URL.createObjectURL(files[0]);
	    $('#load_mid').css('backgroundImage','url('+str+')');
	}
});






