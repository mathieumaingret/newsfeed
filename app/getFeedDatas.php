<?php 

	/**
	 * Called to get one feed from one website
	 */

	if (!isset($_GET['feedID'])) {
		return false;
	}

	$xml_file = simplexml_load_file('../datas/datas.xml');

	$id = (int)$_GET['feedID'];
	$feedDatas = $xml_file->channel->item[$id];

	if (isset($feedDatas)) {

		require "../classes/utils.class.php";
		require "../classes/feed.class.php";
		require "../classes/post.class.php";

		$feed = new Feed($feedDatas);
	    echo App::render('feed', $feed);	
	}
?>