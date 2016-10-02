<?php 
	require "../classes/utils.class.php";
	require "../classes/feed.class.php";
	require "../classes/post.class.php";

	$xml_file = simplexml_load_file('../datas/datas.xml');

	$id = (int)$_GET['feedID'];
	$feedDatas = $xml_file->channel->item[$id];

	if (isset($feedDatas)) {

		$feed = new Feed($feedDatas);
	    App::render('feed', $feed);	
	}
?>