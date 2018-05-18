$("#___rc-p-id").each(function(index) {
	var id = $(this).attr("value");
	var data = "/api/catalog_system/pub/products/search/?fq=productId:"+id+"";

	$.getJSON(data, function(data) {
		$.each(data, function(key, val) {
			var elements = val.items[0].images;

			var thumbSize = '70-70'; // Change according Project //
			var showSize = '600-600'; // Change according Project //
			var zoomSize = '1250-1250'; // Change according Project //

			$(elements).each(function(data, val){
				// Take Image Thumbs //
					var myLabel = val.imageLabel;
					var myImageID = val.imageId;
					var myImageName = val.imageText;
					$('<li class="'+myLabel+'"><a href="/arquivos/ids/'+myImageID+'-'+zoomSize+'/'+myImageName+'.jpg" data-standard="/arquivos/ids/'+myImageID+'-'+showSize+'/'+myImageName+'.jpg"><img src="/arquivos/ids/'+myImageID+'-'+thumbSize+'/'+myImageName+'.jpg" /></a></li>').appendTo('ul.thumbnails');
				// Take Image Thumbs //

				var myFirst = $('.thumbnails li').first();
				myFirst.addClass('first-thumb');

				var firstThumbStand = $('.thumbnails li.first-thumb a').attr('data-standard');
				var firstThumbLink = $('.thumbnails li.first-thumb a').attr('href');
				var firstThumbEx = $('<a href="'+firstThumbLink+'"><img src="'+firstThumbStand+'"/></a>');
				firstThumbEx.appendTo('.easyzoom');
				$('.easyzoom a:first-of-type').nextAll().remove();

				// Instantiate EasyZoom instances
				var $easyzoom = $('.easyzoom').easyZoom();

				// Setup thumbnails example
				var api1 = $easyzoom.filter('.easyzoom--with-thumbnails').data('easyZoom');
				$('.thumbnails').on('click', 'a', function(e) {
					var $this = $(this);
					e.preventDefault();
					// Use EasyZoom's `swap` method
					api1.swap($this.data('standard'), $this.attr('href'));
				});
			});
		});
	});
});